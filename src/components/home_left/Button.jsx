import { hover } from "@testing-library/user-event/dist/hover";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Button(props) {
  const [hoverState, setHoverState] = useState(false);
  const [clickState, setClickState] = useState(false);

  function changeImageClass() {
    if (clickState) return "friends-image-clicked";
    if (hoverState) return "friends-image-hover";
    if (!hoverState) return "";
  }

  return (
    <div
      className={`left-button-container ${props.containerClass}`}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      onMouseDown={() => setClickState(true)}
      onMouseUp={() => setClickState(false)}
    >
      <button className={props.buttonClass}>
        <div className="button-img-container">
          <img
            src={props.source}
            className={changeImageClass()}
            alt="icon"
          ></img>
        </div>
        <p>{props.text}</p>
      </button>
    </div>
  );
}
