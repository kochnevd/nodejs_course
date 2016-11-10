import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/task2a', (req, res) => {
  const a = +req.query.a || 0;
  const b = +req.query.b || 0;
  const sum=a+b;
  res.send(''+sum);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
