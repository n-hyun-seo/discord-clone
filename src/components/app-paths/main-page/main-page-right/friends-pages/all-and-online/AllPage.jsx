import { useQuery } from "@tanstack/react-query";
import { allFriendsList } from "./FriendsListFromDB";
import OnlinePageUser from "./OnlinePageUser";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { useContext } from "react";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";

export default function AllPage(props) {
  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  const { isLoading, isError, data, error } = useQuery(["allList"], async () => {
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
  });

  if (isLoading) return <p>LOADING</p>;

  let listToUse;

  props.inputValue ? (listToUse = props.filteredList) : (listToUse = data);

  return (
    <section className="friends-type-container">
      <div className="friends-type-list">
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
      </div>
    </section>
  );
}
