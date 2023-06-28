import { useRef } from "react";
import { IndividualDM } from "./IndividualDM";
import { randomUsersList } from "./randomUsersList";
export default function DirectMessages(props) {
  const dm_text = useRef();

  return (
    <div className="direct-messages-container">
      <div
        className="dm-header"
        onMouseEnter={() => {
          dm_text.current.classList.add("hovered");
        }}
        onMouseLeave={() => {
          dm_text.current.classList.remove("hovered");
        }}
      >
        <p ref={dm_text}>DIRECT MESSAGES</p>
        <div className="add-sign">+</div>
      </div>
      <div className="dm-messages">
        {randomUsersList.map((user) => {
          return (
            <IndividualDM
              username={user.username}
              status={user.status}
              ImgUrl={user.ImgUrl}
              id_number={user.id_number}
              online_status={user.online_status}
            />
          );
        })}
      </div>
    </div>
  );
}
