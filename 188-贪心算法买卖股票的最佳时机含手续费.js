/**
 * 贪心算法概念
 * 心算法（又称贪婪算法）是指，在对问题求解时，总是做出在当前看来是最好的选择。
 * 也就是说，不从整体最优上加以考虑，算法得到的是在某种意义上的局部最优解。
 * 贪心算法不是对所有问题都能得到整体最优解，关键是贪心策略的选择。
 * 也就是说，不从整体最优上加以考虑，做出的只是在某种意义上的局部最优解
 * https://blog.csdn.net/weixin_43840202/article/details/113663291?ops_request_misc=%257B%2522request%255Fid%2522%253A%252212E80E43-368F-4AF9-BEE0-D4CD07659136%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=12E80E43-368F-4AF9-BEE0-D4CD07659136&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~rank_v31_ecpm-4-113663291-null-null.142^v100^pc_search_result_base4&utm_term=js%20%20%E8%B4%AA%E5%BF%83%E7%AE%97%E6%B3%95&spm=1018.2226.3001.4187
 */

/**
 * 输入: prices = [1, 3, 2, 8, 4, 9], fee = 2
 * 输出: 8
 * 解释: 能够达到的最大利润:
 * 在此处买入 prices[0] = 1
 * 在此处卖出 prices[3] = 8
 * 在此处买入 prices[4] = 4
 * 在此处卖出 prices[5] = 9
 * 总利润: ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
 */
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const readline = async () => new Promise((resolve) => rl.question('', resolve));
const maxProfit = (prices, fee) => {
  // 假设第一天股价为最低价
  let minPrice = prices[0];
  // 今日交易利润
  let toadyProfit = null;
  // 初始化交易总利润为0
  let totlaProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < minPrice) {
      minPrice = prices[i];
      console.log('i:', i);
    } else if ((toadyProfit = prices[i] - minPrice - fee) > 0) {
      console.log('i:', i);

      totlaProfit = totlaProfit + toadyProfit;
      // 判断后面的股票价格是否比现在高高的化直接累加收益
      minPrice = prices[i] - fee;
    }
  }
  return totlaProfit;
};

void (async function () {
  // 股票价格
  let stock_prices = (await readline())
    .split(' ')
    .map((item) => parseInt(item));
  // 一次交易的费用
  let fee = parseInt((await readline()).trim());
  console.log(maxProfit(stock_prices, fee));
})();
