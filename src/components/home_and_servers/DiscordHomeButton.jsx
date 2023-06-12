import { useState } from "react";

export default function DiscordHomeButton() {
const [highlightState, setHighlightState] = useState(true);

  return (
    <div className="logo-container">
        <div className="white-blob">

        </div>
      <button className={highlightState ? "logo-button-highlighted" : "logo-button-unhighlighted"} onMouseEnter={() => setHighlightState(true)}
      onMouseLeave={() => setHighlightState(false)}>
        <img
          src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6cc3c481a15a141738_icon_clyde_white_RGB.png"
          className="logo"
          alt="discord logo"
        ></img>
      </button>
    </div>
  );
}
