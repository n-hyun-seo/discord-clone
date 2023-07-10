import { db, auth } from "../../../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import UserInfoButton from "./UserInfoButton";
import { useEffect, useState } from "react";

export default function UserInfo(props) {
  const [imgUrl, setImgUrl] = useState("");
  const [username, setUsername] = useState("");

  async function getUserDocument() {
    const auth = getAuth();
    if (auth.currentUser) {
      const docSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
      const data = docSnapshot.data();
      setImgUrl(data.userInfo.photoURL);
      setUsername(data.userInfo.username);
    } else {
      console.log("couldn't fetch user document");
    }
  }

  async function checkLoggedIn() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserDocument();
      } else {
      }
    });
  }

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <div className="user-info-container">
      <div className="self-info-container">
        <div className="pfp-container">
          <div
            className="pfp-circle"
            style={{
              backgroundImage: `url("${imgUrl}")`,
            }}
          >
            <div className="online-status-outer">
              <div className="online-status"></div>
            </div>
          </div>
        </div>
        <div className="self-info-container-small">
          <div className="self-name">{username}</div>
          <div className="self-tag">{username}</div>
        </div>
      </div>
      <UserInfoButton
        containerClassName="mic-container"
        ImgClassName="mic"
        alt="Microphone"
        ImgUrl="https://www.freeiconspng.com/thumbs/microphone-icon/microphone-1-icon--windows-8-metro-invert-icons--softicons-com-4.png"
      />
      <UserInfoButton
        containerClassName="headphones-container"
        ImgClassName="headphones"
        alt="Headphones"
        ImgUrl="https://cdn4.iconfinder.com/data/icons/means-of-communication/512/Headset-512.png"
      />
      <UserInfoButton
        containerClassName="settings-container"
        ImgClassName="settings"
        alt="Settings"
        ImgUrl="https://static-00.iconduck.com/assets.00/settings-icon-1964x2048-8nigtrtt.png"
      />
    </div>
  );
}
