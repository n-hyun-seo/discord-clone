import { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentSectionLeftContext } from "../../context/CurrentSectionLeftContext";
import { CurrentDMIdContext } from "../../context/CurrentDMIdContext";

export default function IndividualDM(props) {
  const [hoverState, setHoverState] = useState(false);
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);

  function changeNameClass() {
    if (hoverState) return "user-name-dm-hovered";
    if (!hoverState) return "user-name-dm-unhovered";
  }

  function changeDMStatusClass() {
    if (props.status !== "") {
      if (hoverState) {
        return "has-user-status-dm status-hovered";
      } else if (!hoverState) {
        return "has-user-status-dm";
      }
    } else if (props.status === "") {
      return "no-user-status-dm";
    }
  }

  function changeDMStatusIconClass() {
    if (props.status === "") return "no-status-icon";
    if (hoverState || currentDMId === props.id_number)
      return "status-message-icon-hovered";
    if (!hoverState) return "status-message-icon-unhovered";
  }

  function changeButtonClass() {
    if (currentSectionLeft !== "dm") return "personal-dm";
    if (currentDMId === props.id_number) return "personal-dm pressed";
    return "personal-dm";
  }

  const delete_button = useRef();
  return (
    <Link
      to={`/dm/${props.id_number}`}
      className={changeButtonClass()}
      onMouseEnter={() => {
        delete_button.current.classList.remove("hidden");
        setHoverState(true);
      }}
      onMouseLeave={() => {
        delete_button.current.classList.add("hidden");
        setHoverState(false);
      }}
      onClick={() => {
        setCurrentSectionLeft("dm");
        setCurrentDMId(props.id_number);
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
            <div className="online-status"></div>
          </div>
        </div>
      </div>
      <div className="user-info-dm">
        <p className={changeNameClass()}>
          {props.username ? props.username : "randomName123"}
        </p>
        <div className="user-status-dm-container">
          <p className={changeDMStatusClass()}>
            {props.status ? props.status : ""}
          </p>
          <img
            src="https://icon-library.com/images/texting-icon-png/texting-icon-png-25.jpg"
            alt="status message"
            className={changeDMStatusIconClass()}
          />
        </div>
      </div>
      <div ref={delete_button} className="dm-delete-button hidden">
        <p className="x-button">×</p>
      </div>
    </Link>
  );
}
