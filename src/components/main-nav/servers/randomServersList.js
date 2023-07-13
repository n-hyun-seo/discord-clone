export const serversList = [];

function addToServerList(serverName, ImgUrl, serverTitle) {
  return serversList.push({
    serverName: serverName,
    ImgUrl: ImgUrl,
    serverTitle: serverTitle,
  });
}

addToServerList(
  "cats-server",
  "https://e0.pxfuel.com/wallpapers/61/978/desktop-wallpaper-cute-baby-cat-cute-cat-kitten-thumbnail.jpg",
  "Cute Cats"
);
addToServerList(
  "dogs-server",
  "https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_1280.jpg",
  "Daring Dogs"
);
addToServerList(
  "rabbits-server",
  "https://i.pinimg.com/originals/02/07/b6/0207b6b5817da1984c2f08693122f32e.jpg",
  "Radiant Rabbits"
);
addToServerList(
  "penguins-server",
  "https://i.redd.it/gy6mkbk5ffk61.jpg",
  "Precious Penguins"
);
addToServerList(
  "raccoons-server",
  "https://global.discourse-cdn.com/business4/uploads/ine/original/1X/b469f602101c113a109a0afe7d11470c1cd042a0.jpeg",
  "Rebellious Raccoons"
);
