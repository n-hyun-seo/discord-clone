import { useRef, useState } from "react";

export default function OngoingMessage(props) {
  const [hoverState, setHoverState] = useState(false);

  const messageRef = useRef();
  const timeRef = useRef();
  return (
    <div
      className="ongoing-message-container"
      ref={messageRef}
      onMouseEnter={(e) => {
        setHoverState(true);
        messageRef.current.style.backgroundColor = "#292b2f";
        timeRef.current.style.visibility = "visible";
      }}
      onMouseLeave={(e) => {
        setHoverState(false);
        messageRef.current.style.backgroundColor = "transparent";
        timeRef.current.style.visibility = "hidden";
      }}
    >
      <p className="ongoing-message-time" ref={timeRef}>
        {props.timestamp.slice(16, 21)}
      </p>
      <p className="ongoing-message">{props.message}</p>
    </div>
  );
}
