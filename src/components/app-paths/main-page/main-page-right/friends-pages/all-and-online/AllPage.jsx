import { allFriendsList } from "./FriendsListFromDB";
import OnlinePageUser from "./OnlinePageUser";

export default function AllPage(props) {
  let listToUse;

  props.inputValue
    ? (listToUse = props.filteredList)
    : (listToUse = allFriendsList);

  return (
    <section className="friends-type-container">
      <div className="friends-type-list">
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
      </div>
    </section>
  );
}
