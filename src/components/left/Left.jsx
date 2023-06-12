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
      />
      <Button
        buttonClass="discord-birthday"
        containerClass="birthday-container"
        text="Discord's Birthday"
      />
      <DirectMessages />
      <UserInfo />
    </div>
  );
}
