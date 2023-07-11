import { useEffect, useRef, useState } from "react";
import { IndividualDM } from "./IndividualDM";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { dmUsersList } from "./dmUsersList";

export default function DirectMessages(props) {
  const [rerenderState, setRerenderState] = useState(false);
 


  const dm_text = useRef();


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
        {dmUsersList.map((user) => {
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
