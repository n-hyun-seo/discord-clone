import { useState } from "react";

export default function FriendsNavRightButton(props) {
  const [hoverState, setHoverState] = useState(false);

  function changeHovertextClass() {
    if (hoverState) return "hover-text-friends-nav";
    if (!hoverState) return "unhover-text-friends-nav";
  }

  return (
    <div className={props.containerClass}>
      <img
        className={props.childClass}
        src={props.ImgUrl}
        alt={props.alt}
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
      ></img>
      <div className={changeHovertextClass()}>
        <p>{props.alt}</p>
      </div>
    </div>
  );
}
