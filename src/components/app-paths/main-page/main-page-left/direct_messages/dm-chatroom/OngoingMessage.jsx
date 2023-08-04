import { useEffect, useRef, useState } from "react";
import date from "date-and-time";
import { doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";

export default function OngoingMessage(props) {
  const [hoverState, setHoverState] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMessageValue, setEditMessageValue] = useState(
    props.message
  );
  const [messages, setMessages] = useState();

  const messageRef = useRef();
  const timeRef = useRef();

  async function editMessage() {
    setIsEditing(false);
    setMessages(
      (messages[props.messageIndex].messageContent = editMessageValue)
    );
    await updateDoc(
      doc(db, "users", props.currentUid, "dmMessageHistory", props.opponentUid),
      {
        messageHistory: messages,
      }
    );
  }

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "users", props.currentUid, "dmMessageHistory", props.opponentUid),
      async (docu) => {
        setMessages(docu?.data()?.messageHistory);
      }
    );
  }, []);

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
      {isEditing && props.sentBy === props.currentUid ? (
        <form onSubmit={editMessage}>
          <input
            type="text"
            value={editMessageValue}
            onChange={(e) => setEditMessageValue(e.target.value)}
          />
          <button type="submit" style={{ display: "none" }}></button>
        </form>
      ) : props.file === null ? (
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
      {hoverState === true && props.sentBy === props.currentUid && (
        <div className="edit-delete-container">
          <button onClick={() => setIsEditing(true)}>edit</button>
          <button>delete</button>
        </div>
      )}
    </div>
  );
}
