import { useQuery } from "@tanstack/react-query";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";
import BlockedPageUser from "./BlockedPageUser";
import { useContext, useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import LoadingVisual from "../LoadingVisual";

export default function BlockedPage(props) {
  const [rerenderState, setRerenderState] = useState(true);
  const [blockedList, setBlockedList] = useState([]);

  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", currentUserUid), async (docu) => {
      const listData = docu
        .data()
        .friends.blocked.sort((a, b) =>
          a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
        );
      setBlockedList(listData);
    });
  }, []);

  let listToUse;

  props.inputValue
    ? (listToUse = blockedList?.filter((user) =>
        user.username.toLowerCase().includes(props.inputValue.toLowerCase())
      ))
    : (listToUse = blockedList);

  return (
    <section className="friends-type-container">
      <section className="friends-type-list">
        <div className="friends-type-header">
          <p>
            {props.header} — {listToUse?.length}
          </p>
        </div>
        {listToUse?.length !== 0 ? (
          listToUse?.map((user) => (
            <BlockedPageUser
              username={user.username}
              status={user.statusMessage}
              ImgUrl={user.photoURL}
              id_number={user.uid}
              rerenderState={rerenderState}
              setRerenderState={setRerenderState}
            />
          ))
        ) : listToUse?.length === 0 && props.inputValue === "" ? (
          <p className="no-friends-found none-blocked">
            You can't unblock the Wumpus.
          </p>
        ) : (
          <p className="no-friends-found">
            Wumpus looked, but couldn't find anyone with that name.
          </p>
        )}
      </section>
    </section>
  );
}
