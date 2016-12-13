function canonize(item) {

  var result = item.toLowerCase().trim();

  // Вначале уже может быть решетка, уберем ее, чтоб не мешалась
  if (result.length>0 && result[0]=='#') {
    result = result.substr(1);
  }

  result = result.match(/^(\d|[a-f]){1,6}$/);
  if (result && result[1]) {
    result = result[0];
    switch (result.length) {
      //case 1:
      //  result=result.repeat(2)+'0'.repeat(4);
      //  break;
      //case 2:
      //  result=result+'0'.repeat(4);
      //  break;
      case 3:
        result=result[0].repeat(2)+result[1].repeat(2)+result[2].repeat(2);
        break;
      //case 4:
      //  result=result+'0'.repeat(2);
      //  break;
      case 6:
        break;
      default:
        result=null;
    }
  }

  if(result)
    return '#' + result;
  else
    return result;

};


const arr = [
  " 123abc",
  "123abc",
  "123ABC",
  "fff",
  "xfiles",
  "ff4000",
  "abc",
  "ab",
  "abcd",
  "abcde",
  "b",
  "",
  "0",
  "#123abc",
];

arr.forEach((item) => {
  console.log(item);
  const color = canonize(item);
  console.log(color);
  console.log('****************************');
});
