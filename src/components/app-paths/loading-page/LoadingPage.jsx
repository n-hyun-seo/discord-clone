import { Route, Routes } from "react-router";
import LogInPage from "../auth-page/LogInPage";
import DiscordClone from "../../app-itself/DiscordClone";
import { useQuery } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../config/firebase";
import { useNavigate } from "react-router";
import LoadingVisual from "./LoadingVisual";
import { useEffect, useState } from "react";
import { CurrentUserUidContext } from "../../../context/CurrentUserUidContext";
import { doc, getDoc } from "firebase/firestore";
import { StaleUnreadListContext } from "../../../context/StaleUnreadListContext";

export default function LoadingPage() {
  let navigate = useNavigate();
  const [currentUserUid, setCurrentUserUid] = useState("");
  const [staleUnreadList, setStaleUnreadList] = useState([]);

  const { isLoading } = useQuery(["loading"], async () => {

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUserUid(user.uid);

        const dmUidsSnapshot = await getDoc(doc(db, "users", user.uid));
        const dmUidsData = await dmUidsSnapshot.data().directMessages;
        const dmUidsList = await dmUidsData.map((user) => user.uid);
        const unreadList = await Promise.all(
          dmUidsList.map(async (id) => {
            const _dmUidsSnapshot = await getDoc(
              doc(db, "users", user.uid, "dmMessageHistory", id)
            );
            const _dmUidsDataArray = _dmUidsSnapshot.data()?.messageHistory;
            const numberOfUnread = _dmUidsDataArray?.filter(
              (message) => message.unread === true && message.sentBy !== user.id
            ).length;

            const personSnapshot = await getDoc(doc(db, "users", id));
            const personInfo = personSnapshot.data().userInfo;

            return {
              username: personInfo.username,
              unreadAmount: numberOfUnread,
              photoURL: personInfo.photoURL,
              uid: id,
            };
          })
        ).then((data) => setStaleUnreadList(data));
        navigate("/discord-clone/main/friends/online");
      } else {
        navigate("/discord-clone/login");
      }
    });
  });

  if (isLoading) return <LoadingVisual />;

  return (
    <div className="loading-page">
      <StaleUnreadListContext.Provider
        value={[staleUnreadList, setStaleUnreadList]}
      >
        <CurrentUserUidContext.Provider
          value={[currentUserUid, setCurrentUserUid]}
        >
          <Routes>
            <Route path="discord-clone/login" element={<LogInPage />} />
            <Route path="discord-clone/main/*" element={<DiscordClone />} />
          </Routes>
        </CurrentUserUidContext.Provider>
      </StaleUnreadListContext.Provider>
    </div>
  );
}
