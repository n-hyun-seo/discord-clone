import { useEffect, useRef, useState } from "react";
import { IndividualDM } from "./IndividualDM";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function DirectMessages(props) {
  const [rerenderState, setRerenderState] = useState(false);
  const [dmUsers, setDmUsers] = useState([]);
  const dm_text = useRef();

  useEffect(() => {
    (async function getDmUsersList() {
      async function getListData() {
        const user = getAuth().currentUser;
        const realtime = onSnapshot(
          doc(db, "users", user.uid),
          async (data) => {
            let listData = data.data().directMessages;
            let finalList = await Promise.all(
              listData.map(async (uid) => {
                const docSnapshot = await getDoc(doc(db, "users", uid));
                const userData = await docSnapshot.data().userInfo;
                return userData;
              })
            );
            setDmUsers(finalList);
          }
        );
      }

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await getListData();
        } else {
        }
      });
    })();
  }, [dmUsers]);

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
        {dmUsers.map((user) => {
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
