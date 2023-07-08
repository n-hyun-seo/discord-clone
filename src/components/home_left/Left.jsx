import Button from "./Button";
import SearchButton from "./SearchButton";
import DirectMessages from "./direct_messages/DirectMessages";
import UserInfo from "./user-info/UserInfo";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentSectionLeftContext } from "../context/CurrentSectionLeftContext";
import { CurrentSectionContext } from "../context/CurrentSectionContext";
import { CurrentIncomingFRContext } from "../context/CurrentIncomingFRContext";

export default function Left() {
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );
  const [currentSection, setCurrentSection] = useContext(CurrentSectionContext);
  const [currentIncomingFR, setCurrentIncomingFR] = useContext(
    CurrentIncomingFRContext
  );

  return (
    <section className="left">
      <SearchButton classNaming="conversation-search" />
      <Link
        to={`friends/${currentSection}`}
        className="linkToFriends"
        onClick={() => {
          setCurrentSectionLeft("friends");
        }}
      >
        <Button
          buttonClass="friends"
          containerClass="friends-container"
          text="Friends"
          source="https://www.nicepng.com/png/full/332-3327400_gillespie-fuels-propane-friend-icon-png-white.png"
        />
      </Link>

      <DirectMessages />

      <UserInfo ImgUrl="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kindred_0.jpg" />
    </section>
  );
}
