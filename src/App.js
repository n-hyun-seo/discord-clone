import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import LogInPage from "./components/app-paths/auth-page/LogInPage";
import MainPage from "./components/app-paths/MainPage";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="discord-clone" element={<LogInPage />} />
        <Route path="discord-clone/main/*" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
