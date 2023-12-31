import { Route, Routes } from "react-router-dom";
import FriendsNavButton from "./friends-nav/FriendsNavButton";
import FriendsNavRightButton from "./friends-nav/FriendsNavRightButton";
import OnlinePage from "./friends-pages/all-and-online/OnlinePage";
import AllPage from "./friends-pages/all-and-online/AllPage";
import PendingPage from "./friends-pages/pending/PendingPage";
import BlockedPage from "./friends-pages/blocked/BlockedPage";
import { useContext, useEffect, useState } from "react";
import { queryClient } from "../../../../App";
import AllUsersPage from "./friends-pages/all-users/AllUsersPage";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../config/firebase";
import { CurrentUserUidContext } from "../../../../context/CurrentUserUidContext";
import { CurrentIncomingFRContext } from "../../../../context/CurrentIncomingFRContext";
import { CurrentPendingListContext } from "../../../../context/CurrentPendingListContext";

export default function Right() {
  const [inputValue, setInputValue] = useState("");
  const [pendingList, setPendingList] = useState([]);

  const [currentUserUid, setCurrentUserUid] = useContext(CurrentUserUidContext);
  const [currentIncomingFR, setCurrentIncomingFR] = useContext(
    CurrentIncomingFRContext
  );

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", currentUserUid), async (docu) => {
      const listData = docu
        .data()
        .friends.pending.sort((a, b) =>
          a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
        );
      setPendingList(listData);

      const incomingFR = listData.filter(
        (user) => user.requestType === "incoming"
      ).length;
      setCurrentIncomingFR(incomingFR);
    });
  }, []);

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
            <FriendsNavButton to="online" text="Online" />
            <FriendsNavButton to="all" text="All" />
            <FriendsNavButton to="pending" text="Pending" />
            <FriendsNavButton to="blocked" text="Blocked" />
            <FriendsNavButton to="allusers" text="All Users" />
          </nav>
        </div>
        <div className="friends-right-side">
          {/* <FriendsNavRightButton
            containerClass="chatroom-container"
            childClass="chatroom"
            ImgUrl="https://icon-library.com/images/speech-bubble-icon-png/speech-bubble-icon-png-15.jpg"
            alt="New Group DM"
            reference=""
          /> */}
          {/* <FriendsNavRightButton
            containerClass="inbox-container"
            childClass="inbox"
            ImgUrl="https://icons-for-free.com/download-icon-inbox+icon-1320183613807333914_512.png"
            alt="Inbox"
            reference=""
          /> */}
          {/* <FriendsNavRightButton
            containerClass="help-container"
            childClass="help"
            ImgUrl="https://www.freeiconspng.com/thumbs/help-icon/help-icon-12.png"
            alt="Help"
            reference=""
          /> */}
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
                  }}
                ></input>
              </div>
            </div>
            <CurrentPendingListContext.Provider value={pendingList}>
              <Routes>
                <Route
                  path="*"
                  element={
                    <OnlinePage header="ONLINE" inputValue={inputValue} />
                  }
                />
                <Route
                  path="online"
                  element={
                    <OnlinePage header="ONLINE" inputValue={inputValue} />
                  }
                />
                <Route
                  path="all"
                  element={
                    <AllPage header="ALL FRIENDS" inputValue={inputValue} />
                  }
                />
                <Route
                  path="pending"
                  element={
                    <PendingPage header="PENDING" inputValue={inputValue} />
                  }
                />
                <Route
                  path="blocked"
                  element={
                    <BlockedPage header="BLOCKED" inputValue={inputValue} />
                  }
                />
                <Route
                  path="allusers"
                  element={
                    <AllUsersPage header="ALL USERS" inputValue={inputValue} />
                  }
                />
              </Routes>
            </CurrentPendingListContext.Provider>
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
