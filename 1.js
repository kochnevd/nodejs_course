/*
var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
console.log(groupBy(['one', 'two', 'three'], 'length'));
*/

var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    sum = rv[x.name];
    if (!sum) sum = 0;
    rv[x.name] = sum + x.value;
    //(rv[x.name] = rv[x.name] || []).push(x);
    return rv;
  }, {});
};

console.log(groupBy([{name: 'one', value: 2}, {name: 'two', value: 3}, {name: 'one', value: 4}]));
