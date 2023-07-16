import date from "date-and-time";

export default function TimeDivider(props) {
  const now = new Date();
  const currentTime = date.format(now, "MMMM DD, YYYY");
  return (
    <div className="time-container">
      <div className="time-divider"></div>
      <p className="dm-time">{currentTime}</p>
      <div className="time-divider"></div>
    </div>
  );
}
