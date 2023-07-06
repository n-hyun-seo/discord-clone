export let randomFriendsList = [];

export function addUserToList(
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
  randomFriendsList.push({
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

  randomFriendsList = randomFriendsList.sort((a, b) =>
    a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
  );
}

export function returnFriendInfo(id_number) {
  let returnedUser = randomFriendsList.filter(
    (user) => user.id_number === id_number
  );
  if (returnedUser.length !== 0) {
    return true;
  } else {
    return false;
  }
}

export function removeFromFriendsList(id_number) {
  randomFriendsList = randomFriendsList.filter(
    (user) => user.id_number !== id_number
  );
}

addUserToList(
  "the jokah",
  "🙏",
  "https://wallpapers-clan.com/wp-content/uploads/2023/01/anime-aesthetic-boy-pfp-1.jpg",
  1,
  "online",
  "thejokah#2251",
  "I am the joker!",
  "Feb 25, 1953",
  ""
);
addUserToList(
  "oki",
  "",
  "https://i.pinimg.com/originals/cd/43/43/cd4343de0e337741f0c10b9ec91a89ba.jpg",
  18,
  "offline",
  "oki#0900",
  "oki",
  "Jan 09, 2009",
  ""
);
addUserToList(
  "bruh moment",
  "",
  "https://i.ytimg.com/vi/QWEx8HxPSls/maxresdefault.jpg",
  13,
  "online",
  "bruhmoment#9999",
  "bruhhh",
  "Sep 25, 2022",
  ""
);

addUserToList(
  "the rock 420",
  "",
  "https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/kwitgomixcskkafwyixo/the-rock?fimg-ssr-default",
  15,
  "dnd",
  "therock420#4200",
  "the rock 420",
  "Apr 20, 2020",
  ""
);
addUserToList(
  "BoringPerson",
  "",
  "https://upload.wikimedia.org/wikipedia/en/4/48/Suzumiya_Haruhi.jpg",
  16,
  "online",
  "BoringPerson#0001",
  "Nothing interesting.",
  "May 21, 2002",
  ""
);
addUserToList(
  "Doubla™",
  "",
  "https://ih1.redbubble.net/image.2941403930.2665/flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg",
  17,
  "moon",
  "Doubla#2221",
  "",
  "Dec 21, 2022",
  ""
);
addUserToList(
  "Sydney(She/Her)",
  "🏳️‍🌈🏳️‍🌈🏳️‍🌈",
  "https://images.theconversation.com/files/438138/original/file-20211216-25-1hu3e65.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
  12,
  "moon",
  "Sydney#0001",
  "One and only",
  "May 21, 2002",
  ""
);

addUserToList(
  "BensonoX",
  "",
  "https://media.wired.com/photos/593261cab8eb31692072f129/master/w_2560%2Cc_limit/85120553.jpg",
  19,
  "offline",
  "BensonoX#2221",
  "",
  "Dec 21, 2022",
  ""
);
addUserToList(
  "ChavChavChav",
  "Don't DM me.",
  "https://xsgames.co/randomusers/assets/avatars/male/8.jpg",
  5,
  "moon",
  "ChavChavChav#4239",
  "Don't ever message me. Will ignore everything.",
  "Jan 08, 2022",
  ""
);
addUserToList(
  "annista",
  "",
  "https://imageio.forbes.com/specials-images/imageserve/5faad4255239c9448d6c7bcd/Best-Animal-Photos-Contest--Close-Up-Of-baby-monkey/960x0.jpg?format=jpg&width=960",
  20,
  "offline",
  "annista#0945",
  "Hello! I am from Kentucky!",
  "Nov 11, 2011",
  ""
);
addUserToList(
  "very very",
  "",
  "https://yt3.googleusercontent.com/8MFSIvAghpDvUG189GSL-kEp1bT5hJqaPWhSBVpkLQ_XWfc9-AlQpL6cveef5-z6aSNzbQtkGA=s900-c-k-c0x00ffffff-no-rj",
  21,
  "offline",
  "veryvery#1515",
  "",
  "Jul 25, 2023",
  ""
);
addUserToList(
  "Hello!",
  "",
  "https://img.wattpad.com/cover/89571494-256-k960879.jpg",
  22,
  "offline",
  "Hello#0113",
  "Hello, Hi, Hey, Wassup, Sup, Suh",
  "Apr 01, 2000",
  ""
);
addUserToList(
  "deleted-user",
  "",
  "https://www.dartmoorzoo.org.uk/wp-content/uploads/2021/01/Tiger-1.jpg",
  23,
  "offline",
  "deleted#1111",
  "I deleted my account.",
  "Jan 01, 1999",
  ""
);
addUserToList(
  "! uhhhWhat",
  "",
  "https://i.pinimg.com/originals/cb/91/2a/cb912a946f898a78797fb3d9e3a0154f.png",
  24,
  "offline",
  "uhhhWhat#8622",
  "Uhhhhhhhhhhhhhhhhhhhhhhhhhhh what?",
  "Oct 12, 2010",
  ""
);
addUserToList(
  "Wilted_Chicken",
  "Playing Diablo VI",
  "https://preview.redd.it/3z11zoc0rhv51.jpg?width=474&format=pjpg&auto=webp&s=7c317ebaa78a0ed72273220c3113bcf2a3666ec6",
  7,
  "moon",
  "WiltedChicken#0900",
  "",
  "Sep 25, 2021",
  ""
);
addUserToList(
  "Eve",
  "Playing Only Up!",
  "https://s3.getstickerpack.com/storage/uploads/sticker-pack/random-anime-pack-1/tray_large.png?dd132e2029c18e12716f225f865f4958",
  25,
  "moon",
  "Eve#0929",
  "",
  "Sep 05, 2001",
  ""
);

addUserToList(
  "! placeholder",
  "",
  "https://i.pinimg.com/originals/cb/91/2a/cb912a946f898a78797fb3d9e3a0154f.png",
  9999999,
  "online",
  "example#1250",
  "",
  "Aug 25, 2021",
  ""
);

randomFriendsList.sort((a, b) =>
  a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1
);
