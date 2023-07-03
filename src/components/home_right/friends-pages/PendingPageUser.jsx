import {
  randomUsersList,
  addUserToList,
} from "../../home_left/direct_messages/randomUsersList";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { CurrentDMIdContext } from "../../context/CurrentDMIdContext";
import { CurrentSectionLeftContext } from "../../context/CurrentSectionLeftContext";
import { DmButtonRefContext } from "../../context/DmButtonRef";
import { CurrentIncomingFRContext } from "../../context/CurrentIncomingFRContext";
import Online from "../../home_left/direct_messages/status_icons/Online";
import Offline from "../../home_left/direct_messages/status_icons/Offline";
import Moon from "../../home_left/direct_messages/status_icons/Moon";
import Dnd from "../../home_left/direct_messages/status_icons/Dnd";
import {
  incomingFRListLength,
  pendingFriendsList,
  removeFR,
  getIncomingFRLength,
} from "./friends-list/PendingFriendsList";
import {
  addUserToList as addUserToFriend,
  randomFriendsList,
} from "./friends-list/RandomFriendsList";

export default function PendingPageUser(props) {
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  const [dmButtonRef, setDmButtonRef] = useContext(DmButtonRefContext);
  const [currentIncomingFR, setCurrentIncomingFR] = useContext(
    CurrentIncomingFRContext
  );

  const [listOfDMIds, setListOfDMIds] = useState([]);
  const [hoverState, setHoverState] = useState(false);
  const [moreHoverState, setMoreHoverState] = useState(false);
  const [messageHoverState, setMessageHoverState] = useState(false);

  const moreHoverRef = useRef();
  const moreImageRef = useRef();
  const messageHoverRef = useRef();
  const messageImageRef = useRef();

  function changeNameClass() {
    if (hoverState) return "user-name-dm-hovered nolimit";
    if (!hoverState) return "user-name-dm-unhovered nolimit";
  }

  function changeDMStatusIconClass() {
    if (props.status === "") return "no-status-icon";
    return "status-message-icon-unhovered";
  }

  return (
    <Link
      to={`/dm/${props.id_number}`}
      className="test-test"
      onClick={(e) => {
        for (let i in randomUsersList) {
          setListOfDMIds(listOfDMIds.push(randomUsersList[i].id_number));
        }
        if (!listOfDMIds.includes(props.id_number)) {
          addUserToList(
            props.username,
            props.status,
            props.ImgUrl,
            props.id_number,
            props.online_status
          );
          dmButtonRef?.current?.focus();
        }
        setCurrentSectionLeft("dm");
        setCurrentDMId(props.id_number);
      }}
      onMouseEnter={() => {
        setHoverState(true);
      }}
      onMouseLeave={() => {
        setHoverState(false);
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
            {props.isIncoming
              ? "Incoming Friend Request"
              : "Outgoing Friend Request"}
          </p>
          <img
            src="https://icon-library.com/images/texting-icon-png/texting-icon-png-25.jpg"
            alt="status message"
            className={changeDMStatusIconClass()}
          />
        </div>
      </section>
      {props.isIncoming ? (
        <div className="text-more-box-container">
          <div
            className="pfp-circle text-box"
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
      ) : (
        <div className="text-more-box-container">
          <div
            className="pfp-circle text-box"
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
      )}
    </Link>
  );
}
