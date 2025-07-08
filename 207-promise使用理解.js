// 1.Promise.all 是并行的
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise1-1000ms");
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise2-2000ms");
  }, 2000);
});

const promise3 = new Promise((resolve, reject) => {
  reject("promise3");
  //   setTimeout(() => {
  //     resolve("promise3-3000ms");
  //   }, 3000);
  console.log(1);
});

const promiseAll = [promise1, promise2, promise3];
Promise.all(promiseAll).catch((res) => {
  console.log(res);
});
