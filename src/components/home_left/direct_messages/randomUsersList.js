export let randomUsersList = [];

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
  return randomUsersList.push({
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

export function returnUserInfo(id_number) {
  let returnedUser = randomUsersList.filter(
    (user) => user.id_number === id_number
  );
  return returnedUser[0];
}

export function changeNote(id_number, newNote) {
  let user = returnUserInfo(id_number);
  user.note = newNote;
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
  "anna",
  "🌸Hello!🌸",
  "https://qph.cf2.quoracdn.net/main-qimg-89380dcfb5e239d42d8ee3475bedcd36-lq",
  2,
  "offline",
  "Anna#0001",
  '19 "She was like the Spring that came to melt away my hard and cold Winter.” -Fruits Basket',
  "Dec 25, 2013",
  ""
);
addUserToList(
  "wooooooooooo",
  "",
  "https://doitbeforeme.com/wp-content/uploads/2022/12/pfp-anime.webp",
  3,
  "offline",
  "woooooo#5312",
  "",
  "Jun 21, 2011",
  ""
);
addUserToList(
  "Alongnamethatwontfit",
  "wont fit so it will ...",
  "https://archive.org/download/discordprofilepictures/discordblue.png",
  4,
  "dnd",
  "Alongname#8872",
  "My name is too long lol",
  "Feb 99, 9999",
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
  "IGN: Ashess",
  "",
  "https://cdnstorage.sendbig.com/unreal/female.webp",
  6,
  "online",
  "Ashess#1231",
  "",
  "Mar 03, 2009",
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
  "Yраган",
  "",
  "https://i.pinimg.com/280x280_RS/37/77/3f/37773f14fac74cdeff6c00e3b8d79ec7.jpg",
  8,
  "moon",
  "Yparah#1200",
  "Hello!",
  "Mar 25, 2000",
  ""
);
addUserToList(
  "camcamm",
  "Croissant 🥐",
  "https://www.asiamediajournal.com/wp-content/uploads/2022/10/Cool-PFP-download.jpg",
  9,
  "dnd",
  "camcamm#9821",
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA I'm okay",
  "May 31, 2016",
  ""
);
addUserToList(
  "colejetto",
  "@c0le_jett0",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMnq9Mhgpm3ETi9Bc262c480GEprcI7aAlSA&usqp=CAU",
  10,
  "offline",
  "colejetto#5122",
  "@c0le_jett0",
  "Dec 25, 2011",
  ""
);
addUserToList(
  "CaptCreepy",
  "",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww&w=1000&q=80",
  11,
  "offline",
  "CaptCreepy#0900",
  "",
  "Sep 25, 2021",
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
  "hello kitty",
  "",
  "https://wallpapers.com/images/featured/xeulf538v4jogtue.jpg",
  14,
  "offline",
  "hellokitty#2221",
  "",
  "Dec 21, 2022",
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

export function removeDM(username) {
  randomUsersList = randomUsersList.filter(
    (user) => user.username !== username
  );
}
