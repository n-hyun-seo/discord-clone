export const blockedFriendsList = [];

function addUserToList(username, status, ImgUrl, id_number, online_status) {
  return blockedFriendsList.push({
    username: username,
    status: status,
    ImgUrl: ImgUrl,
    id_number: id_number,
    online_status: online_status,
  });
}