import { db } from "../../../../../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export let pendingFriendsList = [];

export function addUserToList(
  username,
  status,
  ImgUrl,
  id_number,
  online_status,
  isIncoming,
  user_tag = "default#1234",
  about_me = "",
  member_since = "Jan 06, 2001",
  note = ""
) {
  pendingFriendsList.push({
    username: username,
    status: status,
    ImgUrl: ImgUrl,
    id_number: id_number,
    online_status: online_status,
    isIncoming: isIncoming,
    user_tag: user_tag,
    about_me: about_me,
    member_since: member_since,
    note: note,
  });

  pendingFriendsList.sort((a, b) =>
    a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
  );
}

export function returnPendingInfo(id_number) {
  let returnedUser = pendingFriendsList.filter(
    (user) => user.id_number === id_number
  );
  if (returnedUser.length !== 0) {
    return true;
  } else {
    return false;
  }
}

export function removePending(username) {
  pendingFriendsList = pendingFriendsList.filter(
    (user) => user.username !== username
  );
}

addUserToList(
  "Police",
  "",
  "https://sticker-collection.com/stickers/plain/AnimeRandom_achub/512/f2c13580-856e-4cbe-b471-d78916c5450efile_2940600.webp",
  26,
  "online",
  true
);

addUserToList(
  "Police2",
  "",
  "https://sticker-collection.com/stickers/plain/AnimeRandom_achub/512/f2c13580-856e-4cbe-b471-d78916c5450efile_2940600.webp",
  99,
  "online",
  true
);

addUserToList(
  "Police3",
  "",
  "https://sticker-collection.com/stickers/plain/AnimeRandom_achub/512/f2c13580-856e-4cbe-b471-d78916c5450efile_2940600.webp",
  98,
  "online",
  true
);

addUserToList(
  "crminal Mind",
  "",
  "https://randomwordgenerator.com/img/picture-generator/53e2dc444e57ab14f1dc8460962e33791c3ad6e04e507440772d7cdd934bc2_640.jpg",
  27,
  "dnd",
  false
);

addUserToList(
  "TheTankMan",
  "",
  "https://randomwordgenerator.com/img/picture-generator/52e9d5444351ab14f1dc8460962e33791c3ad6e04e50744172277fd0944ccd_640.jpg",
  28,
  "online",
  false
);

export const incomingFRListLength = pendingFriendsList.filter(
  (user) => user.isIncoming === true
).length;

export function removeFR(username) {
  pendingFriendsList = pendingFriendsList.filter(
    (user) => user.username !== username
  );
}

export function getIncomingFRLength() {
  return pendingFriendsList.filter((user) => user.isIncoming === true).length;
}
