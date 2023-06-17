import { useRef, useState } from "react";

export default function FriendsNavRightButton(props) {
  const [hoverState, setHoverState] = useState(false);

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
      ></img>
      <div ref={serverHoverText} className="hover-text-friends-nav">
        <p>{props.alt}</p>
      </div>
    </div>
  );
}
