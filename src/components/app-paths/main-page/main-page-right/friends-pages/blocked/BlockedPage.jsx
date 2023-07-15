import { useQuery } from "@tanstack/react-query";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";
import { blockedList } from "./BlockedListFromDB";
import BlockedPageUser from "./BlockedPageUser";
import { useContext, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import LoadingVisual from "../LoadingVisual";

export default function BlockedPage(props) {
  const [rerenderState, setRerenderState] = useState(true);
  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  const { isLoading, isError, data, error } = useQuery(
    ["blockedList"],
    async () => {
      const snapshot = await getDoc(doc(db, "users", currentUserUid));
      const listData = await snapshot.data().friends.blocked;
      let finalList = await Promise.all(
        listData.map(async (uid) => {
          const docSnapshot = await getDoc(doc(db, "users", uid));
          const userData = await docSnapshot.data().userInfo;
          return userData;
        })
      );
      return finalList;
    },
    { refetchOnWindowFocus: false }
  );

  if (isLoading) return <LoadingVisual />;

  let listToUse;

  props.inputValue ? (listToUse = props.filteredList) : (listToUse = data);

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
