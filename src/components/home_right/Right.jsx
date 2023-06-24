import { Link, Route, Routes } from "react-router-dom";

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
            alt="New Group DM"
          />
          <div className="friends-divider"></div>
          <FriendsNavRightButton
            containerClass="inbox-container"
            childClass="inbox"
            ImgUrl="https://icons-for-free.com/download-icon-inbox+icon-1320183613807333914_512.png"
            alt="Inbox"
          />
          <FriendsNavRightButton
            containerClass="help-container"
            childClass="help"
            ImgUrl="https://www.freeiconspng.com/thumbs/help-icon/help-icon-12.png"
            alt="Help"
          />
        </div>
      </div>
      <div className="friends-content">
        <div className="friends-list-bottom-container">
          <div className="friends-list-section">
            <Routes>
              {/* <Route path="/friends/online" element={<TestComp />} />
              <Route path="/friends/all" element={<TestComp />} />
              <Route path="/friends/pending" element={<TestComp />} />
              <Route path="/friends/blocked" element={<TestComp />} />
              <Route path="/friends/addfriend" element={<TestComp />} /> */}
            </Routes>
          </div>
          <div className="friends-active-now">
            <p className="friends-active-now header1">Active Now</p>
            <p className="friends-active-now header2">It's quiet for now...</p>
            <p className="friends-active-now header3">When a friend starts an activity—like playing a game or hanging out on voice—we'll show it here!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
