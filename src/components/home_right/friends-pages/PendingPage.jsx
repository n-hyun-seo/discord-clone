import PendingPageUser from "./PendingPageUser";
import { pendingFriendsList } from "./friends-list/PendingFriendsList";
import { useState } from "react";
import { pendingList } from "./friends-list/PendingListFromDb";

export default function PendingPage(props) {
  const [rerenderState, setRerenderState] = useState(true);

  let listToUse;

  props.inputValue
    ? (listToUse = props.filteredList)
    : (listToUse = pendingList);

  return (
    <section className="friends-type-container">
      <section className="friends-type-list">
        <div className="friends-type-header">
          <p>
            {props.header} — {listToUse.length}
          </p>
        </div>
        <div className="test-test"></div>
        {listToUse.length !== 0 ? (
          listToUse.map((user) => (
            <PendingPageUser
              username={user.username}
              status={user.statusMessages}
              ImgUrl={user.photoURL}
              id_number={user.uid}
              online_status={user.onlineStatus}
              isIncoming={user.requestType}
              // rerenderState={rerenderState}
              // setRerenderState={setRerenderState}
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
