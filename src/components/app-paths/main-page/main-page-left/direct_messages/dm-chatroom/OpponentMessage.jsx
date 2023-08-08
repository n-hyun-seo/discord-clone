import { useRef, useState } from "react";
import date from "date-and-time";

export default function Opponentprops(props) {
  const [hoverState, setHoverState] = useState(false);
  const now = new Date();

  const hoursMinutes = date.transform(
    props.timestamp.slice(16, 21),
    "HH:mm",
    "hh:mm A"
  );
  const dayMonthYear = props.timestamp.slice(0, 16);

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
            <p className="my-timestamp">
              {date.isSameDay(now, props.time)
                ? "Today at " + hoursMinutes
                : dayMonthYear + hoursMinutes}
            </p>
          </div>
          {props.edited === true && props.file === null ? (
            <p className="first-message">
              {props.messageContent}
              <span className="edited-text"> (edited)</span>
            </p>
          ) : props.file === null ? (
            <p className="first-message">{props.messageContent}</p>
          ) : props.edited === true && props.file !== null ? (
            <div className="message-content-container first">
              <p>
                {props.messageContent}
                <span className="edited-text"> (edited)</span>
              </p>
              <div className="dm-image-container first">
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
          ) : (
            <div className="message-content-container first">
              <p>{props.messageContent}</p>
              <div className="dm-image-container first">
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
      </div>
    </div>
  );
}
