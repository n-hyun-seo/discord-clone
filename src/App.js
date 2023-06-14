import "./App.css";
import { Route, Routes } from "react-router";
import DiscordHomeButton from "./components/home_left/DiscordHomeButton";
import { useState } from "react";
import Home from "./components/home_left/Home";
import RandomServer from "./components/a_random_server/RandomServer";
import { Link } from "react-router-dom";
import { CurrentPageContext } from "./CurrentPageContext";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="App">
      <div className="servers">
        <DiscordHomeButton
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <Link to="/test-server" onClick={() => setCurrentPage("test-server")}>
          <button>test server</button>
        </Link>
      </div>
      <CurrentPageContext.Provider value={[currentPage, setCurrentPage]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test-server" element={<RandomServer />} />
        </Routes>
      </CurrentPageContext.Provider>
    </div>
  );
}

export default App;
