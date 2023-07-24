import { useRef, useState } from "react";
import date from "date-and-time";

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
        {date.transform(props.timestamp.slice(16, 21), "HH:mm", "hh:mm A")}
      </p>
      {props.file === null ? (
        <p className="ongoing-message">{props.message}</p>
      ) : (
        <div className="message-content-container">
          <p className="dm-image-text">{props.message}</p>

          <div className="dm-image-container">
            {props?.file?.includes("mp4") ? (
              <video className="dm-video" controls>
                <source src={props.file} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img className="dm-image" src={props.file} alt="show" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
