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
  "https://play-lh.googleusercontent.com/AmKSpZt_rynhOO0ID1eS0gqeW3DFzoH6KNZkAAgepQ0t9MDRQTmil-nlY5GqkZ_7El0",
  "Cute Cats"
);
addToServerList(
  "dogs-server",
  "https://m.media-amazon.com/images/I/81LyLwhZeBL.png",
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
  "Rabellious Raccoons"
);
