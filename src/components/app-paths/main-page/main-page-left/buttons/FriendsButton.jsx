import { useContext } from "react";
import { useState } from "react";
import { CurrentSectionLeftContext } from "../../../../../context/CurrentSectionLeftContext";
import { CurrentIncomingFRContext } from "../../../../../context/CurrentIncomingFRContext";

export default function Button(props) {
  const [hoverState, setHoverState] = useState(false);
  const [clickState, setClickState] = useState(false);

  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentIncomingFR, setCurrentIncomingFR] = useContext(
    CurrentIncomingFRContext
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
        {props.text === "Friends" && currentIncomingFR > 0 && (
          <div className="incoming-FR-friends">
            <p>{currentIncomingFR}</p>
          </div>
        )}
      </button>
    </div>
  );
}
