import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentSectionLeftContext } from "../../context/CurrentSectionLeftContext";
import { CurrentDMIdContext } from "../../context/CurrentDMIdContext";

export default function UnreadDm(props) {
  const [hoverState, setHoverstate] = useState(false);

  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);

  let unreadHoverText = useRef();

  function checkCurrentPageOnLeave() {
    setHoverstate(false);
    unreadHoverText.current.classList.remove("hovered");
  }

  function checkCurrentPageOnEnter() {
    setHoverstate(true);
    unreadHoverText.current.classList.add("hovered");
  }

  return (
    <div className="logo-container-2 unread-dm">
      <Link
        to={`/discord-clone/main/dm/${props.uid}`}
        className="logo-button-unhovered-2 unread-dm"
        onMouseEnter={checkCurrentPageOnEnter}
        onMouseLeave={checkCurrentPageOnLeave}
        onClick={() => {
          setCurrentSectionLeft("dm");
          setCurrentDMId(props.uid);
        }}
        style={{
          backgroundImage: `url(${props.photoURL})`,
        }}
      >
        <div className="incoming-unread-circle">
          <div className="incoming-FR-home">
            <p>{props.numberOfUnread}</p>
          </div>
        </div>
      </Link>
      <div ref={unreadHoverText} className="hover-text">
        {props.username}
      </div>
    </div>
  );
}
