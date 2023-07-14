import { useContext, useRef, useState } from "react";
import { IndividualDM } from "./IndividualDM";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { useQuery } from "@tanstack/react-query";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";
import LoadingVisual from "./LoadingVisual";

export default function DirectMessages(props) {
  const [rerenderState, setRerenderState] = useState(false);

  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  const dm_text = useRef();

  const {
    isLoading,
    isError,
    data,
    error,
    refetch: refetchDM,
  } = useQuery(
    ["dmList"],
    async () => {
      const snapshot = await getDoc(doc(db, "users", currentUserUid));
      const dmData = await snapshot.data().directMessages;
      let finalList = await Promise.all(
        dmData.map(async (uid) => {
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

  return (
    <section className="direct-messages-container">
      <div
        className="dm-header"
        onMouseEnter={() => {
          dm_text.current.classList.add("hovered");
        }}
        onMouseLeave={() => {
          dm_text.current.classList.remove("hovered");
        }}
      >
        <p ref={dm_text}>DIRECT MESSAGES</p>
        <div className="add-sign">+</div>
      </div>
      <aside className="dm-messages">
        {data?.map((user) => {
          return (
            <IndividualDM
              username={user.username}
              status={user.statusMessage}
              ImgUrl={user.photoURL}
              id_number={user.uid}
              online_status={user.onlineStatus}
              rerenderState={rerenderState}
              setRerenderState={setRerenderState}
            />
          );
        })}
      </aside>
    </section>
  );
}
