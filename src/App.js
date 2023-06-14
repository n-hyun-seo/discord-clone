import "./App.css";
import { Route, Routes } from "react-router";
import { useState } from "react";
import DiscordHomeButton from "./components/home_left/DiscordHomeButton";
import Home from "./components/home_left/Home";
import RandomServer from "./components/a_random_server/RandomServer";
import { CurrentPageContext } from "./components/context/CurrentPageContext";
import RandomServerButton from "./components/a_random_server/RandomServerButton";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="App">
      <CurrentPageContext.Provider value={[currentPage, setCurrentPage]}>
        <div className="servers">
          <DiscordHomeButton />
          <div className="other-servers">
            <RandomServerButton />
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test-server" element={<RandomServer />} />
        </Routes>
      </CurrentPageContext.Provider>
    </div>
  );
}

export default App;
