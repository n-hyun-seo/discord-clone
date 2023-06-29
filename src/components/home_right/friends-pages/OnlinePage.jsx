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

export default function OnlinePage(props) {
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  const [dmButtonRef, setDmButtonRef] = useContext(DmButtonRefContext);
  const [listOfDMIds, setListOfDMIds] = useState([]);

  const onlineFriendsList = randomFriendsList.filter(
    (user) => user.online_status !== "offline"
  );

  let listToUse;

  props.inputValue
    ? (listToUse = props.filteredList.filter(
        (user) => user.online_status !== "offline"
      ))
    : (listToUse = onlineFriendsList);

  return (
    <section className="friends-type-container">
      <div className="friends-type-header">
        <p>
          {props.header} — {listToUse.length}
        </p>
      </div>
      <section className="friends-type-list">
        {listToUse.length !== 0 ? (
          listToUse.map((user) => {
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
          })
        ) : (
          <p className="no-friends-found">
            Wumpus looked, but couldn't find anyone with that name.
          </p>
        )}
      </section>
    </section>
  );
}
