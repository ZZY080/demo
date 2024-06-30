var now = new Date();
console.log(now); // Mon May 16 2022 13:30:39 GMT+0800 (中国标准时间)
console.log(now.getFullYear()); // 2022, 年份
console.log(now.getMonth()); // 4, 月份，注意月份范围是0~11，4表示五月
console.log(now.getDate()); // 16, 表示16号
console.log(now.getDay()); // 1, 表示星期一 外国人一周的开始是从礼拜天开始算的0-6，到我们这里刚好就和数字对应了
console.log(now.getHours()); // 13, 24小时制
console.log(now.getMinutes()); // 30, 分钟
console.log(now.getSeconds()); // 39, 秒
console.log(now.getMilliseconds()); // 527, 毫秒数
console.log(now.getTime()); // 1652679039527, 以number形式表示的时间戳


console.log(now.toLocaleString());
console.log(new Date(now.getTime()));
