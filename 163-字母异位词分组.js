const strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
function singleStringSort(str) {
  return str.split('').sort().join('');
}
let newstrs = strs.map((item) => {
  return singleStringSort(item);
});
let setstrs = Array.from(new Set(newstrs));
const mapstrs = new Map();
setstrs.forEach((item) => {
  mapstrs.set(item, []);
});
setstrs.forEach((key) => {
  strs.forEach((item) => {
    if (singleStringSort(item) == key) {
      mapstrs.get(key).push(item);
    }
  });
});
let entries = mapstrs.entries();
let newarray = [];
for (let [key, value] of entries) {
  newarray.push(value);
}
console.log(newarray);
