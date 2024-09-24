/**
 * 贪心算法概念
 * 心算法（又称贪婪算法）是指，在对问题求解时，总是做出在当前看来是最好的选择。
 * 也就是说，不从整体最优上加以考虑，算法得到的是在某种意义上的局部最优解。
 * 贪心算法不是对所有问题都能得到整体最优解，关键是贪心策略的选择。
 * 也就是说，不从整体最优上加以考虑，做出的只是在某种意义上的局部最优解

 */
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readline = async () => new Promise((resolve) => rl.question('', resolve));
// 升序排序
const asc = function (a, b) {
  return a - b;
};
const findContentChildren = function (g, s) {
  // 饼干排序
  s.sort(asc);
  // 胃口排序
  g.sort(asc);
  let s_index = 0;
  let g_index = 0;
  while (s_index < s.length && g_index < g.length) {
    // 发现满足条件的饼干，喂饱一个孩子,那就下一个孩子
    if (s[s_index] > g[g_index]) {
      g_index++;
    }
    s_index++;
  }
  return g_index;
};
void (async function () {
  // 数据个数
  let g = (await readline()).split(' ').map((item) => parseInt(item));
  let s = (await readline())
    .trim()
    .split(' ')
    .map((item) => parseInt(item));
  const num = findContentChildren(g, s);
  console.log(num);
})();
