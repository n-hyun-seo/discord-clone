import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router";
import Left from "./components/left/Left";
import Right from "./components/right/Right";

function App() {
  return (
    <div className="App">
      <div className="servers"></div>
      <div className="content">
        <Left />
        <Right />
      </div>
    </div>
  );
}

export default App;
