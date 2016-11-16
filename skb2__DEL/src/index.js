import mongoose from 'mongoose';
import Promise from 'bluebird';

mongoose.Promise = Promise;
mongoose.connect('mongodb://publicdb.mgbeta.ru/kochnevd_skb3');
const Pet = mongoose.model('Pet', {
  type: String,
  name: String
});

var kitty = new Pet({
  name: 'Zildjian',
  type: 'cat'
});

kitty
  .save()
  .then(() => {
    console.log('success');
  })
  .catch(() => {
    console.log('err');
  });
