import {
  randomUsersList,
  addUserToList,
} from "../../../main-page-left/direct_messages/users-list-data/randomUsersList";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { CurrentDMIdContext } from "../../../../../../context/CurrentDMIdContext";
import { CurrentSectionLeftContext } from "../../../../../../context/CurrentSectionLeftContext";
import { DmButtonRefContext } from "../../../../../../context/DmButtonRef";
import { CurrentIncomingFRContext } from "../../../../../../context/CurrentIncomingFRContext";
import Online from "../../../main-page-left/direct_messages/status_icons/Online";
import Offline from "../../../main-page-left/direct_messages/status_icons/Offline";
import Moon from "../../../main-page-left/direct_messages/status_icons/Moon";
import Dnd from "../../../main-page-left/direct_messages/status_icons/Dnd";
import { removeFR, getIncomingFRLength } from "./PendingFriendsList";
import { addUserToList as addUserToFriend } from "../all-and-online/RandomFriendsList";
import { useMutation } from "@tanstack/react-query";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";
import { queryClient } from "../../../../../../App";

export default function PendingPageUser(props) {
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  const [dmButtonRef, setDmButtonRef] = useContext(DmButtonRefContext);
  const [currentIncomingFR, setCurrentIncomingFR] = useContext(
    CurrentIncomingFRContext
  );
  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  const [listOfDMIds, setListOfDMIds] = useState([]);
  const [hoverState, setHoverState] = useState(false);
  const [moreHoverState, setMoreHoverState] = useState(false);
  const [messageHoverState, setMessageHoverState] = useState(false);

  const moreHoverRef = useRef();
  const moreImageRef = useRef();
  const moreCircleRef = useRef();
  const messageHoverRef = useRef();
  const messageImageRef = useRef();
  const messageCircleRef = useRef();

  function changeNameClass() {
    if (hoverState) return "user-name-dm-hovered nolimit";
    if (!hoverState) return "user-name-dm-unhovered nolimit";
  }

  const { mutate } = useMutation(async () => {
    await updateDoc(doc(db, "users", currentUserUid), {
      directMessages: arrayUnion(props.id_number),
    });

    const userInfoSnapshot = await getDoc(doc(db, "users", props.id_number));
    const userInfoData = await userInfoSnapshot.data().userInfo;

    queryClient.setQueryData(["dmList"], (old) => {
      if (old.filter((user) => user.uid === props.id_number).length === 0)
        return [...old, userInfoData];

      return old;
    });
  });

  return (
    <Link
      to={`../../dm/${props.id_number}`}
      className="test-test"
      onClick={(e) => {
        mutate();
        setCurrentSectionLeft("dm");
        setCurrentDMId(props.id_number);
      }}
      onMouseEnter={() => {
        setHoverState(true);
        if (props.isIncoming === "incoming") {
          moreCircleRef.current.style.backgroundColor = "#1b1c1e";
          messageCircleRef.current.style.backgroundColor = "#1b1c1e";
        } else {
          moreCircleRef.current.style.backgroundColor = "#1b1c1e";
        }
      }}
      onMouseLeave={() => {
        setHoverState(false);
        if (props.isIncoming === "incoming") {
          moreCircleRef.current.style.backgroundColor = "#2b2d31";
          messageCircleRef.current.style.backgroundColor = "#2b2d31";
        } else {
          moreCircleRef.current.style.backgroundColor = "#2b2d31";
        }
      }}
    >
      <div className="pfp-container">
        <div
          className="pfp-circle"
          style={{
            backgroundImage: `url("${props.ImgUrl}")`,
          }}
        >
          <div className="online-status-outer">
            {props.online_status === "online" && <Online />}
            {props.online_status === "offline" && <Offline />}
            {props.online_status === "moon" && <Moon />}
            {props.online_status === "dnd" && <Dnd />}
          </div>
        </div>
      </div>
      <section className="user-info-dm">
        <p className={changeNameClass()}>
          {props.username ? props.username : "error"}
        </p>
        <div className="user-status-dm-container">
          <p className="has-user-status-dm friend-request">
            {props.isIncoming === "incoming"
              ? "Incoming Friend Request"
              : "Outgoing Friend Request"}
          </p>
          <img
            src="https://icon-library.com/images/texting-icon-png/texting-icon-png-25.jpg"
            alt="status message"
            className="no-status-icon"
          />
        </div>
      </section>
      {props.isIncoming === "incoming" ? (
        <div className="text-more-box-container">
          <div
            className="pfp-circle text-box"
            ref={messageCircleRef}
            onMouseEnter={() => {
              setMessageHoverState(true);
              messageHoverRef.current.classList.add("hovered");
              messageImageRef.current.style.filter =
                "grayscale(0%) hue-rotate(90deg) brightness(85%)";
            }}
            onMouseLeave={() => {
              setMessageHoverState(false);
              messageHoverRef.current.classList.remove("hovered");
              messageImageRef.current.style.filter = "grayscale(100%)";
            }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              addUserToFriend(
                props.username,
                props.status,
                props.ImgUrl,
                props.id_number,
                props.online_status
              );
              removeFR(props.username);
              props.setRerenderState(!props.rerenderState);
              setCurrentIncomingFR(getIncomingFRLength());
            }}
          >
            <div alt="chat" className="text-box-dm accept">
              <img
                src="https://www.clker.com/cliparts/o/G/t/1/j/B/red-check-mark-hi.png"
                alt="accept"
                ref={messageImageRef}
              />
            </div>
          </div>
          <div ref={messageHoverRef} className="message-hover-box accept">
            Accept
          </div>
          <div
            className="pfp-circle text-box"
            ref={moreCircleRef}
            onMouseEnter={() => {
              setMoreHoverState(true);
              moreHoverRef.current.classList.add("hovered");
              moreImageRef.current.style.filter = "grayscale(0%)";
            }}
            onMouseLeave={() => {
              setMoreHoverState(false);
              moreHoverRef.current.classList.remove("hovered");
              moreImageRef.current.style.filter = "grayscale(100%)";
            }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              removeFR(props.username);
              setCurrentIncomingFR(getIncomingFRLength());
            }}
          >
            <div alt="chat" className="more-box-dm ignore">
              <img
                src="https://www.pngkit.com/png/full/52-522020_close-button-red-x.png"
                alt="ignore"
                ref={moreImageRef}
              />
            </div>
          </div>
          <div ref={moreHoverRef} className="more-hover-box cancel">
            Ignore
          </div>
        </div>
      ) : props.isIncoming === "outgoing" ? (
        <div className="text-more-box-container">
          <div
            className="pfp-circle text-box"
            ref={moreCircleRef}
            onMouseEnter={() => {
              setMoreHoverState(true);
              moreHoverRef.current.classList.add("hovered");
              moreImageRef.current.style.filter = "grayscale(0%)";
            }}
            onMouseLeave={() => {
              setMoreHoverState(false);
              moreHoverRef.current.classList.remove("hovered");
              moreImageRef.current.style.filter = "grayscale(100%)";
            }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              removeFR(props.username);
              props.setRerenderState(!props.rerenderState);
            }}
          >
            <div alt="chat" className="more-box-dm cancel">
              <img
                src="https://www.pngkit.com/png/full/52-522020_close-button-red-x.png"
                alt="cancel"
                ref={moreImageRef}
              />
            </div>
          </div>
          <div ref={moreHoverRef} className="more-hover-box cancel">
            Cancel
          </div>
        </div>
      ) : (
        "none"
      )}
    </Link>
  );
}
