import { useRef, useState } from "react";

export default function IndividualDM(props) {
  const [hasStatus, setHasStatus] = useState(false);

  const delete_button = useRef();
  return (
    <button
      className="personal-dm"
      onMouseEnter={() => {
        delete_button.current.classList.remove("hidden");
      }}
      onMouseLeave={() => {
        delete_button.current.classList.add("hidden");
      }}
    >
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
      <div className="user-info-dm">
        <p className="user-name-dm">
          {props.username ? props.username : "randomName123"}
        </p>
        <p className="user-status-dm">{}</p>
      </div>
      <div ref={delete_button} className="dm-delete-button hidden">
        <p>×</p>
      </div>
    </button>
  );
}

//TO DO
//Find out a way to change height of user-name-dm and user-status-dm based on whether they have a status message
//Make scroll bar not add to be part of total width
