import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import pc_parser from './pc_parser';

const app = express();
app.use(cors());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

app.get('/*', async (req, res) => {
  console.log('---------------------------------------------------------------');
  console.log('Path: ' + req.path);

  try {

    let pc = {};

    const response = await fetch(pcUrl);
    pc = await response.json();

    const parse_res = pc_parser(pc, req.path);

    console.log(parse_res);

    if (parse_res.notFound) {
      return res.status(404).send('Not Found');
    } else {
      return res.status(200).json(parse_res.result);
    }


  } catch (e) {
    console.log(e.stack);
    return res.status(500).send(e);
  }

});

app.listen(3000, () => {
  console.log('Listening at port 3000');
});
