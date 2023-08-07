import { useContext, useEffect, useState } from "react";
import OnlinePageUser from "./OnlinePageUser";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { useQuery } from "@tanstack/react-query";
import LoadingVisual from "../LoadingVisual";

export default function OnlinePage(props) {
  const [onlineList, setOnlineList] = useState([]);

  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", currentUserUid), async (docu) => {
      const listData = docu.data().friends.all;
      let filteredList = listData
        .filter((user) => user.onlineStatus !== "offline")
        .sort((a, b) =>
          a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
        );
      setOnlineList(filteredList);
    });
  }, []);

  let listToUse;

  props.inputValue
    ? (listToUse = onlineList?.filter((user) =>
        user.username.toLowerCase().includes(props.inputValue.toLowerCase())
      ))
    : (listToUse = onlineList);

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
            <OnlinePageUser
              username={user.username}
              status={user.statusMessage}
              ImgUrl={user.photoURL}
              id_number={user.uid}
              online_status={user.onlineStatus}
            />
          ))
        ) : listToUse?.length === 0 && props.inputValue === "" ? (
          <p className="no-friends-found none-added">
            No friends are online. Here's Wumpus for now.
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
