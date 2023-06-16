import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentSectionContext } from "../../context/CurrentSectionContext";

export default function FriendsNavButton(props) {
  const [currentSection, setCurrentSection] = useContext(CurrentSectionContext);

  return (
    <div
      className="friends-nav-button"
      onClick={() => {
        setCurrentSection(props.text.toLowerCase().replace(/\s+/g, ''));
      }}
    >
      <Link to={props.to}>{props.text}</Link>
    </div>
  );
}
