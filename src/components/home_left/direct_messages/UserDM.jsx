import { useContext, useState } from "react";
import { CurrentDMIdContext } from "../../context/CurrentDMIdContext";
import { CurrentSectionLeftContext } from "../../context/CurrentSectionLeftContext";
import { randomUsersList, returnUserInfo } from "./randomUsersList";
import FriendsNavRightButton from "../../home_right/friends-nav/FriendsNavRightButton";
import Online from "./status_icons/Online";
import Offline from "./status_icons/Offline";
import Moon from "./status_icons/Moon";
import Dnd from "./status_icons/Dnd";
import { CurrentShowProfileContext } from "../../context/CurrentShowProfileContext";

export default function UserDM() {
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  const [showProfile, setShowProfile] = useContext(CurrentShowProfileContext);

  let currentUser = returnUserInfo(currentDMId);
  console.log(currentUser);

  return (
    <div className="right">
      <div className="friends-nav">
        <div className="friends-left-side">
          <div className="pfp-container dm-header">
            <div
              className="pfp-circle dm-header"
              style={{
                backgroundImage: `url("${currentUser?.ImgUrl}")`,
              }}
            >
              <div className="online-status-outer">
                {currentUser?.online_status === "online" && <Online />}
                {currentUser?.online_status === "offline" && <Offline />}
                {currentUser?.online_status === "moon" && <Moon />}
                {currentUser?.online_status === "dnd" && <Dnd />}
              </div>
            </div>
          </div>
          <p className="dm-header-user-name">{currentUser?.username}</p>
        </div>
        <div className="friends-right-side">
          <FriendsNavRightButton
            containerClass="help-container"
            childClass="pin"
            ImgUrl="https://images.vexels.com/media/users/3/131686/isolated/preview/95d310073411ab523262be9cb43023fa-paper-pin-icon.png"
            alt="Pinned Messages"
          />

          <FriendsNavRightButton
            containerClass="help-container"
            childClass="add-hide-user"
            ImgUrl="https://toppng.com/uploads/thumbnail/user-account-management-logo-user-icon-1156286714528pikaoejc.png"
            alt={showProfile ? "Hide User Profile" : "Show User Profile"}
          />

          <FriendsNavRightButton
            containerClass="help-container"
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
      <section className="friends-content">
        <div className="friends-list-bottom-container">
          <section className="friends-list-section">
            <div className="friends-search-container">
              <div className="friends-search-input-container"></div>
            </div>
          </section>
          {showProfile && <section className="user-dm-info-section"></section>}
        </div>
      </section>
    </div>
  );
}
