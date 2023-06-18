import "./App.css";
import { Route, Routes } from "react-router";
import { useState } from "react";
import DiscordHomeButton from "./components/home_left/DiscordHomeButton";
import Home from "./components/home_left/Home";
import RandomServer from "./components/a_random_server/RandomServer";
import { CurrentPageContext } from "./components/context/CurrentPageContext";
import { CurrentSectionContext } from "./components/context/CurrentSectionContext";
import { CurrentSectionLeftContext } from "./components/context/CurrentSectionLeftContext";
import { CurrentDMIdContext } from "./components/context/CurrentDMIdContext";
import RandomServerButton from "./components/a_random_server/RandomServerButton";
import { serversList } from "./components/a_random_server/randomServersList";
import AddServerButton from "./components/a_random_server/AddServerButton";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [currentSectionLeft, setCurrentSectionLeft] = useState("friends");
  const [currentSection, setCurrentSection] = useState("online");
  const [currentDMId, setCurrentDMId] = useState("");

  return (
    <div className="App">
      <CurrentPageContext.Provider value={[currentPage, setCurrentPage]}>
        <CurrentSectionContext.Provider
          value={[currentSection, setCurrentSection]}
        >
          <CurrentSectionLeftContext.Provider
            value={[currentSectionLeft, setCurrentSectionLeft]}
          >
            <CurrentDMIdContext.Provider value={[currentDMId, setCurrentDMId]}>
              <div className="servers">
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
                  <AddServerButton serverName="addaserver" serverTitle="Add A Server" />
                </div>
              </div>

              <Routes>
                <Route path="*" element={<Home />} />

                <Route
                  path="/cats-server"
                  element={<RandomServer serverName="cats-server" />}
                />
                <Route
                  path="/dogs-server"
                  element={<RandomServer serverName="dogs-server" />}
                />
                <Route
                  path="/rabbits-server"
                  element={<RandomServer serverName="rabbits-server" />}
                />
                <Route
                  path="/penguins-server"
                  element={<RandomServer serverName="penguins-server" />}
                />
                <Route
                  path="/raccoons-server"
                  element={<RandomServer serverName="raccoons-server" />}
                />
              </Routes>
            </CurrentDMIdContext.Provider>
          </CurrentSectionLeftContext.Provider>
        </CurrentSectionContext.Provider>
      </CurrentPageContext.Provider>
    </div>
  );
}

export default App;
