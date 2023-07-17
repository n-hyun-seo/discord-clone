import { useMutation, useQuery } from "@tanstack/react-query";
import OnlinePageUser from "./OnlinePageUser";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { useContext, useEffect, useState } from "react";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";
import LoadingVisual from "../LoadingVisual";

export default function AllPage(props) {
  const [allList, setAllList] = useState([]);

  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", currentUserUid), async (docu) => {
      const listData = docu.data().friends.all;
      setAllList(listData);
    });
  }, []);

  // let listToUse;

  // props.inputValue
  //   ? (listToUse = props.filteredList)
  //   : (listToUse = data?.sort((a, b) =>
  //       a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
  //     ));

  return (
    <section className="friends-type-container">
      <div className="friends-type-list">
        <div className="friends-type-header">
          <p>
            {props.header} — {allList?.length}
          </p>
        </div>
        {allList?.length !== 0 ? (
          allList?.map((user) => (
            <OnlinePageUser
              username={user.username}
              status={user.statusMessage}
              ImgUrl={user.photoURL}
              id_number={user.uid}
              online_status={user.onlineStatus}
            />
          ))
        ) : (
          <p className="no-friends-found">
            Wumpus looked, but couldn't find anyone with that name.
          </p>
        )}
      </div>
    </section>
  );
}
