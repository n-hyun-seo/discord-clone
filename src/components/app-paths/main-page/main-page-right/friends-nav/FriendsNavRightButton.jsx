import { useContext, useRef, useState } from "react";
import { CurrentShowProfileContext } from "../../../../../context/CurrentShowProfileContext";

export default function FriendsNavRightButton(props) {
  const [hoverState, setHoverState] = useState(false);

  const [showProfile, setShowProfile] = useContext(CurrentShowProfileContext);

  const serverHoverText = useRef();

  function checkCurrentPageOnLeave() {
    setHoverState(false);
    serverHoverText.current.classList.remove("hovered");
  }

  function checkCurrentPageOnEnter() {
    setHoverState(true);
    serverHoverText.current.classList.add("hovered");
  }

  return (
    <div className={props.containerClass}>
      <img
        className={props.childClass}
        src={props.ImgUrl}
        alt={props.alt}
        onMouseEnter={checkCurrentPageOnEnter}
        onMouseLeave={checkCurrentPageOnLeave}
        onClick={() => {
          setShowProfile(!showProfile);
          if (props.reference !== "") {
            if (showProfile) {
              props.reference.current.style.width = "330px";
            } else if (!showProfile) {
              props.reference.current.style.width = "0px";
            }
          }
        }}
      ></img>
      <div ref={serverHoverText} className="hover-text-friends-nav">
        <p>{props.alt}</p>
      </div>
    </div>
  );
}
