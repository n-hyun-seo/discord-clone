import { Link, Route, Routes } from "react-router-dom";
import RandomServerButton from "../a_random_server/RandomServerButton";
import TestComp from "../../Testthing";
import FriendsNavButton from "./friends-nav/FriendsNavButton";

export default function Right() {
  return (
    <div className="right">
      <div className="friends-nav">
        <div className="friends-left-side">
          <div className="friends-page-indicator">
            <img
              src="https://www.nicepng.com/png/full/332-3327400_gillespie-fuels-propane-friend-icon-png-white.png"
              alt="friends"
            />
            <p>Friends</p>
          </div>
          <div className="friends-divider"></div>
          <div className="friends-nav-button-container">
            <FriendsNavButton to="/friends/online" text="Online" />
            <FriendsNavButton to="/friends/all" text="All" />
            <FriendsNavButton to="/friends/pending" text="Pending" />
            <FriendsNavButton to="/friends/blocked" text="Blocked" />
            <FriendsNavButton to="/friends/add-friend" text="Add Friend" />
          </div>
        </div>
        <div className="friends-right-side">
          <div className="chatroom-container">
            <img
              className="chatroom"
              src="https://icon-library.com/images/speech-bubble-icon-png/speech-bubble-icon-png-15.jpg"
              alt="add"
            ></img>
          </div>
          <div className="friends-divider"></div>
          <div className="inbox-container">
            <img
              className="inbox"
              src="https://icons-for-free.com/download-icon-inbox+icon-1320183613807333914_512.png"
              alt="inbox"
            ></img>
          </div>
          <div className="help-container">
            <img
              className="help"
              src="https://www.freeiconspng.com/thumbs/help-icon/help-icon-12.png"
              alt="inbox"
            ></img>
          </div>
        </div>
      </div>
      <div className="friends-content">
        <Routes>
          <Route path="/friends/online" element={<TestComp />} />
          <Route path="/friends/all" element={<TestComp />} />
          <Route path="/friends/pending" element={<TestComp />} />
          <Route path="/friends/blocked" element={<TestComp />} />
          <Route path="/friends/add-friend" element={<TestComp />} />
        </Routes>
      </div>
    </div>
  );
}
