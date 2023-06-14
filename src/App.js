import "./App.css";
import { Route, Routes } from "react-router";
import { useState } from "react";
import DiscordHomeButton from "./components/home_left/DiscordHomeButton";
import Home from "./components/home_left/Home";
import RandomServer from "./components/a_random_server/RandomServer";
import { CurrentPageContext } from "./components/context/CurrentPageContext";
import RandomServerButton from "./components/a_random_server/RandomServerButton";
import { serversList } from "./components/a_random_server/randomServersList";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="App">
      <CurrentPageContext.Provider value={[currentPage, setCurrentPage]}>
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
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
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
      </CurrentPageContext.Provider>
    </div>
  );
}

export default App;
