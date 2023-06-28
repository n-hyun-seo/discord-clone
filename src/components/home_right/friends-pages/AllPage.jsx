import { randomFriendsList } from "./RandomFriendsList";
import {
  randomUsersList,
  addUserToList,
} from "../../home_left/direct_messages/randomUsersList";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CurrentDMIdContext } from "../../context/CurrentDMIdContext";
import { CurrentSectionLeftContext } from "../../context/CurrentSectionLeftContext";
import { DmButtonRefContext } from "../../context/DmButtonRef";

export default function AllPage(props) {
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  const [dmButtonRef, setDmButtonRef] = useContext(DmButtonRefContext);
  const [listOfDMIds, setListOfDMIds] = useState([]);

  return (
    <div className="friends-type-container">
      <div className="friends-type-header">
        <p>
          {props.header} — {randomFriendsList.length}
        </p>
      </div>
      <div className="friends-type-list">
        {randomFriendsList.map((user) => {
          return (
            <Link
              to={`/dm/${user.id_number}`}
              className="test-test"
              onClick={() => {
                for (let i in randomUsersList) {
                  setListOfDMIds(
                    listOfDMIds.push(randomUsersList[i].id_number)
                  );
                }
                if (!listOfDMIds.includes(user.id_number)) {
                  addUserToList(
                    user.username,
                    user.status,
                    user.ImgUrl,
                    user.id_number,
                    user.online_status
                  );
                  dmButtonRef?.current?.focus();
                }
                setCurrentSectionLeft("dm");
                setCurrentDMId(user.id_number);
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
