import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentSectionContext } from "../../context/CurrentSectionContext";
import { CurrentIncomingFRContext } from "../../context/CurrentIncomingFRContext";

export default function FriendsNavButton(props) {
  const [currentSection, setCurrentSection] = useContext(CurrentSectionContext);
  const [currentIncomingFR, setCurrentIncomingFR] = useContext(
    CurrentIncomingFRContext
  );

  function changeButtonClass() {
    if (currentSection === "addfriend" && props.text === "Add Friend")
      return "friends-nav-button pressed-add-friend";
    if (currentSection === props.text.toLowerCase().replace(/\s+/g, ""))
      return "friends-nav-button pressed";
    return "friends-nav-button";
  }

  return (
    <div
      className={changeButtonClass()}
      onClick={() => {
        setCurrentSection(props.text.toLowerCase().replace(/\s+/g, ""));
      }}
    >
      <Link to={props.to}>
        {props.text}
        {props.text === "Pending" && (
          <div className="incoming-FR-pending">
            <p>{currentIncomingFR}</p>
          </div>
        )}
      </Link>
    </div>
  );
}
