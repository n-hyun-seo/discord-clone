import { Route, Routes, useNavigate } from "react-router";
import { useState } from "react";
import DiscordHomeButton from "../home_left/DiscordHomeButton";
import Home from "../home_left/Home";
import RandomServer from "../a_random_server/RandomServer";
import { CurrentPageContext } from "../context/CurrentPageContext";
import { CurrentSectionContext } from "../context/CurrentSectionContext";
import { CurrentSectionLeftContext } from "../context/CurrentSectionLeftContext";
import { CurrentDMIdContext } from "../context/CurrentDMIdContext";
import { DmButtonRefContext } from "../context/DmButtonRef";
import { CurrentIncomingFRContext } from "../context/CurrentIncomingFRContext";
import RandomServerButton from "../a_random_server/RandomServerButton";
import { serversList } from "../a_random_server/randomServersList";
import AddServerButton from "../a_random_server/AddServerButton";
import { incomingFRListLength } from "../home_right/friends-pages/friends-list/PendingFriendsList";
import { CurrentShowProfileContext } from "../context/CurrentShowProfileContext";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function MainPage() {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentSectionLeft, setCurrentSectionLeft] = useState("friends");
  const [currentSection, setCurrentSection] = useState("online");
  const [currentDMId, setCurrentDMId] = useState("");
  const [dmButtonRef, setDmButtonRef] = useState({});
  const [currentIncomingFR, setCurrentIncomingFR] =
    useState(incomingFRListLength);
  const [showProfile, setShowProfile] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    async function checkLoggedIn() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("user in logged in, can use discord");
          console.log(user);
        } else {
          console.log(
            "user is not signed in, will be redirected to log in page"
          );
          navigate("/discord-clone");
        }
      });
    }
    checkLoggedIn();
  }, []);

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
                      <Route path="*" element={<Home />} />

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