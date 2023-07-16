import { useMutation, useQuery } from "@tanstack/react-query";
import OnlinePageUser from "./OnlinePageUser";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { useContext } from "react";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";
import LoadingVisual from "../LoadingVisual";

export default function AllPage(props) {
  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  const { isLoading, isError, data, error } = useQuery(
    ["allList"],
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
      return finalList;
    },
    { refetchOnWindowFocus: false }
  );

  if (isLoading) return <LoadingVisual />;
  if (isError) console.log(error);

  let listToUse;

  props.inputValue
    ? (listToUse = props.filteredList)
    : (listToUse = data?.sort((a, b) =>
        a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
      ));

  return (
    <section className="friends-type-container">
      <div className="friends-type-list">
        <div className="friends-type-header">
          <p>
            {props.header} — {data.length}
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
        ) : (
          <p className="no-friends-found">
            Wumpus looked, but couldn't find anyone with that name.
          </p>
        )}
      </div>
    </section>
  );
}
