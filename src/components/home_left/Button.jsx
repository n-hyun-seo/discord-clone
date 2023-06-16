import { useContext } from "react";
import { useState } from "react";
import { CurrentSectionLeftContext } from "../context/CurrentSectionLeftContext";

export default function Button(props) {
  const [hoverState, setHoverState] = useState(false);
  const [clickState, setClickState] = useState(false);

  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );

  function changeImageClass() {
    if (currentSectionLeft === "friends" || clickState)
      return "friends-image-clicked";
    if (hoverState) return "friends-image-hover";
    if (!hoverState) return "";
  }

  function changeButtonClass() {
    if (
      currentSectionLeft === "friends" &&
      props.containerClass === "friends-container"
    )
      return "friends friends-clicked";
    return props.buttonClass;
  }

  return (
    <div
      className={`left-button-container ${props.containerClass}`}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      onMouseDown={() => setClickState(true)}
      onMouseUp={() => setClickState(false)}
    >
      <button className={changeButtonClass()}>
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
