const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readline = async () => new Promise((resolve) => rl.question('', resolve));

void (async function () {
  let results = [];
  // 数据个数
  let n = parseInt((await readline()).trim());

  for (let i = 0; i < n; i++) {
    let arrLength = parseInt((await readline()).trim());

    for (let i = 0; i < arrLength; i++) {}
    results.push(arrLength);
  }

  // 输出所有结果
  console.log(results.join('\n'));
})();
