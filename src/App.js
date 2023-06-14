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
            <RandomServerButton
              serverName="cats-server"
              ImgUrl="https://play-lh.googleusercontent.com/AmKSpZt_rynhOO0ID1eS0gqeW3DFzoH6KNZkAAgepQ0t9MDRQTmil-nlY5GqkZ_7El0"
              serverTitle="Cute Cats"
            />
            <RandomServerButton
              serverName="dogs-server"
              ImgUrl="https://www.rd.com/wp-content/uploads/2019/01/shutterstock_673465372.jpg?fit=700,467"
              serverTitle="Daring Dogs"
            />
            <RandomServerButton
              serverName="rabbits-server"
              ImgUrl="https://wallpaperaccess.com/full/480944.jpg"
              serverTitle="Radiant Rabbits"
            />
            <RandomServerButton
              serverName="penguins-server"
              ImgUrl="https://i.redd.it/gy6mkbk5ffk61.jpg"
              serverTitle="Precious Penguins"
            />
            <RandomServerButton
              serverName="raccoons-server"
              ImgUrl="https://global.discourse-cdn.com/business4/uploads/ine/original/1X/b469f602101c113a109a0afe7d11470c1cd042a0.jpeg"
              serverTitle="Rebellious Raccoons"
            />
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
