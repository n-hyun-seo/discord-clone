export let randomFriendsList = [];

export function addUserToList(
  username,
  status,
  ImgUrl,
  id_number,
  online_status
) {
  randomFriendsList.push({
    username: username,
    status: status,
    ImgUrl: ImgUrl,
    id_number: id_number,
    online_status: online_status,
  });

  randomFriendsList = randomFriendsList.sort((a, b) =>
    a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
  );
}

addUserToList(
  "the jokah",
  "🙏",
  "https://wallpapers-clan.com/wp-content/uploads/2023/01/anime-aesthetic-boy-pfp-1.jpg",
  1,
  "online"
);
addUserToList(
  "oki",
  "",
  "https://i.pinimg.com/originals/cd/43/43/cd4343de0e337741f0c10b9ec91a89ba.jpg",
  18,
  "offline"
);
addUserToList(
  "bruh moment",
  "",
  "https://i.ytimg.com/vi/QWEx8HxPSls/maxresdefault.jpg",
  13,
  "online"
);

addUserToList(
  "the rock 420",
  "",
  "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/kwitgomixcskkafwyixo/the-rock?fimg-ssr-default",
  15,
  "dnd"
);
addUserToList(
  "BoringPerson",
  "",
  "https://upload.wikimedia.org/wikipedia/en/4/48/Suzumiya_Haruhi.jpg",
  16,
  "online"
);
addUserToList(
  "Doubla™",
  "",
  "https://ih1.redbubble.net/image.2941403930.2665/flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg",
  17,
  "moon"
);
addUserToList(
  "Sydney(She/Her)",
  "🏳️‍🌈🏳️‍🌈🏳️‍🌈",
  "https://images.theconversation.com/files/438138/original/file-20211216-25-1hu3e65.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
  12,
  "moon"
);

addUserToList(
  "BensonoX",
  "",
  "https://media.wired.com/photos/593261cab8eb31692072f129/master/w_2560%2Cc_limit/85120553.jpg",
  19,
  "offline"
);
addUserToList(
  "ChavChavChav",
  "Don't DM me.",
  "https://xsgames.co/randomusers/assets/avatars/male/8.jpg",
  5,
  "moon"
);
addUserToList(
  "annista",
  "",
  "https://imageio.forbes.com/specials-images/imageserve/5faad4255239c9448d6c7bcd/Best-Animal-Photos-Contest--Close-Up-Of-baby-monkey/960x0.jpg?format=jpg&width=960",
  20,
  "offline"
);
addUserToList(
  "very very",
  "",
  "https://yt3.googleusercontent.com/8MFSIvAghpDvUG189GSL-kEp1bT5hJqaPWhSBVpkLQ_XWfc9-AlQpL6cveef5-z6aSNzbQtkGA=s900-c-k-c0x00ffffff-no-rj",
  21,
  "offline"
);
addUserToList(
  "Hello!",
  "",
  "https://img.wattpad.com/cover/89571494-256-k960879.jpg",
  22,
  "offline"
);
addUserToList(
  "deleted-user",
  "",
  "https://www.dartmoorzoo.org.uk/wp-content/uploads/2021/01/Tiger-1.jpg",
  23,
  "offline"
);
addUserToList(
  "! uhhhWhat",
  "",
  "https://i.pinimg.com/originals/cb/91/2a/cb912a946f898a78797fb3d9e3a0154f.png",
  24,
  "offline"
);
addUserToList(
  "Wilted_Chicken",
  "Playing Diablo VI",
  "https://preview.redd.it/3z11zoc0rhv51.jpg?width=474&format=pjpg&auto=webp&s=7c317ebaa78a0ed72273220c3113bcf2a3666ec6",
  7,
  "moon"
);
addUserToList(
  "Eve",
  "Playing Only Up!",
  "https://s3.getstickerpack.com/storage/uploads/sticker-pack/random-anime-pack-1/tray_large.png?dd132e2029c18e12716f225f865f4958",
  25,
  "moon"
);

addUserToList(
  "! placeholder",
  "",
  "https://i.pinimg.com/originals/cb/91/2a/cb912a946f898a78797fb3d9e3a0154f.png",
  9999999,
  "online"
);

randomFriendsList.sort((a, b) =>
  a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
);
