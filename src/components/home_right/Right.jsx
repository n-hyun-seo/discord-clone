import { Link } from "react-router-dom";

export default function Right() {
  return (
    <div className="right">
      <div className="friends-nav">
        <div className="friends-page-indicator">
          <img
            src="https://www.nicepng.com/png/full/332-3327400_gillespie-fuels-propane-friend-icon-png-white.png"
            alt="friends"
          />
          <p>Friends</p>
        </div>
        <div className="friends-divider"></div>
        <div className="friends-nav-button-container">
          <div className="friends-nav-button">
            <Link>Online</Link>
          </div>
          <div className="friends-nav-button">
            <Link>All</Link>
          </div>
          <div className="friends-nav-button">
            <Link>Pending</Link>
          </div>
          <div className="friends-nav-button">
            <Link>Blocked</Link>
          </div>
          <div className="friends-nav-button add-friend">
            <Link>Add Friend</Link>
          </div>
        </div>
      </div>
      <div className="friends-content"></div>
    </div>
  );
}
