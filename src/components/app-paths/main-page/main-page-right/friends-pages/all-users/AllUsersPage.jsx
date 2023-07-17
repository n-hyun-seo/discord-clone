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
import { useEffect, useState } from "react";

export default function AllUsersPage(props) {
  // const [allUsersList, setAllUsersList] = useState([]);

  // useEffect(() => {
  //   const unsub = onSnapshot(collection(db, "users"), async (docu) => {
  //     console.log(docu);
  //   });
  // }, []);

  const { isLoading, data, isError, error } = useQuery(
    ["everyUserList"],
    async () => {
      let _array = [];
      const snapshot = await getDocs(collection(db, "users"));
      snapshot.forEach((doc) => {
        return _array.push(String(doc.id));
      });
      let finalList = await Promise.all(
        _array.map(async (uid) => {
          const docSnapshot = await getDoc(doc(db, "users", uid));
          const userData = await docSnapshot.data().userInfo;
          return userData;
        })
      );
      return finalList;
    }
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
