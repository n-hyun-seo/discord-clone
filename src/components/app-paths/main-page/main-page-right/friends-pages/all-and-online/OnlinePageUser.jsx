import { queryClient } from "../../../../../../App";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { CurrentDMIdContext } from "../../../../../../context/CurrentDMIdContext";
import { CurrentSectionLeftContext } from "../../../../../../context/CurrentSectionLeftContext";
import { DmButtonRefContext } from "../../../../../../context/DmButtonRef";
import Online from "../../../main-page-left/direct_messages/status_icons/Online";
import Offline from "../../../main-page-left/direct_messages/status_icons/Offline";
import Moon from "../../../main-page-left/direct_messages/status_icons/Moon";
import Dnd from "../../../main-page-left/direct_messages/status_icons/Dnd";
import { useMutation } from "@tanstack/react-query";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";

export default function OnlinePageUser(props) {
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  const [dmButtonRef, setDmButtonRef] = useContext(DmButtonRefContext);
  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [hoverState, setHoverState] = useState(false);
  const [moreHoverState, setMoreHoverState] = useState(false);
  const [messageHoverState, setMessageHoverState] = useState(false);
  const [removeFriendHoverState, setRemoveFriendHoverState] = useState(false);

  const moreHoverRef = useRef();
  const moreImageRef = useRef();
  const moreCircleRef = useRef();
  const messageHoverRef = useRef();
  const messageImageRef = useRef();
  const messageCircleRef = useRef();
  const removeFriendTextRef = useRef();

  function changeNameClass() {
    if (hoverState) return "user-name-dm-hovered nolimit";
    if (!hoverState) return "user-name-dm-unhovered nolimit";
  }

  function changeDMStatusClass() {
    if (props.status !== "") {
      return "has-user-status-dm";
    } else if (props.status === "") {
      return "status-user-status-dm";
    }
  }

  function changeDMStatusIconClass() {
    if (props.status === "") return "no-status-icon";
    return "status-message-icon-unhovered";
  }

  const { mutate: updateDmList } = useMutation(async () => {
    const personInfoSnapshot = await getDoc(doc(db, "users", props.id_number));
    const personInfoData = await personInfoSnapshot.data().userInfo;

    await updateDoc(doc(db, "users", currentUserUid), {
      directMessages: arrayUnion({ ...personInfoData }),
    });
  });

  const { mutate: removeFriend } = useMutation(async () => {
    const personInfoSnapshot = await getDoc(doc(db, "users", props.id_number));
    const personInfoData = await personInfoSnapshot.data().userInfo;

    const userInfoSnapshot = await getDoc(doc(db, "users", currentUserUid));
    const userInfoData = await userInfoSnapshot.data().userInfo;

    await updateDoc(doc(db, "users", currentUserUid), {
      "friends.all": arrayRemove({ ...personInfoData }),
    }); //remove person from my friends list

    await updateDoc(doc(db, "users", props.id_number), {
      "friends.all": arrayRemove(...userInfoData),
    }); //remove myself from person's friends list
  });

  return (
    <Link
      to={`../../dm/${props.id_number}`}
      className="test-test"
      onClick={(e) => {
        updateDmList();
        setCurrentSectionLeft("dm");
        setCurrentDMId(props.id_number);
      }}
      onMouseEnter={() => {
        setHoverState(true);
        messageCircleRef.current.style.backgroundColor = "#1b1c1e";
        moreCircleRef.current.style.backgroundColor = "#1b1c1e";
      }}
      onMouseLeave={() => {
        setHoverState(false);
        messageCircleRef.current.style.backgroundColor = "#2b2d31";
        moreCircleRef.current.style.backgroundColor = "#2b2d31";
        setShowMoreOptions(false);
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
          <p className={changeDMStatusClass()}>
            {props.status
              ? props.status
              : props.online_status === "dnd"
              ? "Do Not Disturb"
              : props.online_status === "online"
              ? "Online"
              : props.online_status === "moon"
              ? "Away"
              : props.online_status === "offline"
              ? "Offline"
              : "none"}
          </p>
          <img
            src="https://icon-library.com/images/texting-icon-png/texting-icon-png-25.jpg"
            alt="status message"
            className={changeDMStatusIconClass()}
          />
        </div>
      </section>
      <div className="text-more-box-container">
        <div
          className="pfp-circle text-box"
          ref={messageCircleRef}
          onMouseEnter={() => {
            setMessageHoverState(true);
            messageHoverRef.current.classList.add("hovered");
            messageImageRef.current.style.filter = "brightness(300%)";
          }}
          onMouseLeave={() => {
            setMessageHoverState(false);
            messageHoverRef.current.classList.remove("hovered");
            messageImageRef.current.style.filter = "brightness(250%)";
          }}
        >
          <img
            src="https://cdn2.iconfinder.com/data/icons/interface-solid-8/2050/interface_2_glyph-23-512.png"
            alt="chat"
            className="text-box-dm"
            ref={messageImageRef}
          />
        </div>
        <div ref={messageHoverRef} className="message-hover-box">
          Message
        </div>
        <div
          className="pfp-circle text-box"
          ref={moreCircleRef}
          onMouseEnter={() => {
            setMoreHoverState(true);
            moreHoverRef.current.classList.add("hovered");
            moreImageRef.current.style.filter = "brightness(200%)";
          }}
          onMouseLeave={() => {
            setMoreHoverState(false);
            moreHoverRef.current.classList.remove("hovered");
            moreImageRef.current.style.filter = "brightness(150%)";
          }}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setShowMoreOptions(true);
            console.log(showMoreOptions);
          }}
        >
          <img
            src="https://cdn3.iconfinder.com/data/icons/navigation-and-settings/24/Material_icons-01-13-512.png"
            alt="chat"
            className="more-box-dm"
            ref={moreImageRef}
          />
        </div>
        {showMoreOptions && (
          <ul className="more-options-menu">
            <div
              className="remove-friend-option-container"
              onMouseEnter={() => {
                setRemoveFriendHoverState(true);
                removeFriendTextRef.current.style.color = "white";
              }}
              onMouseLeave={() => {
                setRemoveFriendHoverState(false);
                removeFriendTextRef.current.style.color = "rgb(237, 80, 80)";
              }}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                removeFriend();
              }}
            >
              <li className="remove-friend-option" ref={removeFriendTextRef}>
                Remove Friend
              </li>
            </div>
          </ul>
        )}
        <div ref={moreHoverRef} className="more-hover-box">
          More
        </div>
      </div>
    </Link>
  );
}
