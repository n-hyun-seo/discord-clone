export const pendingFriendsList = [];

function addUserToList(username, status, ImgUrl, id_number, online_status) {
  return pendingFriendsList.push({
    username: username,
    status: status,
    ImgUrl: ImgUrl,
    id_number: id_number,
    online_status: online_status,
  });
}

addUserToList(
  "the faker",
  "",
  "https://randomwordgenerator.com/img/picture-generator/52e9d5444351ab14f1dc8460962e33791c3ad6e04e50744172277fd0944ccd_640.jpg",
  26,
  "online"
);

addUserToList(
  "crminal Mind",
  "",
  "https://randomwordgenerator.com/img/picture-generator/53e2dc444e57ab14f1dc8460962e33791c3ad6e04e507440772d7cdd934bc2_640.jpg",
  27,
  "dnd"
);

addUserToList(
  "TheTankMan",
  "",
  "https://randomwordgenerator.com/img/picture-generator/52e9d5444351ab14f1dc8460962e33791c3ad6e04e50744172277fd0944ccd_640.jpg",
  28,
  "online"
);

pendingFriendsList.sort((a,b) => a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1);
