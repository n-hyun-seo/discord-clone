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
      <div className="icon-container mic-container">
        <img
          className="mic"
          src="https://www.freeiconspng.com/thumbs/microphone-icon/microphone-1-icon--windows-8-metro-invert-icons--softicons-com-4.png"
          alt="mic"
        ></img>
      </div>
      <div className="icon-container headphones-container">
        <img
          src="https://cdn4.iconfinder.com/data/icons/means-of-communication/512/Headset-512.png"
          alt="headphones"
          className="headphones"
        ></img>
      </div>
      <div className="icon-container settings-container">
        <img src="https://static-00.iconduck.com/assets.00/settings-icon-1964x2048-8nigtrtt.png" alt="settings"
        className="settings"></img>
      </div>
    </div>
  );
}
