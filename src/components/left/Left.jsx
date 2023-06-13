import Button from "./Button";
import SearchButton from "./SearchButton";
import DirectMessages from "./DirectMessages";
import UserInfo from "./UserInfo";

export default function Left() {
  return (
    <div className="left">
      <SearchButton classNaming="conversation-search" />
      <Button
        buttonClass="friends"
        containerClass="friends-container"
        text="Friends"
        source="https://www.nicepng.com/png/full/332-3327400_gillespie-fuels-propane-friend-icon-png-white.png"
      />
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
