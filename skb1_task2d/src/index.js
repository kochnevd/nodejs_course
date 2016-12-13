import express from 'express';
import cors from 'cors';
import canonize from './canonize'

const app = express();
app.use(cors());

app.get('/*', (req, res) => {
  console.log('url=' + req.originalUrl);

  var result = 'Invalid color';

  const color = req.query.color;
  if(color){
    console.log('color=' + color);
    const canonized = canonize(color);
    if(canonized) result = canonized;
  }

  console.log('result=' + result);
  console.log('----------------------------------------------');

  res.send(result);
});

app.listen(3000, () => {
  console.log('Listening at port 3000');
});
