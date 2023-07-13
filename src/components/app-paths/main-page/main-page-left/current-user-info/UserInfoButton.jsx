import { useRef, useState } from "react";

export default function UserInfoButton(props) {
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
      onMouseEnter={checkCurrentPageOnEnter}
      onMouseLeave={checkCurrentPageOnLeave}
    >
      <img
        className={changeImageClass()}
        src={props.ImgUrl}
        alt={props.alt}
      ></img>
      <div ref={serverHoverText} className="hover-icon-text">
        <p>{props.alt}</p>
      </div>
    </div>
  );
}
