import { Route, Routes } from "react-router-dom";
import FriendsNavButton from "./friends-nav/FriendsNavButton";
import FriendsNavRightButton from "./friends-nav/FriendsNavRightButton";
import OnlinePage from "./friends-pages/OnlinePage";
import AllPage from "./friends-pages/AllPage";
import PendingPage from "./friends-pages/PendingPage";
import BlockedPage from "./friends-pages/BlockedPage";
import AddFriendPage from "./friends-pages/AddFriendPage";
import { useState } from "react";
import { randomFriendsList } from "./friends-pages/friends-list/RandomFriendsList";
import { pendingFriendsList } from "./friends-pages/friends-list/PendingFriendsList";
import { blockedFriendsList } from "./friends-pages/friends-list/BlockedFriendsList";

export default function Right() {
  const [inputValue, setInputValue] = useState("");
  let filteredFriendsList = randomFriendsList.filter((user) =>
    user.username.toLowerCase().includes(inputValue.toLowerCase())
  );
  let filteredPendingList = pendingFriendsList.filter((user) =>
    user.username.toLowerCase().includes(inputValue.toLowerCase())
  );
  let filteredBlockedList = blockedFriendsList.filter((user) =>
    user.username.toLowerCase().includes(inputValue.toLowerCase())
  );

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

          <nav className="friends-nav-button-container">
            <FriendsNavButton to="/friends/online" text="Online" />
            <FriendsNavButton to="/friends/all" text="All" />
            <FriendsNavButton to="/friends/pending" text="Pending" />
            <FriendsNavButton to="/friends/blocked" text="Blocked" />
            <FriendsNavButton to="/friends/addfriend" text="Add Friend" />
          </nav>
        </div>
        <div className="friends-right-side">
          <FriendsNavRightButton
            containerClass="chatroom-container"
            childClass="chatroom"
            ImgUrl="https://icon-library.com/images/speech-bubble-icon-png/speech-bubble-icon-png-15.jpg"
            alt="New Group DM"
            reference=""
          />
          <div className="friends-divider"></div>
          <FriendsNavRightButton
            containerClass="inbox-container"
            childClass="inbox"
            ImgUrl="https://icons-for-free.com/download-icon-inbox+icon-1320183613807333914_512.png"
            alt="Inbox"
            reference=""
          />
          <FriendsNavRightButton
            containerClass="help-container"
            childClass="help"
            ImgUrl="https://www.freeiconspng.com/thumbs/help-icon/help-icon-12.png"
            alt="Help"
            reference=""
          />
        </div>
      </div>
      <section className="friends-content">
        <div className="friends-list-bottom-container">
          <section className="friends-list-section">
            <div className="friends-search-container">
              <div className="friends-search-input-container">
                <input
                  className="friends-search-input"
                  placeholder="Search"
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    console.log(filteredFriendsList);
                  }}
                ></input>
              </div>
            </div>
            <Routes>
              <Route
                path="/discord-clone"
                element={
                  <OnlinePage
                    header="ONLINE"
                    inputValue={inputValue}
                    filteredList={filteredFriendsList}
                  />
                }
              />
              <Route
                path="/friends/online"
                element={
                  <OnlinePage
                    header="ONLINE"
                    inputValue={inputValue}
                    filteredList={filteredFriendsList}
                  />
                }
              />
              <Route
                path="/friends/all"
                element={
                  <AllPage
                    header="ALL FRIENDS"
                    inputValue={inputValue}
                    filteredList={filteredFriendsList}
                  />
                }
              />
              <Route
                path="/friends/pending"
                element={
                  <PendingPage
                    header="PENDING"
                    inputValue={inputValue}
                    filteredList={filteredPendingList}
                  />
                }
              />
              <Route
                path="/friends/blocked"
                element={
                  <BlockedPage
                    header="BLOCKED"
                    inputValue={inputValue}
                    filteredList={filteredBlockedList}
                  />
                }
              />
              <Route path="/friends/addfriend" element={<AddFriendPage />} />
            </Routes>
          </section>
          <section className="friends-active-now">
            <p className="friends-active-now-header1">Active Now</p>
            <div className="friends-active-now-container">
              <p className="friends-active-now-header2">
                It's quiet for now...
              </p>
              <p className="friends-active-now-header3">
                When a friend starts an activity—like playing a game or hanging
                out on voice—we'll show it here!
              </p>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
