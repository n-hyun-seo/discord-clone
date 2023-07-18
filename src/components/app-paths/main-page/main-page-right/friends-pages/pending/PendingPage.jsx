import PendingPageUser from "./PendingPageUser";
import { useContext, useEffect, useState } from "react";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { CurrentIncomingFRContext } from "../../../../../../context/CurrentIncomingFRContext";
import LoadingVisual from "../LoadingVisual";
import { CurrentPendingListContext } from "../../../../../../context/CurrentPendingListContext";

export default function PendingPage(props) {
  const [rerenderState, setRerenderState] = useState(true);

  const pendingList = useContext(CurrentPendingListContext);

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
