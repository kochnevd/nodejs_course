import express from 'express';
import cors from 'cors';

function processFullname(fullname)
{
  const INVALID = 'Invalid fullname';

  if(!fullname) return INVALID;

  var fio = fullname.replace(/\s+/g, ' ').replace(/^\s+/, '');

  var fioParts = fio.split(' ');

  // Проверка, что части ФИО состоят только из букв
  var isWord = true;
  fioParts.forEach((part) => {
    // Это работает классно, но не подходит например для немецких букв типа ó
    //if ( /[^a-zа-яё]/i.test(part) ) isWord = false;

    // Будем пропускать только слова, в которых нет символов меньше A (там цифры и знаки препинания)
    for (var i = 0; i < part.length; i++) {
      if (part[i] < 'A'[0] || part[i] == '_'[0]) isWord = false;
    }
  });
  if (!isWord) return INVALID;

  switch(fioParts.length) {
    case 1: // Иванов
      fio = fioParts[0];
      break;
    case 2: // Иван Иванов
      fio = fioParts[1] + " " + fioParts[0][0] + '.';
      break;
    case 3: // Иван Иванович Иванов
        fio = fioParts[2] + " " + fioParts[0][0] + '. ' + fioParts[1][0] + '.';
        break;
    default:
      return INVALID;
  }

  return fio;
}


const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});


app.get('/task2b', (req, res) => {
  const fio = processFullname(req.query.fullname);
  console.log(req.query.fullname, fio);
  res.send(fio);
});


app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});






/*

const tests = [
  'Steven Paul Jobs',
  'Илья Валентинович Сегалович',
  'Tinna Gunnlaugsdóttir',
  'Four word full name',
  'Putin',
  'Vladimir27 Vladimirovich Putin',
  'Vladimir Vladimirovich Putin',
  '',
  null,
  undefined
];

tests.forEach((fullname) => {
  const fio = processFullname(fullname);
  console.log("" + fullname + " => " + fio);
});

*/
