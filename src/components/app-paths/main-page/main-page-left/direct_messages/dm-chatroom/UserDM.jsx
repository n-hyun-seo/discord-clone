import { useContext, useEffect, useRef, useState } from "react";
import { CurrentDMIdContext } from "../../../../../../context/CurrentDMIdContext";
import FriendsNavRightButton from "../../../main-page-right/friends-nav/FriendsNavRightButton";
import Online from "../status_icons/Online";
import Offline from "../status_icons/Offline";
import Moon from "../status_icons/Moon";
import Dnd from "../status_icons/Dnd";
import { CurrentShowProfileContext } from "../../../../../../context/CurrentShowProfileContext";
import FriendsNavSearchBar from "../../../main-page-right/friends-nav/FriendsNavSearchBar";
import date from "date-and-time";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { queryClient } from "../../../../../../App";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";
import { CurrentIncomingFRContext } from "../../../../../../context/CurrentIncomingFRContext";
import TimeDivider from "./TimeDivider";
import MyMessage from "./MyMessage";
import OpponentMessage from "./OpponentMessage";

export default function UserDM() {
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  const [showProfile, setShowProfile] = useContext(CurrentShowProfileContext);
  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);
  const [currentIncomingFR, setCurrentIncomingFR] = useContext(
    CurrentIncomingFRContext
  );
  const [userCounter, setUserCounter] = useState(0);
  const [opponentCounter, setOpponentCounter] = useState(0);

  const [rerender, setRerender] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isFriend, setIsFriend] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isBlockedBy, setIsBlockedBy] = useState(false);
  const [messageInput, setMessageInput] = useState("");

  const userProfileRef = useRef();

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "users", currentUserUid, "dmMessageHistory", currentDMId),
      (doc) => {
        setMessages(doc?.data()?.messageHistory);
      }
    );

    const unsubTwo = onSnapshot(
      doc(db, "users", currentUserUid),
      async (docu) => {
        const friendData = docu.data().friends.all;
        const pendingData = docu.data().friends.pending;
        const blockedData = docu.data().friends.blocked;
        const isBlockedByData = docu.data().friends.isBlockedBy;

        if (
          friendData?.filter((user) => user.uid === currentDMId).length !== 0
        ) {
          setIsFriend(true);
        } else {
          setIsFriend(false);
        }

        if (
          pendingData?.filter((user) => user.uid === currentDMId).length !== 0
        ) {
          setIsPending(true);
        } else {
          setIsPending(false);
        }

        if (
          blockedData?.filter((user) => user.uid === currentDMId).length !== 0
        ) {
          setIsBlocked(true);
        } else {
          setIsBlocked(false);
        }

        if (
          isBlockedByData?.filter((user) => user.uid === currentDMId).length !==
          0
        ) {
          setIsBlockedBy(true);
        } else {
          setIsBlockedBy(false);
        }
      }
    );
  }, [currentDMId]);

  const {
    isLoading,
    data: opponentData,
    error,
  } = useQuery(
    [currentDMId],
    async () => {
      const dmPersonSnapshot = await getDoc(doc(db, "users", currentDMId));
      const dmPersonUserInfo = await dmPersonSnapshot.data().userInfo;

      return dmPersonUserInfo;
    },
    { refetchOnWindowFocus: false }
  );

  const {
    isLoading: currentIsLoading,
    data: currentUserData,
    error: currentUserError,
  } = useQuery(
    [currentUserUid],
    async () => {
      const userSnapshot = await getDoc(doc(db, "users", currentUserUid));
      const userInfo = await userSnapshot.data().userInfo;

      return userInfo;
    },
    { refetchOnWindowFocus: false }
  );

  const { mutate: removeFriend } = useMutation(async () => {
    const personInfoSnapshot = await getDoc(doc(db, "users", currentDMId));
    const personInfoData = await personInfoSnapshot.data().userInfo;

    const userInfoSnapshot = await getDoc(doc(db, "users", currentUserUid));
    const userInfoData = await userInfoSnapshot.data().userInfo;

    await updateDoc(doc(db, "users", currentUserUid), {
      "friends.all": arrayRemove({ ...opponentData }),
    }); //remove person from my friends list

    await updateDoc(doc(db, "users", currentDMId), {
      "friends.all": arrayRemove({ ...currentUserData }),
    }); //remove myself from person's friends list
  });

  const { mutate: sendFriendRequest } = useMutation(async () => {
    await updateDoc(doc(db, "users", currentUserUid), {
      "friends.pending": arrayUnion({
        ...opponentData,
        requestType: "outgoing",
      }),
    }); //add person to my pending list

    await updateDoc(doc(db, "users", currentDMId), {
      "friends.pending": arrayUnion({
        ...currentUserData,
        requestType: "incoming",
      }),
    }); //add myself to person's pending list
  });

  const { mutate: blockUser } = useMutation(async () => {
    await updateDoc(doc(db, "users", currentUserUid), {
      "friends.blocked": arrayUnion({ ...opponentData }),
    }); //add person to my blocked list

    await updateDoc(doc(db, "users", currentDMId), {
      "friends.isBlockedBy": arrayUnion({ ...currentUserData }),
    }); //add myself to person's isBlockedBy list

    await updateDoc(doc(db, "users", currentUserUid), {
      "friends.pending": arrayRemove({
        ...opponentData,
        requestType: "outgoing",
      }),
    }); //remove person from my pending list (outgoing)

    await updateDoc(doc(db, "users", currentUserUid), {
      "friends.pending": arrayRemove({
        ...opponentData,
        requestType: "incoming",
      }),
    }); //remove person from my pending list (incoming)

    await updateDoc(doc(db, "users", currentDMId), {
      "friends.pending": arrayRemove({
        ...currentUserData,
        requestType: "outgoing",
      }),
    }); //remove myself from person's pending list (outgoing)

    await updateDoc(doc(db, "users", currentDMId), {
      "friends.pending": arrayRemove({
        ...currentUserData,
        requestType: "incoming",
      }),
    }); //remove myself from person's pending list (incoming)

    await updateDoc(doc(db, "users", currentUserUid), {
      "friends.all": arrayRemove({ ...opponentData }),
    }); //remove person from my friends list

    await updateDoc(doc(db, "users", currentDMId), {
      "friends.all": arrayRemove({ ...currentUserData }),
    }); //remove myself from person's friends list
  });

  const { mutate: unblockUser } = useMutation(async () => {
    await updateDoc(doc(db, "users", currentUserUid), {
      "friends.blocked": arrayRemove({ ...opponentData }),
    }); // remove person from my blocked list

    await updateDoc(doc(db, "users", currentDMId), {
      "friends.isBlockedBy": arrayRemove({ ...currentUserData }),
    }); // remove myself from person's isBlockedBy list
  });

  async function addFirstMessage(content) {
    const now = new Date();

    await setDoc(
      doc(db, "users", currentUserUid, "dmMessageHistory", currentDMId),
      {
        messageHistory: [
          {
            messageContent: content,
            sentBy: currentUserUid,
            timestamp: String(now),
          },
        ],
      }
    ); //add dm message between us to MY database of dmMessageHistory

    await setDoc(
      doc(db, "users", currentDMId, "dmMessageHistory", currentUserUid),
      {
        messageHistory: [
          {
            messageContent: content,
            sentBy: currentUserUid,
            timestamp: String(now),
          },
        ],
      }
    ); //add dm message between us to USER'S database of dmMessageHistory

    await updateDoc(doc(db, "users", currentDMId), {
      directMessages: arrayUnion({ ...currentUserData }),
    }); //add myself to person's dm list
  }

  async function addMessage(content) {
    const now = new Date();

    await updateDoc(
      doc(db, "users", currentUserUid, "dmMessageHistory", currentDMId),
      {
        messageHistory: arrayUnion({
          messageContent: content,
          sentBy: currentUserUid,
          timestamp: String(now),
        }),
      }
    ); //add dm message between us to MY database of dmMessageHistory

    await updateDoc(
      doc(db, "users", currentDMId, "dmMessageHistory", currentUserUid),
      {
        messageHistory: arrayUnion({
          messageContent: content,
          sentBy: currentUserUid,
          timestamp: String(now),
        }),
      }
    ); //add dm message between us to USER'S database of dmMessageHistory

    await updateDoc(doc(db, "users", currentDMId), {
      directMessages: arrayUnion({ ...currentUserData }),
    }); //add myself to person's dm list
  }

  return (
    <div className="right">
      <div className="friends-nav">
        <div className="friends-left-side">
          <div className="pfp-container dm-header">
            <div
              className="pfp-circle dm-header"
              style={{
                backgroundImage: `url("${opponentData?.photoURL}")`,
              }}
            >
              <div className="online-status-outer">
                {opponentData?.onlineStatus === "online" && <Online />}
                {opponentData?.onlineStatus === "offline" && <Offline />}
                {opponentData?.onlineStatus === "moon" && <Moon />}
                {opponentData?.onlineStatus === "dnd" && <Dnd />}
              </div>
            </div>
          </div>
          <p className="dm-header-user-name">{opponentData?.username}</p>
        </div>
        <div className="friends-right-side">
          <FriendsNavRightButton
            containerClass="help-container"
            childClass="pin"
            ImgUrl="https://images.vexels.com/media/users/3/131686/isolated/preview/95d310073411ab523262be9cb43023fa-paper-pin-icon.png"
            alt="Pinned Messages"
            reference=""
          />

          <FriendsNavRightButton
            containerClass="help-container"
            childClass={
              showProfile ? "add-hide-user" : "add-hide-user highlighted"
            }
            ImgUrl="https://toppng.com/uploads/thumbnail/user-account-management-logo-user-icon-1156286714528pikaoejc.png"
            alt={showProfile ? "Show User Profile" : "Hide User Profile"}
            reference={userProfileRef}
          />
          <FriendsNavSearchBar />
          <FriendsNavRightButton
            containerClass="help-container"
            childClass="inbox"
            ImgUrl="https://icons-for-free.com/download-icon-inbox+icon-1320183613807333914_512.png"
            alt="Inbox"
            reference=""
          />
          <FriendsNavRightButton
            containerClass="help-container"
            childClass="help"
            ImgUrl="https://www.freeiconspng.com/thumbs/help-icon/help-icon-12.png"
            alt="Help"
            reference=""
          />
        </div>
      </div>
      <section className="friends-content">
        <div className="friends-list-bottom-container">
          <section className="friends-list-section user-dm-message">
            <div className="user-dm-message-top">
              <div className="pfp-container user-dm-message-header">
                <div
                  className="pfp-circle user-dm-message-header"
                  style={{
                    backgroundImage: `url("${opponentData?.photoURL}")`,
                  }}
                ></div>
              </div>
              <p className="user-dm-message-header-username">
                {opponentData?.username}
              </p>
              <p className="user-dm-message-header-usertag">
                {opponentData?.user_tag}
              </p>
              <p className="begining-of-dm-text">
                This is the beginning of your direct message history with{" "}
                {opponentData?.username}.
              </p>
              <div className="dm-friend-button-container">
                {isBlocked ? (
                  <div></div>
                ) : isFriend ? (
                  <button
                    className="dm-remove-friend-button"
                    onClick={() => {
                      removeFriend();
                      setRerender(!rerender);
                    }}
                  >
                    Remove Friend
                  </button>
                ) : isPending ? (
                  <div className="dm-FR-sent-button">Friend Request Sent</div>
                ) : (
                  <button
                    className="dm-add-friend-button"
                    onClick={() => {
                      if (isBlockedBy) return;
                      sendFriendRequest();
                      setRerender(!rerender);
                    }}
                  >
                    Add Friend
                  </button>
                )}
                {!isBlocked ? (
                  <button
                    className="dm-block-friend-button"
                    onClick={() => {
                      blockUser();
                      setRerender(!rerender);
                    }}
                  >
                    Block
                  </button>
                ) : (
                  <button
                    className="dm-block-friend-button"
                    onClick={() => {
                      unblockUser();
                      setRerender(!rerender);
                    }}
                  >
                    Unblock
                  </button>
                )}
              </div>
              <TimeDivider />

              {messages?.map((message) => {
                let currentMsgIndex = messages.indexOf(message);
                let previousMsgIndex = currentMsgIndex - 1;
                console.log();
                if (
                  currentMsgIndex !== 0 &&
                  message.sentBy === messages[previousMsgIndex].sentBy
                )
                  return (
                    <p className="ongoing-message">{message.messageContent}</p>
                  );

                if (message.sentBy === currentUserUid) {
                  return (
                    <MyMessage
                      messageContent={message.messageContent}
                      sentBy={message.sentBy}
                      username={currentUserData?.username}
                      photoURL={currentUserData?.photoURL}
                      timestamp={message.timestamp}
                    />
                  );
                }

                if (message.sentBy !== currentUserUid) {
                  return (
                    <OpponentMessage
                      messageContent={message.messageContent}
                      sentBy={message.sentBy}
                      timestamp={message.timestamp}
                      username={opponentData?.username}
                      photoURL={opponentData?.photoURL}
                    />
                  );
                }
                return <p>error</p>;
              })}
            </div>
            <div className="user-dm-message-bottom">
              <div className="message-input-container">
                <input
                  placeholder="Message"
                  onChange={(e) => setMessageInput(e.target.value)}
                ></input>
                <button
                  onClick={() => {
                    if (messages === undefined) {
                      addFirstMessage(messageInput);
                    } else {
                      addMessage(messageInput);
                    }
                    setMessageInput("");
                  }}
                >
                  send
                </button>
              </div>
            </div>
          </section>
          <section ref={userProfileRef} className="user-dm-info-section">
            <div className="right-section-colored">
              <div className="pfp-container user-profile-header">
                <div
                  className="pfp-circle user-profile-header"
                  style={{
                    backgroundImage: `url("${opponentData?.photoURL}")`,
                  }}
                >
                  <div className="online-status-outer user-profile-header">
                    {opponentData?.onlineStatus === "online" && <Online />}
                    {opponentData?.onlineStatus === "offline" && <Offline />}
                    {opponentData?.onlineStatus === "moon" && <Moon />}
                    {opponentData?.onlineStatus === "dnd" && <Dnd />}
                  </div>
                </div>
              </div>
            </div>
            <div className="right-section-uncolored">
              <div className="user-info-box">
                <div className="user-info-username">
                  {opponentData?.username}
                </div>
                <div className="user-info-tag">{opponentData?.userTag}</div>
                {opponentData?.aboutMe !== "" && (
                  <div>
                    <p className="about-me-header">ABOUT ME</p>
                    <p className="about-me-text">{opponentData?.aboutMe}</p>
                  </div>
                )}
                <p className="member-since-header">DISCORD MEMBER SINCE</p>
                <p className="member-since-text">
                  {opponentData?.creationTime.slice(0, 16)}
                </p>
                <p>{}</p>
                <p className="note-header">NOTE</p>
                <div
                  key={`note${opponentData?.id_number}`}
                  className="note-text"
                  contentEditable
                ></div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
