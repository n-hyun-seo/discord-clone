import { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentSectionLeftContext } from "../../context/CurrentSectionLeftContext";

export default function IndividualDM(props) {
  const [hasStatus, setHasStatus] = useState(false);
  const [hoverState, setHoverState] = useState(false);

  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );

  function changeNameClass() {
    if (hoverState) return "user-name-dm-hovered";
    if (!hoverState) return "user-name-dm-unhovered";
  }

  const delete_button = useRef();
  return (
    <Link
      to="/dm"
      className="personal-dm"
      onMouseEnter={() => {
        delete_button.current.classList.remove("hidden");
        setHoverState(true);
      }}
      onMouseLeave={() => {
        delete_button.current.classList.add("hidden");
        setHoverState(false);
      }}
      onClick={() => setCurrentSectionLeft("dm")}
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
        <p className="user-status-dm">{props.status ? props.status : ""}</p>
      </div>
      <div ref={delete_button} className="dm-delete-button hidden">
        <p className="x-button">×</p>
      </div>
    </Link>
  );
}
