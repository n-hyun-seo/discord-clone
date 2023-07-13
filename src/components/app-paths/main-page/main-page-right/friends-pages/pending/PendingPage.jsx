import PendingPageUser from "./PendingPageUser";
import { useContext, useState } from "react";
import { pendingList } from "./PendingListFromDb";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { CurrentIncomingFRContext } from "../../../../../../context/CurrentIncomingFRContext";

export default function PendingPage(props) {
  const [rerenderState, setRerenderState] = useState(true);

  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);
  const [currentIncomingFR, setCurrentIncomingFR] = useContext(
    CurrentIncomingFRContext
  );

  const { isLoading, isError, data, error } = useQuery(
    ["pendingList"],
    async () => {
      const snapshot = await getDoc(doc(db, "users", currentUserUid));
      const listData = await snapshot.data().friends.pending;
      let finalList = await Promise.all(
        listData.map(async (user) => {
          const docSnapshot = await getDoc(doc(db, "users", user.uid));
          const userData = await docSnapshot.data().userInfo;
          const requestType = user.requestType;
          return { ...userData, requestType };
        })
      );
      const incomingFR = finalList.filter(
        (user) => user.requestType === "incoming"
      ).length;
      setCurrentIncomingFR(incomingFR);
      return finalList;
    },
    { refetchOnWindowFocus: false }
  );

  if (isLoading) return <p>LOADING</p>;

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
            <PendingPageUser
              username={user.username}
              status={user.statusMessages}
              ImgUrl={user.photoURL}
              id_number={user.uid}
              online_status={user.onlineStatus}
              isIncoming={user.requestType}
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
