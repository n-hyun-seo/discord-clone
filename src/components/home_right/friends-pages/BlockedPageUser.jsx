import {
  randomUsersList,
  addUserToList,
} from "../../home_left/direct_messages/randomUsersList";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { CurrentDMIdContext } from "../../context/CurrentDMIdContext";
import { CurrentSectionLeftContext } from "../../context/CurrentSectionLeftContext";
import { DmButtonRefContext } from "../../context/DmButtonRef";
import Online from "../../home_left/direct_messages/status_icons/Online";
import Offline from "../../home_left/direct_messages/status_icons/Offline";
import Moon from "../../home_left/direct_messages/status_icons/Moon";
import Dnd from "../../home_left/direct_messages/status_icons/Dnd";

export default function PendingPageUser(props) {
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  const [dmButtonRef, setDmButtonRef] = useContext(DmButtonRefContext);
  const [listOfDMIds, setListOfDMIds] = useState([]);
  const [hoverState, setHoverState] = useState(false);
  const [moreHoverState, setMoreHoverState] = useState(false);
  const [messageHoverState, setMessageHoverState] = useState(false);

  const moreHoverRef = useRef();
  const moreImageRef = useRef();
  const messageHoverRef = useRef();
  const messageImageRef = useRef();

  function changeNameClass() {
    if (hoverState) return "user-name-dm-hovered";
    if (!hoverState) return "user-name-dm-unhovered";
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
            Blocked
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
            console.log("works");
          }}
        >
          <img
            src="https://cdn3.iconfinder.com/data/icons/navigation-and-settings/24/Material_icons-01-13-512.png"
            alt="chat"
            className="more-box-dm"
            ref={moreImageRef}
          />
        </div>
        <div ref={moreHoverRef} className="more-hover-box">
          More
        </div>
      </div>
    </Link>
  );
}
