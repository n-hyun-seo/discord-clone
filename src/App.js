import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router";
import Left from "./components/left/Left";
import Right from "./components/right/Right";
import DiscordHomeButton from "./components/home_and_servers/DiscordHomeButton";
import { useState, createContext, useEffect } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const PageContext = createContext();

  return (
    <div className="App">
      <PageContext.Provider value={currentPage}>
        <div className="servers">
          <DiscordHomeButton
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </PageContext.Provider>
      <div className="content">
        <Left />
        <Right />
      </div>
    </div>
  );
}

export default App;
