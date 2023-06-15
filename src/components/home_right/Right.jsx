import { Link, Route, Routes } from "react-router-dom";
import RandomServerButton from "../a_random_server/RandomServerButton";
import TestComp from "../../Testthing";
import FriendsNavButton from "./friends-nav/FriendsNavButton";

export default function Right() {
  return (
    <div className="right">
      <div className="friends-nav">
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
