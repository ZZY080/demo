function myTimers() {
  let count = 0;
  // 启动定时器
  const intervalId = setInterval(function() {
    count++;
    console.log('定时器执行了', count, '次');
    if (count === 5) {
      clearInterval(intervalId); // 清除定时器
      console.log('定时器停止了');
    }
  }, 1000);
}


// 调用函数启动定时器
myTimers();
myTimers();
myTimers();
