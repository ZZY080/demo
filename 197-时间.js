const { Duration, DateTime } = require('luxon');
const parseChatTimeDiff = (time) => {
  const currentDateTime = DateTime.local();
  const t = DateTime.fromISO(time);
  // 计算两个日期之间的差异
  const diffTime = currentDateTime.diff(t, ['days']);

  const days = diffTime.days;
  if (days >= 0 && days < 1) {
    return `${t.toFormat('HH:mm')}`;
  }
  if (days == 1) {
    return `昨天`;
  }
  if (days > 1 && days <= 7) {
    return `${t.toFormat('cccc')}`;
  }
  if (days > 7 && days < 365) {
    return `${t.toFormat('MM-dd')}`;
  }
  if (days > 365) {
    return `${t.toFormat('yyyy-MM-dd')}`;
  }
};

console.log(parseChatTimeDiff('2024-11-01T04:57:12.000Z'));
