import { useEffect, useRef, useState } from "react";
import date from "date-and-time";
import { doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";

export default function OngoingMessage(props) {
  const [hoverState, setHoverState] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMessageValue, setEditMessageValue] = useState(props.message);
  const [isDeleting, setIsDeleting] = useState(false);
  const [messages, setMessages] = useState();

  const messageRef = useRef();
  const timeRef = useRef();

  const now = new Date();

  const hoursMinutes = date.transform(
    props.timestamp.slice(16, 21),
    "HH:mm",
    "hh:mm A"
  );
  const dayMonthYear = props.timestamp.slice(0, 16);

  async function deleteMessage() {
    setIsDeleting(false);
    let newList = messages.filter(
      (message) => message !== messages[props.messageIndex]
    );
    setMessages(newList);

    await updateDoc(
      doc(db, "users", props.currentUid, "dmMessageHistory", props.opponentUid),
      {
        messageHistory: newList,
      }
    ); //update my message history

    await updateDoc(
      doc(db, "users", props.opponentUid, "dmMessageHistory", props.currentUid),
      {
        messageHistory: newList,
      }
    ); //update opponent's message history
  }

  async function editMessage() {
    setIsEditing(false);
    setMessages(
      (messages[props.messageIndex].messageContent = editMessageValue)
    );
    setMessages((messages[props.messageIndex].edited = true));

    await updateDoc(
      doc(db, "users", props.currentUid, "dmMessageHistory", props.opponentUid),
      {
        messageHistory: messages,
      }
    ); //update my message history

    await updateDoc(
      doc(db, "users", props.opponentUid, "dmMessageHistory", props.currentUid),
      {
        messageHistory: messages,
      }
    ); //update opponent's message history
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
        if (isEditing) return;
        if (!isDeleting) {
          setHoverState(true);
          messageRef.current.style.backgroundColor = "#292b2f";
          timeRef.current.style.visibility = "visible";
        }
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
      {isEditing && props.file !== null && props.sentBy === props.currentUid ? (
        <form onSubmit={editMessage} className="edit-text-form ongoing">
          <input
            type="text"
            value={editMessageValue}
            className="edit-text-input ongoing"
            onChange={(e) => setEditMessageValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsEditing(false);
            }}
            autoFocus
          />
          <div className="dm-image-container first">
            <img className="dm-image" src={props.file} alt="show" />
          </div>
          <button type="submit" style={{ display: "none" }}></button>
          <p className="edit-instruction ongoing">
            escape to{" "}
            <span className="blue-text" onClick={() => setIsEditing(false)}>
              cancel
            </span>
            , enter to{" "}
            <span className="blue-text" onClick={editMessage}>
              save
            </span>
          </p>
        </form>
      ) : isEditing && props.sentBy === props.currentUid ? (
        <form onSubmit={editMessage} className="edit-text-form ongoing">
          <input
            type="text"
            value={editMessageValue}
            className="edit-text-input ongoing"
            onChange={(e) => setEditMessageValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsEditing(false);
            }}
            autoFocus
          />
          <button type="submit" style={{ display: "none" }}></button>
          <p className="edit-instruction ongoing">
            escape to{" "}
            <span className="blue-text" onClick={() => setIsEditing(false)}>
              cancel
            </span>
            , enter to{" "}
            <span className="blue-text" onClick={editMessage}>
              save
            </span>
          </p>
        </form>
      ) : props.edited === true && props.file === null ? (
        <p className="ongoing-message">
          {props.message} <span className="edited-text">(edited)</span>
        </p>
      ) : props.file === null ? (
        <p className="ongoing-message">{props.message}</p>
      ) : props.file !== null && props.edited === true ? (
        <div className="message-content-container">
          <p>
            {props.message}
            <span className="edited-text">(edited)</span>
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
          <button
            onClick={() => {
              setIsEditing(true);
              setHoverState(false);
              messageRef.current.style.backgroundColor = "transparent";
            }}
          >
            edit
          </button>
          <button onClick={() => setIsDeleting(true)}>delete</button>
        </div>
      )}
      {isDeleting && (
        <div className="delete-message-prompt">
          <h2>Delete Message</h2>
          <p>Are you sure you want to delete this message?</p>
          <div className="msg-to-delete">
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
                    <p className="my-timestamp">
                      {date.isSameDay(now, props.time)
                        ? "Today at " + hoursMinutes
                        : dayMonthYear + hoursMinutes}
                    </p>
                  </div>
                  {props.edited === true && props.file === null ? (
                    <p className="first-message">
                      {props.message}{" "}
                      <span className="edited-text">(edited)</span>
                    </p>
                  ) : props.file === null ? (
                    <p className="first-message">{props.message}</p>
                  ) : (
                    <div className="message-content-container first">
                      <p>{props.message}</p>
                      <div className="dm-image-container first">
                        {props?.file?.includes("mp4") ? (
                          <video className="dm-video" controls>
                            <source src={props.file} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            className="dm-image"
                            src={props.file}
                            alt="show"
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="cancel-or-delete">
            <button
              className="cancel-deletion"
              onClick={() => setIsDeleting(false)}
            >
              Cancel
            </button>
            <button className="confirm-deletion" onClick={deleteMessage}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
