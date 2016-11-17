export default function canonize(url) {
  
  var username = url.match(/.+\/([^\/\?]+)/);

  if (username && username[1]) {
    username = username[1];
  }
  else {
    var username = url.match(/^@?([^\/\?]+)/);
    if (username && username[1]) {
      username = username[1];
    }
  }

  return '@' + username;
};
