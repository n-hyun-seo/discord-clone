import { useRef, useState } from "react";
import date from "date-and-time";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";

export default function MyMessage(props) {
  const [hoverState, setHoverState] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const now = new Date();

  const hoursMinutes = date.transform(
    props.timestamp.slice(16, 21),
    "HH:mm",
    "hh:mm A"
  );
  const dayMonthYear = props.timestamp.slice(0, 16);

  const messageRef = useRef();

  async function editMessage() {
    setIsEditing(false);
    const snapshot = await getDoc(
      doc(
        db,
        "users",
        props?.currentUid,
        "dmMessageHistory",
        props?.opponentUid
      )
    );
    console.log(snapshot.data().messageHistory[props.messageIndex]);
  }
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
          {isEditing ? (
            <form onSubmit={editMessage}>
              <input type="text" value={props.messageContent} />
              <button type="submit" style={{ display: "none" }}></button>
            </form>
          ) : props.file === null ? (
            <p className="first-message">{props.messageContent}</p>
          ) : (
            <div className="message-content-container first">
              <p>{props.messageContent}</p>
              <div className="dm-image-container first">
                <img className="dm-image" src={props.file} alt="show" />
              </div>
            </div>
          )}
        </div>
      </div>
      {hoverState && (
        <div className="edit-delete-container">
          <button onClick={() => setIsEditing(true)}>edit</button>
          <button>delete</button>
        </div>
      )}
    </div>
  );
}
