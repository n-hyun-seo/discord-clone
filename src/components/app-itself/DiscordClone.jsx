import { Route, Routes, useNavigate } from "react-router";
import { useContext, useEffect, useRef, useState } from "react";
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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { CurrentUserUidContext } from "../../context/CurrentUserUidContext";
import { queryClient } from "../../App";
import { StaleUnreadListContext } from "../../context/StaleUnreadListContext";
import { Link } from "react-router-dom";
import UnreadDm from "../main-nav/UnreadDm";

export default function DiscordClone() {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentSectionLeft, setCurrentSectionLeft] = useState("friends");
  const [currentSection, setCurrentSection] = useState("online");
  const [currentDMId, setCurrentDMId] = useState("");
  const [dmButtonRef, setDmButtonRef] = useState({});
  const [currentIncomingFR, setCurrentIncomingFR] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [unreadList, setUnreadList] = useState([]);
  const [hoverState, setHoverstate] = useState(false);

  const [staleUnreadList, setStaleUnreadList] = useContext(
    StaleUnreadListContext
  );
  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);

  let navigate = useNavigate();

  useEffect(() => {
    onSnapshot(
      collection(db, "users", currentUserUid, "unreadMessagesHistory"),
      (collection) => {
        let array = [];
        collection.forEach((doc) => {
          let data = doc?.data()?.unreadHistory;

          array.push({
            numberOfUnread: data.length,
            uid: data[0]?.sentBy,
            photoURL: data[0]?.photoURL,
            username: data[0]?.username,
          });
          console.log(array);
        });
        setUnreadList(array);
        console.log(array);
      }
    );
  }, [currentDMId, currentSectionLeft, currentSection]);

  const { isLoading, isError, error } = useQuery(
    ["check-login"],
    async () => {
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
                      {unreadList.map((user) => {
                        if (user.uid !== undefined)
                          return (
                            <UnreadDm
                              username={user.username}
                              photoURL={user.photoURL}
                              numberOfUnread={user.numberOfUnread}
                              uid={user.uid}
                            />
                          );
                      })}

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
