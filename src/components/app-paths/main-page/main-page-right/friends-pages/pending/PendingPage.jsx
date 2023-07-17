import PendingPageUser from "./PendingPageUser";
import { useContext, useEffect, useState } from "react";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { CurrentIncomingFRContext } from "../../../../../../context/CurrentIncomingFRContext";
import LoadingVisual from "../LoadingVisual";

export default function PendingPage(props) {
  const [rerenderState, setRerenderState] = useState(true);
  const [pendingList, setPendingList] = useState([]);

  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);
  const [currentIncomingFR, setCurrentIncomingFR] = useContext(
    CurrentIncomingFRContext
  );

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", currentUserUid), async (docu) => {
      const listData = docu
        .data()
        .friends.pending.sort((a, b) =>
          a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
        );
      setPendingList(listData);

      const incomingFR = listData.filter(
        (user) => user.requestType === "incoming"
      ).length;
      setCurrentIncomingFR(incomingFR);
    });
  }, []);

  let listToUse;

  props.inputValue
    ? (listToUse = pendingList?.filter((user) =>
        user.username.toLowerCase().includes(props.inputValue.toLowerCase())
      ))
    : (listToUse = pendingList);

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
            <PendingPageUser
              username={user.username}
              status={user.statusMessages}
              ImgUrl={user.photoURL}
              id_number={user.uid}
              online_status={user.onlineStatus}
              isIncoming={user.requestType}
              rerenderState={rerenderState}
              setRerenderState={setRerenderState}
              // refetch={refetch}
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
