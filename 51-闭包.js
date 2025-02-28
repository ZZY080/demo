// 创建闭包
function outerFunction() {
  let outerVariable = 'I am outside!';
  let count = 0;

  function innerFunction() {
    count += 1;
    return count;
  }

  // 返回内部函数
  return innerFunction;
}

// 调用外部函数，获取内部函数 由于函数属于复杂数据对象因此为引用
const myFunction = outerFunction();

// 调用内部函数
console.log(myFunction()); // 输出: I am outside!
console.log(myFunction()); // 输出: I am outside!
console.log(myFunction()); // 输出: I am outside!
console.log(myFunction()); // 输出: I am outside!
