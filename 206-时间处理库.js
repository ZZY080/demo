// const luxon = require("luxon");
// const relativeTime = luxon.DateTime.fromJSDate(new Date(2025, 1, 1, 1))
//   .setLocale("zh") // 中文支持
//   .toRelative();
// console.log(relativeTime); // 输出类似 "1年前"

// const dateFns = require("date-fns");
// const { zhCN, enUS } = require("date-fns/locale");
// const relativeTime2 = dateFns.formatDistanceToNow(new Date(2025, 1, 1), {
//   addSuffix: true, // 添加 "前" / "后"
//   locale: zhCN, // 使用中文
// });

// console.log(relativeTime2); // "1年后"

const dayjs = require("dayjs");
const relativeTime3 = require("dayjs/plugin/relativeTime");
require("dayjs/locale/zh-cn");

dayjs.extend(relativeTime3);
dayjs.locale("zh-cn");

const result = dayjs(new Date(2025, 1, 1)).fromNow();
console.log(result); // "1年后"（默认不带 "大约"）
