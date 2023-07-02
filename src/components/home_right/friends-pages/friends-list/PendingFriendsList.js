import { CurrentIncomingFRContext } from "../../../context/CurrentIncomingFRContext";
import { useContext } from "react";


export const pendingFriendsList = [];


function addUserToList(
  username,
  status,
  ImgUrl,
  id_number,
  online_status,
  isIncoming
) {
  return pendingFriendsList.push({
    username: username,
    status: status,
    ImgUrl: ImgUrl,
    id_number: id_number,
    online_status: online_status,
    isIncoming: isIncoming,
  });
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

pendingFriendsList.sort((a, b) =>
  a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
);

export const incomingFRListLength = pendingFriendsList.filter(user => user.isIncoming === true).length; 
