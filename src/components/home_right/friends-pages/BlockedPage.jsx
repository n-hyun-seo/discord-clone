import { blockedList } from "./friends-list/BlockedListFromDB";
import BlockedPageUser from "./BlockedPageUser";
import { useState } from "react";

export default function BlockedPage(props) {
  const [rerenderState, setRerenderState] = useState(true);
  let listToUse;

  props.inputValue
    ? (listToUse = props.filteredList)
    : (listToUse = blockedList);

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
            <BlockedPageUser
              username={user.username}
              status={user.statusMessage}
              ImgUrl={user.photoURL}
              id_number={user.uid}
              rerenderState={rerenderState}
              setRerenderState={setRerenderState}
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
