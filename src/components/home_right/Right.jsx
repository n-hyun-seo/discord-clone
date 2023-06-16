import { Link, Route, Routes } from "react-router-dom";
import TestComp from "../../Testthing";
import FriendsNavButton from "./friends-nav/FriendsNavButton";
import FriendsNavRightButton from "./friends-nav/FriendsNavRightButton";

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
            <FriendsNavButton to="/friends/addfriend" text="Add Friend" />
          </div>
        </div>
        <div className="friends-right-side">
          <FriendsNavRightButton
            containerClass="chatroom-container"
            childClass="chatroom"
            ImgUrl="https://icon-library.com/images/speech-bubble-icon-png/speech-bubble-icon-png-15.jpg"
            alt="chatroom-icon"
          />
          <div className="friends-divider"></div>
          <FriendsNavRightButton
            containerClass="inbox-container"
            childClass="inbox"
            ImgUrl="https://icons-for-free.com/download-icon-inbox+icon-1320183613807333914_512.png"
            alt="inbox-icon"
          />
          <FriendsNavRightButton
            containerClass="help-container"
            childClass="help"
            ImgUrl="https://www.freeiconspng.com/thumbs/help-icon/help-icon-12.png"
            alt="help-icon"
          />
        </div>
      </div>
      <div className="friends-content">
        <Routes>
          <Route path="/friends/online" element={<TestComp />} />
          <Route path="/friends/all" element={<TestComp />} />
          <Route path="/friends/pending" element={<TestComp />} />
          <Route path="/friends/blocked" element={<TestComp />} />
          <Route path="/friends/addfriend" element={<TestComp />} />
        </Routes>
      </div>
    </div>
  );
}
