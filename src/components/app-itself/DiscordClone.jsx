import { Route, Routes, useNavigate } from "react-router";
import { useContext, useState } from "react";
import DiscordHomeButton from "../main-nav/discord-home/DiscordHomeButton";
import MainPage from "../app-paths/main-page/MainPage";
import RandomServer from "../app-paths/server-page/ServerContent";
import { CurrentPageContext } from "../../context/CurrentPageContext";
import { CurrentSectionContext } from "../../context/CurrentSectionContext";
import { CurrentSectionLeftContext } from "../../context/CurrentSectionLeftContext";
import { CurrentDMIdContext } from "../../context/CurrentDMIdContext";
import { DmButtonRefContext } from "../../context/DmButtonRef";
import { CurrentIncomingFRContext } from "../../context/CurrentIncomingFRContext";
import RandomServerButton from "../main-nav/servers/ServerButton";
import { serversList } from "../main-nav/servers/randomServersList";
import AddServerButton from "../main-nav/server-functionality/AddServerButton";
import { CurrentShowProfileContext } from "../../context/CurrentShowProfileContext";
import { auth, db } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import LoadingVisual from "../app-paths/loading-page/LoadingVisual";
import { doc, getDoc } from "firebase/firestore";
import { CurrentUserUidContext } from "../../context/CurrentUserUidContext";
import { queryClient } from "../../App";

export default function DiscordClone() {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentSectionLeft, setCurrentSectionLeft] = useState("friends");
  const [currentSection, setCurrentSection] = useState("online");
  const [currentDMId, setCurrentDMId] = useState("");
  const [dmButtonRef, setDmButtonRef] = useState({});
  const [currentIncomingFR, setCurrentIncomingFR] = useState(0);
  const [showProfile, setShowProfile] = useState(false);

  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  let navigate = useNavigate();

  const { isLoading, isError, error } = useQuery(
    ["check-login"],
    async () => {
      await queryClient.prefetchQuery(["dmList"], async () => {
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
      });

      await queryClient.prefetchQuery(["allList"], async () => {
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

      await queryClient.prefetchQuery(["isBlockedByList"], async () => {
        const snapshot = await getDoc(doc(db, "users", currentUserUid));
        const listData = await snapshot.data().friends.isBlockedBy;
        let finalList = await Promise.all(
          listData.map(async (uid) => {
            const docSnapshot = await getDoc(doc(db, "users", uid));
            const userData = await docSnapshot.data().userInfo;
            return userData;
          })
        );
        return finalList;
      });

      await queryClient.prefetchQuery(["onlineList"], async () => {
        const snapshot = await getDoc(doc(db, "users", currentUserUid));
        const listData = await snapshot.data().friends.all;
        let finalList = await Promise.all(
          listData.map(async (uid) => {
            const docSnapshot = await getDoc(doc(db, "users", uid));
            const userData = await docSnapshot.data().userInfo;
            return userData;
          })
        );
        let filteredList = finalList.filter(
          (user) => user.onlineStatus !== "offline"
        );
        return filteredList;
      });

      await queryClient.prefetchQuery(["pendingList"], async () => {
        const snapshot = await getDoc(doc(db, "users", currentUserUid));
        const listData = await snapshot.data().friends.pending;
        let finalList = await Promise.all(
          listData.map(async (user) => {
            const docSnapshot = await getDoc(doc(db, "users", user.uid));
            const userData = await docSnapshot.data().userInfo;
            const requestType = user.requestType;
            return { ...userData, requestType };
          })
        );
        const incomingFR = finalList.filter(
          (user) => user.requestType === "incoming"
        ).length;
        setCurrentIncomingFR(incomingFR);
        return finalList;
      });

      await queryClient.prefetchQuery(["blockedList"], async () => {
        const snapshot = await getDoc(doc(db, "users", currentUserUid));
        const listData = await snapshot.data().friends.blocked;
        let finalList = await Promise.all(
          listData.map(async (uid) => {
            const docSnapshot = await getDoc(doc(db, "users", uid));
            const userData = await docSnapshot.data().userInfo;
            return userData;
          })
        );
        return finalList;
      });

      onAuthStateChanged(auth, (user) => {
        if (user) {
          return;
        } else {
          navigate("/discord-clone/login");
        }
      });
    },
    { refetchOnWindowFocus: false }
  );

  if (isLoading) return <LoadingVisual />;

  return (
    <div className="main-page">
      <CurrentShowProfileContext.Provider value={[showProfile, setShowProfile]}>
        <CurrentIncomingFRContext.Provider
          value={[currentIncomingFR, setCurrentIncomingFR]}
        >
          <DmButtonRefContext.Provider value={[dmButtonRef, setDmButtonRef]}>
            <CurrentPageContext.Provider value={[currentPage, setCurrentPage]}>
              <CurrentSectionContext.Provider
                value={[currentSection, setCurrentSection]}
              >
                <CurrentSectionLeftContext.Provider
                  value={[currentSectionLeft, setCurrentSectionLeft]}
                >
                  <CurrentDMIdContext.Provider
                    value={[currentDMId, setCurrentDMId]}
                  >
                    <nav className="servers">
                      <DiscordHomeButton />
                      <div className="other-servers">
                        {serversList.map((server) => {
                          return (
                            <RandomServerButton
                              serverName={server.serverName}
                              ImgUrl={server.ImgUrl}
                              serverTitle={server.serverTitle}
                            />
                          );
                        })}
                        <AddServerButton
                          serverName="addaserver"
                          serverTitle="Add A Server"
                        />
                      </div>
                    </nav>

                    <Routes>
                      <Route path="*" element={<MainPage />} />

                      <Route
                        path="cats-server"
                        element={<RandomServer serverName="cats-server" />}
                      />
                      <Route
                        path="dogs-server"
                        element={<RandomServer serverName="dogs-server" />}
                      />
                      <Route
                        path="rabbits-server"
                        element={<RandomServer serverName="rabbits-server" />}
                      />
                      <Route
                        path="penguins-server"
                        element={<RandomServer serverName="penguins-server" />}
                      />
                      <Route
                        path="raccoons-server"
                        element={<RandomServer serverName="raccoons-server" />}
                      />
                    </Routes>
                  </CurrentDMIdContext.Provider>
                </CurrentSectionLeftContext.Provider>
              </CurrentSectionContext.Provider>
            </CurrentPageContext.Provider>
          </DmButtonRefContext.Provider>
        </CurrentIncomingFRContext.Provider>
      </CurrentShowProfileContext.Provider>
    </div>
  );
}
