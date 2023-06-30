import { randomFriendsList } from "./friends-list/RandomFriendsList";
import {
  randomUsersList,
  addUserToList,
} from "../../home_left/direct_messages/randomUsersList";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CurrentDMIdContext } from "../../context/CurrentDMIdContext";
import { CurrentSectionLeftContext } from "../../context/CurrentSectionLeftContext";
import { DmButtonRefContext } from "../../context/DmButtonRef";
import Online from "../../home_left/direct_messages/status_icons/Online";
import Offline from "../../home_left/direct_messages/status_icons/Offline";
import Moon from "../../home_left/direct_messages/status_icons/Moon";
import Dnd from "../../home_left/direct_messages/status_icons/Dnd";

export default function OnlinePage(props) {
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  const [dmButtonRef, setDmButtonRef] = useContext(DmButtonRefContext);
  const [listOfDMIds, setListOfDMIds] = useState([]);
  const [hoverState, setHoverState] = useState(false);

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
            function changeNameClass() {
              if (hoverState) return "user-name-dm-hovered";
              if (!hoverState) return "user-name-dm-unhovered";
            }

            function changeDMStatusClass() {
              if (user.status !== "") {
                return "has-user-status-dm";
              } else if (user.status === "") {
                return "no-user-status-dm";
              }
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
                onMouseEnter={() => {
                  setHoverState(true);
                }}
                onMouseLeave={() => {
                  setHoverState(false);
                }}
              >
                <div className="pfp-container">
                  <div
                    className="pfp-circle"
                    style={{
                      backgroundImage: `url("${user.ImgUrl}")`,
                    }}
                  >
                    <div className="online-status-outer">
                      {user.online_status === "online" && <Online />}
                      {user.online_status === "offline" && <Offline />}
                      {user.online_status === "moon" && <Moon />}
                      {user.online_status === "dnd" && <Dnd />}
                    </div>
                  </div>
                </div>
                <section className="user-info-dm">
                  <p className={changeNameClass()}>
                    {user.username ? user.username : "randomName123"}
                  </p>
                  <div className="user-status-dm-container">
                    <p className={changeDMStatusClass()}>
                      {user.status ? user.status : ""}
                    </p>
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
