import { hover } from "@testing-library/user-event/dist/hover";
import { useState } from "react";

export default function UserInfoButton(props) {
  const [hoverState, setHoverState] = useState(false);

  function changeHoverTextClass() {
    if (hoverState) return "hover-icon-text";
    if (!hoverState) return "unhover-icon-text";
  }

  function changeImageClass() {
    if (hoverState) {
      if (props.alt === "Microphone") {
        return "mic-hovered";
      } else if (props.alt === "Headphones") {
        return "headphones-hovered";
      } else if (props.alt === "Settings") {
        return "settings-hovered";
      }
    }

    if (!hoverState) return props.ImgClassName;
  }

  return (
    <div
      className={`icon-container ${props.containerClassName}`}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
    >
      <img
        className={changeImageClass()}
        src={props.ImgUrl}
        alt={props.alt}
      ></img>
      <div className={changeHoverTextClass()}>
        <p>{props.alt}</p>
      </div>
    </div>
  );
}
