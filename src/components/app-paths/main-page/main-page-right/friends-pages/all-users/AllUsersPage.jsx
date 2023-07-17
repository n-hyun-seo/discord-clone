import { useQuery } from "@tanstack/react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import LoadingVisual from "../LoadingVisual";
import AllUsersPageUser from "./AllUsersPageUser";
import { useContext, useEffect, useState } from "react";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";

export default function AllUsersPage(props) {
  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);
  const [allUsersList, setAllUsersList] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", "allUsersList"), async (docu) => {
      const listData = docu.data().everyUserList;

      const currentUser = listData.filter(
        (user) => user.uid === currentUserUid
      );

      currentUser[0].username = "You";
      currentUser[0].isCurrentUser = true;

      const filteredData = listData
        .filter((user) => user.uid !== currentUserUid)
        .sort((a, b) =>
          a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
        );

      filteredData.unshift(currentUser[0]);
      setAllUsersList(filteredData);
    });
  }, []);

  let listToUse;

  props.inputValue
    ? (listToUse = allUsersList?.filter((user) =>
        user.username.toLowerCase().includes(props.inputValue.toLowerCase())
      ))
    : (listToUse = allUsersList);

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
            <AllUsersPageUser
              username={user.username}
              status={user.statusMessage}
              ImgUrl={user.photoURL}
              id_number={user.uid}
              online_status={user.onlineStatus}
              isIncoming={user.requestType}
              isCurrentUser={user.isCurrentUser}
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
