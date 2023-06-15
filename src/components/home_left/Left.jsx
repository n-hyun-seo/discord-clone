import Button from "./Button";
import SearchButton from "./SearchButton";
import DirectMessages from "./direct_messages/DirectMessages";
import UserInfo from "./UserInfo";
import { Link } from "react-router-dom";

export default function Left() {
  return (
    <div className="left">
      <SearchButton classNaming="conversation-search" />
      <Link to="/friends/online" className="linkToFriends">
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
      <UserInfo />
    </div>
  );
}
