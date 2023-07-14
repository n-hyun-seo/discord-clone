import { useContext } from "react";
import OnlinePageUser from "./OnlinePageUser";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { useQuery } from "@tanstack/react-query";
import LoadingVisual from "../LoadingVisual";

export default function OnlinePage(props) {
  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  const { isLoading, isError, data, error } = useQuery(
    ["onlineList"],
    async () => {
      const snapshot = await getDoc(doc(db, "users", currentUserUid));
      const listData = await snapshot.data().friends.all;
      let finalList = await Promise.all(
        listData.map(async (uid) => {
          const docSnapshot = await getDoc(doc(db, "users", uid));
          const userData = await docSnapshot.data().userInfo;
          return userData;
        })
      );
      let filteredList = finalList.filter(
        (user) => user.onlineStatus !== "offline"
      );
      return filteredList;
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
      </section>
    </section>
  );
}
