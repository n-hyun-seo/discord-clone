import { useContext, useRef, useState } from "react";
import { CurrentDMIdContext } from "../../../../../../context/CurrentDMIdContext";
import { CurrentSectionLeftContext } from "../../../../../../context/CurrentSectionLeftContext";
import { returnUserInfo } from "../users-list-data/randomUsersList";
import FriendsNavRightButton from "../../../main-page-right/friends-nav/FriendsNavRightButton";
import Online from "../status_icons/Online";
import Offline from "../status_icons/Offline";
import Moon from "../status_icons/Moon";
import Dnd from "../status_icons/Dnd";
import { CurrentShowProfileContext } from "../../../../../../context/CurrentShowProfileContext";
import FriendsNavSearchBar from "../../../main-page-right/friends-nav/FriendsNavSearchBar";
import date from "date-and-time";
import {
  randomFriendsList,
  removeFromFriendsList,
  returnFriendInfo,
} from "../../../main-page-right/friends-pages/all-and-online/RandomFriendsList";
import {
  addUserToList,
  removePending,
  returnPendingInfo,
} from "../../../main-page-right/friends-pages/pending/PendingFriendsList";
import {
  returnBlockedInfo,
  addUserToList as addUserToBlocked,
  removeBlocked,
} from "../../../main-page-right/friends-pages/blocked/BlockedFriendsList";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";

export default function UserDM() {
  const now = new Date();
  const currentTime = date.format(now, "MMMM DD, YYYY");

  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  const [showProfile, setShowProfile] = useContext(CurrentShowProfileContext);
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [rerender, setRerender] = useState(false);

  const { isLoading, data, error } = useQuery(
    [currentDMId],
    async () => {
      const docSnapshot = await getDoc(doc(db, "users", currentDMId));
      const data = await docSnapshot.data().userInfo;
      return data;
    },
    { refetchOnWindowFocus: false }
  );

  let currentUser = data;
  let isFriend = returnFriendInfo(currentUser?.id_number);
  let isPending = returnPendingInfo(currentUser?.id_number);
  let isBlocked = returnBlockedInfo(currentUser?.id_number);

  const userProfileRef = useRef();

  return (
    <div className="right">
      <div className="friends-nav">
        <div className="friends-left-side">
          <div className="pfp-container dm-header">
            <div
              className="pfp-circle dm-header"
              style={{
                backgroundImage: `url("${currentUser?.photoURL}")`,
              }}
            >
              <div className="online-status-outer">
                {currentUser?.onlineStatus === "online" && <Online />}
                {currentUser?.onlineStatus === "offline" && <Offline />}
                {currentUser?.onlineStatus === "moon" && <Moon />}
                {currentUser?.onlineStatus === "dnd" && <Dnd />}
              </div>
            </div>
          </div>
          <p className="dm-header-user-name">{currentUser?.username}</p>
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
                    backgroundImage: `url("${currentUser?.photoURL}")`,
                  }}
                ></div>
              </div>
              <p className="user-dm-message-header-username">
                {currentUser?.username}
              </p>
              <p className="user-dm-message-header-usertag">
                {currentUser?.user_tag}
              </p>
              <p className="begining-of-dm-text">
                This is the beginning of your direct message history with{" "}
                {currentUser?.username}.
              </p>
              <div className="dm-friend-button-container">
                {isBlocked ? (
                  <div></div>
                ) : isFriend ? (
                  <button
                    className="dm-remove-friend-button"
                    onClick={() => {
                      removeFromFriendsList(currentUser?.id_number);
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
                      addUserToList(
                        currentUser?.username,
                        currentUser?.status,
                        currentUser?.ImgUrl,
                        currentUser?.id_number,
                        currentUser?.online_status,
                        false,
                        currentUser?.user_tag,
                        currentUser?.about_me,
                        currentUser?.member_since,
                        currentUser?.note
                      );
                      setRerender(!rerender);
                      console.log(isFriend);
                    }}
                  >
                    Add Friend
                  </button>
                )}
                {!isBlocked ? (
                  <button
                    className="dm-block-friend-button"
                    onClick={() => {
                      removeFromFriendsList(currentUser?.id_number);
                      addUserToBlocked(
                        currentUser?.username,
                        currentUser?.status,
                        currentUser?.ImgUrl,
                        currentUser?.id_number,
                        currentUser?.online_status,
                        currentUser?.user_tag,
                        currentUser?.about_me,
                        currentUser?.member_since,
                        currentUser?.note
                      );
                      removePending(currentUser?.username);
                      setRerender(!rerender);
                    }}
                  >
                    Block
                  </button>
                ) : (
                  <button
                    className="dm-block-friend-button"
                    onClick={() => {
                      removeBlocked(currentUser?.username);
                      setRerender(!rerender);
                    }}
                  >
                    Unblock
                  </button>
                )}
              </div>
              <div className="time-container">
                <div className="time-divider"></div>
                <p className="dm-time">{currentTime}</p>
                <div className="time-divider"></div>
              </div>
            </div>
            <div className="user-dm-message-bottom">
              <div className="message-input-container">
                <input placeholder="Message"></input>
              </div>
            </div>
          </section>
          <section ref={userProfileRef} className="user-dm-info-section">
            <div className="right-section-colored">
              <div className="pfp-container user-profile-header">
                <div
                  className="pfp-circle user-profile-header"
                  style={{
                    backgroundImage: `url("${currentUser?.photoURL}")`,
                  }}
                >
                  <div className="online-status-outer user-profile-header">
                    {currentUser?.onlineStatus === "online" && <Online />}
                    {currentUser?.onlineStatus === "offline" && <Offline />}
                    {currentUser?.onlineStatus === "moon" && <Moon />}
                    {currentUser?.onlineStatus === "dnd" && <Dnd />}
                  </div>
                </div>
              </div>
            </div>
            <div className="right-section-uncolored">
              <div className="user-info-box">
                <div className="user-info-username">
                  {currentUser?.username}
                </div>
                <div className="user-info-tag">{currentUser?.userTag}</div>
                {currentUser?.aboutMe !== "" && (
                  <div>
                    <p className="about-me-header">ABOUT ME</p>
                    <p className="about-me-text">{currentUser?.aboutMe}</p>
                  </div>
                )}
                <p className="member-since-header">DISCORD MEMBER SINCE</p>
                <p className="member-since-text">
                  {currentUser?.creationTime.slice(0, 16)}
                </p>
                <p>{}</p>
                <p className="note-header">NOTE</p>
                <div
                  key={`note${currentUser?.id_number}`}
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
