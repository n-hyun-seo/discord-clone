
import { allFriendsList } from "./friends-list/FriendsListFromDB";
import OnlinePageUser from "./OnlinePageUser";

export default function OnlinePage(props) {
  const onlineFriendsList = allFriendsList.filter(
    (user) => user.onlineStatus !== "offline"
  );

  let listToUse;

  props.inputValue
    ? (listToUse = props.filteredList)
    : (listToUse = onlineFriendsList);

  return (
    <section className="friends-type-container">
      <section className="friends-type-list">
        <div className="friends-type-header">
          <p>
            {props.header} — {listToUse.length}
          </p>
        </div>
        <div className="test-test"></div>
        {listToUse.length !== 0 ? (
          listToUse.map((user) => (
            <OnlinePageUser
              username={user.username}
              status={user.statusMessage}
              ImgUrl={user.photoURL}
              id_number={user.uid}
              online_status={user.onlineStatus}
            />
          ))
        ) : (
          <p className="no-friends-found">
            Wumpus looked, but couldn't find anyone with that name.
          </p>
        )}
      </section>
    </section>
  );
}
