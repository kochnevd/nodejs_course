import express from 'express';
import cors from 'cors';
import canonize from './canonize'

const app = express();
app.use(cors());

app.get('/*', (req, res) => {
  console.log('url=' + req.originalUrl);

  var result = 'Invalid username';
  
  const username = req.query.username;
  if(username){
    console.log('username=' + username);
    const canonized = canonize(username);
    if(canonized) result = canonized;
  }

  console.log('result=' + result);
  console.log('----------------------------------------------');

  res.send(result);
});

app.listen(3000, () => {
  console.log('Listening at port 3000');
});


//const arr = [
//  "https://vk.com/igor.suvorov",
//  "https://twitter.com/suvorovigor",
//  "https://telegram.me/skillbranch",
//  "Https://Telegram.ME/SkillBranch",
//  "@skillbranch",
//  "https://vk.com/skillbranch?w=wall-117903599_1076"
//];
//
//arr.forEach((url) => {
//  const username = canonize(url);
//  console.log(username);
//});
//
