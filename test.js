function canonize(url) {
  //const re = new RegExp("@?(https?:)?(\/\/)?([a-z]*)");
  //const username = url.match(re);
  //const username=url;

  //     \/\/.+\/(\w+)|^(\w+)$

  var username = url.match(/\/\/.+\/([^\/\?]+)/);
  if (username && username[1]) {
    username = username[1];
  }
  else {
    var username = url.match(/^@?([^\/\?]+)/);
    if (username && username[1]) {
      username = username[1];
    }
  }

  //const  username = url.match(/^@?([^\/\?]+)/);

  return '@' + username;
};


const arr = [
  "https://vk.com/igor.suvorov",
  "https://twitter.com/suvorovigor",
  "https://telegram.me/skillbranch",
  "Https://Telegram.ME/SkillBranch",
  "@skillbranch",
  "skillbranch",
  "https://vk.com/skillbranch?w=wall-117903599_1076",
  "https://vk.com/skillbranch",
  '//vk.com/skillbranch'
];

arr.forEach((url) => {
  console.log(url);
  const username = canonize(url);
  console.log(username);
  console.log('****************************');
});
