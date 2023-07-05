export let blockedFriendsList = [];

function addUserToList(
  username,
  status,
  ImgUrl,
  id_number,
  online_status,
  user_tag = "default#1234",
  about_me = "",
  member_since = "Jan 06, 2001",
  note = ""
) {
  return blockedFriendsList.push({
    username: username,
    status: status,
    ImgUrl: ImgUrl,
    id_number: id_number,
    online_status: online_status,
    user_tag: user_tag,
    about_me: about_me,
    member_since: member_since,
    note: note,
  });
}

addUserToList(
  "0021eee",
  "",
  "https://randomwordgenerator.com/img/picture-generator/52e9d5444351ab14f1dc8460962e33791c3ad6e04e50744172277fd0944ccd_640.jpg",
  29,
  "online"
);

addUserToList(
  "pbweqq",
  "",
  "https://randomwordgenerator.com/img/picture-generator/53e2dc444e57ab14f1dc8460962e33791c3ad6e04e507440772d7cdd934bc2_640.jpg",
  30,
  "moon"
);

addUserToList(
  "randomuser123",
  "",
  "https://randomwordgenerator.com/img/picture-generator/52e9d5444351ab14f1dc8460962e33791c3ad6e04e50744172277fd0944ccd_640.jpg",
  31,
  "offline"
);

addUserToList(
  "randomuser1234",
  "",
  "https://randomwordgenerator.com/img/picture-generator/52e9d5444351ab14f1dc8460962e33791c3ad6e04e50744172277fd0944ccd_640.jpg",
  32,
  "offline"
);

addUserToList(
  "randomuser1235",
  "",
  "https://randomwordgenerator.com/img/picture-generator/52e9d5444351ab14f1dc8460962e33791c3ad6e04e50744172277fd0944ccd_640.jpg",
  33,
  "offline"
);

addUserToList(
  "randomuser1232",
  "",
  "https://randomwordgenerator.com/img/picture-generator/52e9d5444351ab14f1dc8460962e33791c3ad6e04e50744172277fd0944ccd_640.jpg",
  34,
  "offline"
);

addUserToList(
  "randomuser12311",
  "",
  "https://randomwordgenerator.com/img/picture-generator/52e9d5444351ab14f1dc8460962e33791c3ad6e04e50744172277fd0944ccd_640.jpg",
  35,
  "offline"
);

addUserToList(
  "randomuser12356",
  "",
  "https://randomwordgenerator.com/img/picture-generator/52e9d5444351ab14f1dc8460962e33791c3ad6e04e50744172277fd0944ccd_640.jpg",
  36,
  "offline"
);

addUserToList(
  "randomuser12399",
  "",
  "https://randomwordgenerator.com/img/picture-generator/52e9d5444351ab14f1dc8460962e33791c3ad6e04e50744172277fd0944ccd_640.jpg",
  37,
  "offline"
);

addUserToList(
  "randomuser1",
  "",
  "https://randomwordgenerator.com/img/picture-generator/52e9d5444351ab14f1dc8460962e33791c3ad6e04e50744172277fd0944ccd_640.jpg",
  38,
  "offline"
);

addUserToList(
  "randomuser12",
  "",
  "https://randomwordgenerator.com/img/picture-generator/52e9d5444351ab14f1dc8460962e33791c3ad6e04e50744172277fd0944ccd_640.jpg",
  39,
  "offline"
);

addUserToList(
  "randomuser1111",
  "",
  "https://randomwordgenerator.com/img/picture-generator/52e9d5444351ab14f1dc8460962e33791c3ad6e04e50744172277fd0944ccd_640.jpg",
  40,
  "offline"
);

addUserToList(
  "randomuser1222",
  "",
  "https://randomwordgenerator.com/img/picture-generator/52e9d5444351ab14f1dc8460962e33791c3ad6e04e50744172277fd0944ccd_640.jpg",
  41,
  "offline"
);

addUserToList(
  "randomuser3333",
  "",
  "https://randomwordgenerator.com/img/picture-generator/52e9d5444351ab14f1dc8460962e33791c3ad6e04e50744172277fd0944ccd_640.jpg",
  42,
  "offline"
);

blockedFriendsList.sort((a, b) =>
  a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
);

export function removeBlocked(username) {
  blockedFriendsList = blockedFriendsList.filter(
    (user) => user.username !== username
  );
}
