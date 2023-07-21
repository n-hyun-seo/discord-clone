import { useRef, useState } from "react";

export default function Opponentprops(props) {
  const [hoverState, setHoverState] = useState(false);

  const messageRef = useRef();
  return (
    <div
      className="my-message"
      ref={messageRef}
      onMouseEnter={(e) => {
        setHoverState(true);
        messageRef.current.style.backgroundColor = "#292b2f";
      }}
      onMouseLeave={(e) => {
        setHoverState(false);
        messageRef.current.style.backgroundColor = "transparent";
      }}
    >
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
            <p className="my-timestamp">{props.timestamp.slice(0,25)}</p>
          </div>
          <p className="first-message">{props.messageContent}</p>
        </div>
      </div>
    </div>
  );
}
