import { useRef, useState } from "react";
import date from "date-and-time";

export default function BlockedMessage(props) {
  const now = new Date();

  const hoursMinutes = date.transform(
    props?.timestamp?.slice(16, 21),
    "HH:mm",
    "hh:mm A"
  );
  const dayMonthYear = props?.timestamp?.slice(0, 16);

  const messageRef = useRef();
  return (
    <div className="my-message">
      <div className="pfp-container my-left">
        <img
          className="block-x"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Grey_close_x.svg/1024px-Grey_close_x.svg.png"
          alt="X"
        />
      </div>

      <div className="my-right-container">
        <p className="blocked-messages">Blocked message</p>
      </div>
    </div>
  );
}
