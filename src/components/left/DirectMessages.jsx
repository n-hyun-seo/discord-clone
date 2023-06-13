import { useState, useRef } from "react";
export default function DirectMessages(props) {
  const [hoverState, setHoverState] = useState(false);
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
      <div className="dm-messages"> </div>
    </div>
  );
}
