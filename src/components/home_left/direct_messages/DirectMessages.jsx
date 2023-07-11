import { useEffect, useRef, useState } from "react";
import { IndividualDM } from "./IndividualDM";
import { doc, getDoc } from "firebase/firestore";
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
        const docSnapshot = await getDoc(doc(db, "users", user.uid));
        let listData = docSnapshot.data().directMessages;
        let finalList = await Promise.all(
          listData.map(async (uid) => {
            const docSnapshot = await getDoc(doc(db, "users", uid));
            const userData = await docSnapshot.data().userInfo;
            return userData;
          })
        );
        return finalList;
      }

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setDmUsers(await getListData());
        } else {
        }
      });
    })();
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
        {dmUsers.map((user) => {
          return (
            <IndividualDM
            // username={username}
            // status={status}
            // ImgUrl={ImgUrl}
            // id_number={uid}
            // online_status={online_status}
            // rerenderState={rerenderState}
            // setRerenderState={setRerenderState}
            />
          );
        })}
      </aside>
    </section>
  );
}
