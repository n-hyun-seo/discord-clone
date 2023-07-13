import { useEffect, useMemo, useRef, useState } from "react";
import { IndividualDM } from "./IndividualDM";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { dmUsersList } from "./dmUsersList";
import { useQuery } from "@tanstack/react-query";

export default function DirectMessages(props) {
  const [rerenderState, setRerenderState] = useState(false);
  const [dmUsersList, setDmUsersList] = useState([]);

  const dm_text = useRef();

  const {
    isLoading,
    isError,
    data,
    refetch: refetchDM,
  } = useQuery(
    ["dmList"],
    async () => {
      const snapshot = await getDoc(
        doc(db, "users", "IbpneiHIDSMGtfYbxrJ9aDz5l3z1")
      );
      const dmData = snapshot.data().directMessages;
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

  if (isLoading) return <p>loading</p>;
  if (isError) return console.log("error");

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
      <button onClick={refetchDM}>refetch</button>
    </section>
  );
}
