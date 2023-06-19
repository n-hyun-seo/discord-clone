import Button from "./Button";
import SearchButton from "./SearchButton";
import DirectMessages from "./direct_messages/DirectMessages";
import UserInfo from "./user-info/UserInfo";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentSectionLeftContext } from "../context/CurrentSectionLeftContext";
import { CurrentSectionContext } from "../context/CurrentSectionContext";

export default function Left() {
  const [currentSectionLeft, setCurrentSectionLeft] = useContext(
    CurrentSectionLeftContext
  );

  const [currentSection, setCurrentSection] = useContext(CurrentSectionContext);

  return (
    <div className="left">
      <SearchButton classNaming="conversation-search" />
      <Link
        to={`/friends/${currentSection}`}
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
      <Button
        buttonClass="discord-birthday"
        containerClass="birthday-container"
        text="Discord's Birthday"
        source="https://cdn3.emoji.gg/emojis/1567-birthday-discord-dark-theme.png"
      />

      <DirectMessages />

      <UserInfo ImgUrl="https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kindred_0.jpg" />
    </div>
  );
}
