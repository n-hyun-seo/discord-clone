import { randomFriendsList } from "./RandomFriendsList";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentDMIdContext } from "../../context/CurrentDMIdContext";
import { CurrentSectionLeftContext } from "../../context/CurrentSectionLeftContext";

export default function OnlinePage(props) {
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);

  const onlineFriendsList = randomFriendsList.filter(
    (user) => user.online_status !== "offline"
  );

  return (
    <div className="friends-type-container">
      <div className="friends-type-header">
        <p>{props.header} — 8</p>
      </div>
      <div className="friends-type-list">
        {onlineFriendsList.map((user) => {
          return (
            <Link to={`/dm/${user.id_number}`} className="test-test">
              <p>{user.username}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
