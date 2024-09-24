const r1 = require('readline').createInterface({ input: process.stdin });
var iter = r1[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  const [n, k] = (await readline())
    .trim()
    .split(' ')
    .map((item) => parseInt(item));
  let s = (await readline()).trim();
  let count = 0;
  const lowerCount = s
    .split('')
    .filter((char) => char >= 'a' && char <= 'z').length;
  const upperCount = n - lowerCount;
  if (k % 2 === 0) {
    if (lowerCount <= k) {
      count = upperCount + lowerCount;
      console.log(count);
      return;
    }
    count = upperCount + k;
    console.log(count);

    count = upperCount + k;
  } else {
  }
  if (lowerCount === 0 && k % 2 === 0) {
    count = upperCount;
    console.log(count);
    return;
  }
  if (lowerCount === 0 && k % 2 == 1) {
    count = upperCount - 1;
    console.log(count);
    return;
  }
  if (lowerCount <= k) {
    count = upperCount + lowerCount;
    console.log(count);
    return;
  }
})();
