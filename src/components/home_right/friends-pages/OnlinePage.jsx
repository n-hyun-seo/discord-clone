import { randomFriendsList } from "./RandomFriendsList";
import {
  randomUsersList,
  addUserToList,
} from "../../home_left/direct_messages/randomUsersList";
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
        <p>
          {props.header} — {onlineFriendsList.length}
        </p>
      </div>
      <div className="friends-type-list">
        {onlineFriendsList.map((user) => {
          return (
            <Link
              to={`/dm/${user.id_number}`}
              className="test-test"
              onClick={() => {
                setCurrentSectionLeft("dm");
                setCurrentDMId(user.id_number);
                for (let i in randomUsersList) {
                  if (randomUsersList[i].id_number !== user.id_number) {
                    addUserToList(
                      user.username,
                      user.status,
                      user.ImgUrl,
                      user.id_number,
                      user.online_status
                    );
                  }
                }
              }}
            >
              <p>{user.username}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
