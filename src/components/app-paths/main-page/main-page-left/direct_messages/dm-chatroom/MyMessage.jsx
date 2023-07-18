import { useState } from "react";

export default function MyMessage(props) {
  const [hoverState, setHoverState] = useState(false);

  return (
    <div className="my-message">
      <div className="pfp-container my-left">
        <div
          className="pfp-circle"
          style={{
            backgroundImage: `url("${props.photoURL}")`,
          }}
        ></div>
      </div>

      <div className="my-right-container">
        <div className="first-message-container">
          <div className="first-row">
            <p className="my-username">{props.username} </p>
            <p className="my-timestamp">{props.timestamp}</p>
          </div>
          <p className="first-message">{props.messageContent}</p>
        </div>
      </div>
    </div>
  );
}
