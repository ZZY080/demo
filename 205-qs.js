const qs = require("qs");

const obj = qs.stringify({
  a: 1,
  b: 3,
  c: 4,
});
console.log(obj);
