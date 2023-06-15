import { Link } from "react-router-dom";
export default function FriendsNavButton(props) {
  return (
    <div className="friends-nav-button">
      <Link to={props.to}>{props.text}</Link>
    </div>
  );
}
