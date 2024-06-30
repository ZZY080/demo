function maxProfit(cities, k) {
    const n = cities.length;
    const dp = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        let maxProfit = 0;
        for (let j = Math.max(0, i - k); j <= Math.min(n - 1, i + k); j++) {
            maxProfit = Math.max(maxProfit, dp[j] + cities[i]);
        }
        dp[i] = maxProfit;
    }
    return dp;
}



const cities = [2, 1, 3];
const k = 1;
const result = maxProfit(cities, k);
console.log(result);