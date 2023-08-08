import { useEffect, useRef, useState } from "react";
import date from "date-and-time";
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  where,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../../../../config/firebase";

export default function MyMessage(props) {
  const [hoverState, setHoverState] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editMessageValue, setEditMessageValue] = useState(
    props.messageContent
  );
  const [messages, setMessages] = useState();
  const now = new Date();

  const hoursMinutes = date.transform(
    props.timestamp.slice(16, 21),
    "HH:mm",
    "hh:mm A"
  );
  const dayMonthYear = props.timestamp.slice(0, 16);

  const messageRef = useRef();
  const deleteRef = useRef();

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
      className="my-message"
      ref={messageRef}
      onMouseEnter={(e) => {
        if (isEditing) return;
        if (!isDeleting) {
          setHoverState(true);
          messageRef.current.style.backgroundColor = "#292b2f";
        }
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
          {isEditing && props.file !== null ? (
            <form onSubmit={editMessage} className="edit-text-form">
              <input
                type="text"
                className="edit-text-input"
                value={editMessageValue}
                onChange={(e) => setEditMessageValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsEditing(false);
                }}
                autoFocus
              />
              <div className="dm-image-container first editing-my">
                {props?.file?.includes("mp4") ? (
                  <video className="dm-video" controls>
                    <source src={props.file} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img className="dm-image" src={props.file} alt="show" />
                )}
              </div>
              <button type="submit" style={{ display: "none" }}></button>
              <p className="edit-instruction">
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
          ) : isEditing ? (
            <form onSubmit={editMessage} className="edit-text-form">
              <input
                type="text"
                className="edit-text-input"
                value={editMessageValue}
                onChange={(e) => setEditMessageValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsEditing(false);
                }}
                autoFocus
              />
              <button type="submit" style={{ display: "none" }}></button>
              <p className="edit-instruction">
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
            <p className="first-message">
              {props.messageContent}
              <span className="edited-text">(edited)</span>
            </p>
          ) : props.file === null ? (
            <p className="first-message">{props.messageContent}</p>
          ) : props.file !== null && props.edited === true ? (
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
      {hoverState && (
        <div className="edit-delete-container">
          <button
            onClick={() => {
              setIsEditing(true);
              setHoverState(false);
              messageRef.current.style.backgroundColor = "transparent";
            }}
          >
            <p className="edit-nav">Edit</p>
          </button>
          <button onClick={() => setIsDeleting(true)}>
            <p className="delete-nav">Delete</p>
          </button>
        </div>
      )}
      {isDeleting && (
        <div
          className={
            props.file !== null
              ? "delete-message-prompt img"
              : "delete-message-prompt"
          }
        >
          <h2>Delete Message</h2>
          <p className="delete-for-sure">
            Are you sure you want to delete this message?
          </p>
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
                      {props.messageContent}{" "}
                      <span className="edited-text">(edited)</span>
                    </p>
                  ) : props.file === null ? (
                    <p className="first-message">{props.messageContent}</p>
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
            <button
              ref={deleteRef}
              className="confirm-deletion"
              onClick={deleteMessage}
              onMouseEnter={() =>
                (deleteRef.current.style.backgroundColor = "rgb(150, 29, 29)")
              }
              onMouseLeave={() =>
                (deleteRef.current.style.backgroundColor = "rgb(219, 40, 40)")
              }
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
