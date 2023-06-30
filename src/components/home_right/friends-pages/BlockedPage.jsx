import {
  randomUsersList,
  addUserToList,
} from "../../home_left/direct_messages/randomUsersList";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CurrentDMIdContext } from "../../context/CurrentDMIdContext";
import { CurrentSectionLeftContext } from "../../context/CurrentSectionLeftContext";
import { DmButtonRefContext } from "../../context/DmButtonRef";
import { blockedFriendsList } from "./friends-list/BlockedFriendsList";

export default function BlockedPage(props) {
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  const [dmButtonRef, setDmButtonRef] = useContext(DmButtonRefContext);
  const [listOfDMIds, setListOfDMIds] = useState([]);
  const [hoverState, setHoverState] = useState(false);

  let listToUse;

  props.inputValue
    ? (listToUse = props.filteredList)
    : (listToUse = blockedFriendsList);

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
            function changeNameClass() {
              if (hoverState) return "user-name-dm-hovered";
              if (!hoverState) return "user-name-dm-unhovered";
            }

            function changeDMStatusIconClass() {
              if (user.status === "") return "no-status-icon";
              return "status-message-icon-unhovered";
            }
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
                <div className="pfp-container">
                  <div
                    className="pfp-circle"
                    style={{
                      backgroundImage: `url("${user.ImgUrl}")`,
                    }}
                  ></div>
                </div>
                <section className="user-info-dm">
                  <p className={changeNameClass()}>
                    {user.username ? user.username : "error"}
                  </p>
                  <div className="user-status-dm-container">
                    <p className={"has-user-status-dm blocked"}>Blocked</p>
                    <img
                      src="https://icon-library.com/images/texting-icon-png/texting-icon-png-25.jpg"
                      alt="status message"
                      className={changeDMStatusIconClass()}
                    />
                  </div>
                </section>
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
