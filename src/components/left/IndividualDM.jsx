export default function IndividualDM(props) {
  return (
    <button className="personal-dm">
      <div className="pfp-container">
        <div
          class="pfp-circle"
          style={{
            backgroundImage: `url("${props.ImgUrl}")`,
          }}
        >
          <div className="online-status-outer">
            <div className="online-status">
                
            </div>
          </div>
        </div>
      </div>
      <div className="user-info-dm">
        <p className="user-name-dm">ScottSeol</p>
        <p className="user-status-dm">Status</p>
      </div>
      <button className="dm-delete-button">×</button>
    </button>
  );
}
