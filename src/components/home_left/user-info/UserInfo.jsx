import UserInfoButton from "./UserInfoButton";
export default function UserInfo(props) {
  return (
    <div className="user-info-container">
      <div className="self-info-container">
        <div className="pfp-container">
          <div
            className="pfp-circle"
            style={{
              backgroundImage: `url("${props.ImgUrl}")`,
            }}
          >
            <div className="online-status-outer">
              <div className="online-status"></div>
            </div>
          </div>
        </div>
        <div className="self-info-container-small">
          <div className="self-name">boogie mang</div>
          <div className="self-tag">boogie mang#2578</div>
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
