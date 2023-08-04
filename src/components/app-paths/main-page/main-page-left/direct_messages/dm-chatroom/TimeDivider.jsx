import date from "date-and-time";
import { useContext } from "react";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";
import MyMessage from "./MyMessage";
import OpponentMessage from "./OpponentMessage";
import BlockedMessage from "./BlockedMessage";

export default function TimeDivider(props) {
  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);
  return (
    <div>
      <div className="time-container">
        <div className="time-divider"></div>
        <p className="dm-time">{props.time.toString().slice(4, 15)}</p>
        <div className="time-divider"></div>
      </div>
      {props.sentBy === currentUserUid ? (
        <MyMessage
          time={props.time}
          messageContent={props.messageContent}
          sentBy={props.sentBy}
          username={props.userUsername}
          photoURL={props.userPhotoURL}
          timestamp={props.timestamp}
          year={props.year}
          month={props.month}
          day={props.day}
          file={props.file}
          messageIndex={props.messageIndex}
          opponentUid={props.opponentUid}
          currentUid={props.currentUid}
          messages={props.messages}
        />
      ) : props.sentBy !== currentUserUid && props.isBlocked === true ? (
        <BlockedMessage
          time={props.time}
          messageContent={props.messageContent}
          sentBy={props.sentBy}
          timestamp={props.timestamp}
          username={props.opponentUsername}
          photoURL={props.opponentPhotoURL}
          year={props.year}
          month={props.month}
          day={props.day}
          file={props.file}
        />
      ) : (
        <OpponentMessage
          time={props.time}
          messageContent={props.messageContent}
          sentBy={props.sentBy}
          timestamp={props.timestamp}
          username={props.opponentUsername}
          photoURL={props.opponentPhotoURL}
          year={props.year}
          month={props.month}
          day={props.day}
          file={props.file}
        />
      )}
    </div>
  );
}
