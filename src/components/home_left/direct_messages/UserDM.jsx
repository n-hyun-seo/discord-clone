import { useContext, useRef, useState } from "react";
import { CurrentDMIdContext } from "../../context/CurrentDMIdContext";
import { CurrentSectionLeftContext } from "../../context/CurrentSectionLeftContext";
import { changeNote, randomUsersList, returnUserInfo } from "./randomUsersList";
import FriendsNavRightButton from "../../home_right/friends-nav/FriendsNavRightButton";
import Online from "./status_icons/Online";
import Offline from "./status_icons/Offline";
import Moon from "./status_icons/Moon";
import Dnd from "./status_icons/Dnd";
import { CurrentShowProfileContext } from "../../context/CurrentShowProfileContext";
import FriendsNavSearchBar from "../../home_right/friends-nav/FriendsNavSearchBar";

export default function UserDM() {
  const [currentDMId, setCurrentDMId] = useContext(CurrentDMIdContext);
  const [showProfile, setShowProfile] = useContext(CurrentShowProfileContext);
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );

  const [currentNote, setCurrentNote] = useState("default");

  let currentUser = returnUserInfo(currentDMId);

  const userProfileRef = useRef();

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
            reference=""
          />

          <FriendsNavRightButton
            containerClass="help-container"
            childClass={
              showProfile ? "add-hide-user" : "add-hide-user highlighted"
            }
            ImgUrl="https://toppng.com/uploads/thumbnail/user-account-management-logo-user-icon-1156286714528pikaoejc.png"
            alt={showProfile ? "Show User Profile" : "Hide User Profile"}
            reference={userProfileRef}
          />
          <FriendsNavSearchBar />
          <FriendsNavRightButton
            containerClass="help-container"
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
              <div className="friends-search-input-container"></div>
            </div>
          </section>
          <section ref={userProfileRef} className="user-dm-info-section">
            <div className="right-section-colored">
              <div className="pfp-container user-profile-header">
                <div
                  className="pfp-circle user-profile-header"
                  style={{
                    backgroundImage: `url("${currentUser?.ImgUrl}")`,
                  }}
                >
                  <div className="online-status-outer user-profile-header">
                    {currentUser?.online_status === "online" && <Online />}
                    {currentUser?.online_status === "offline" && <Offline />}
                    {currentUser?.online_status === "moon" && <Moon />}
                    {currentUser?.online_status === "dnd" && <Dnd />}
                  </div>
                </div>
              </div>
            </div>
            <div className="right-section-uncolored">
              <div className="user-info-box">
                <div className="user-info-username">
                  {currentUser?.username}
                </div>
                <div className="user-info-tag">{currentUser?.user_tag}</div>
                {currentUser?.about_me !== "" && (
                  <div>
                    <p className="about-me-header">ABOUT ME</p>
                    <p className="about-me-text">{currentUser?.about_me}</p>
                  </div>
                )}
                <p className="member-since-header">DISCORD MEMBER SINCE</p>
                <p className="member-since-text">{currentUser?.member_since}</p>
                <p className="note-header">NOTE</p>
                <div
                  key={`note${currentUser?.id_number}`}
                  className="note-text"
                  contentEditable
                ></div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}