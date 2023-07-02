import { randomFriendsList } from "./friends-list/RandomFriendsList";
import {
  randomUsersList,
  addUserToList,
} from "../../home_left/direct_messages/randomUsersList";
import { Link } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { CurrentDMIdContext } from "../../context/CurrentDMIdContext";
import { CurrentSectionLeftContext } from "../../context/CurrentSectionLeftContext";
import { DmButtonRefContext } from "../../context/DmButtonRef";
import Online from "../../home_left/direct_messages/status_icons/Online";
import Offline from "../../home_left/direct_messages/status_icons/Offline";
import Moon from "../../home_left/direct_messages/status_icons/Moon";
import Dnd from "../../home_left/direct_messages/status_icons/Dnd";
import OnlinePageUser from "./OnlinePageUser";

export default function OnlinePage(props) {
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  const [dmButtonRef, setDmButtonRef] = useContext(DmButtonRefContext);
  const [listOfDMIds, setListOfDMIds] = useState([]);
  const [hoverState, setHoverState] = useState(false);
  const [moreHoverState, setMoreHoverState] = useState(false);

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
      <section className="friends-type-list">
        <div className="friends-type-header">
          <p>
            {props.header} — {listToUse.length - 1}
          </p>
        </div>
        {listToUse.length !== 0 ? (
          listToUse.map((user) => (
            <OnlinePageUser
              username={user.username}
              status={user.status}
              ImgUrl={user.ImgUrl}
              id_number={user.id_number}
              online_status={user.online_status}
            />
          ))
        ) : (
          <p className="no-friends-found">
            Wumpus looked, but couldn't find anyone with that name.
          </p>
        )}
      </section>
    </section>
  );
}
