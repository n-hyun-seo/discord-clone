import { useContext, useEffect, useRef, useState } from "react";
import { IndividualDM } from "./IndividualDM";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../../../config/firebase";
import { useQuery } from "@tanstack/react-query";
import { CurrentUserUidContext } from "../../../../../../context/CurrentUserUidContext";
import LoadingVisual from "./LoadingVisual";

export default function DirectMessages(props) {
  const [rerenderState, setRerenderState] = useState(false);
  const [dmList, setDmList] = useState([]);

  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  const dm_text = useRef();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", currentUserUid), async (docu) => {
      const listData = docu.data().directMessages;
      setDmList(listData);
    });
  }, []);

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
        {dmList?.map((user) => {
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
