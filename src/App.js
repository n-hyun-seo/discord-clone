import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import LogInPage from "./components/app-paths/LogInPage";
import MainPage from "./components/app-paths/MainPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="auth" element={<LogInPage />} />
        <Route path="*" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
