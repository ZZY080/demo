const { error } = require('console');
const fs = require('fs');
const paths = ['166-LRU缓存算法最新.js', '167-jquery动态绑定事件.html'];

async function a() {
  const con = await Promise.all(
    paths.map((path) => {
      console.log(path);
      return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (error, result) => {
          resolve(result);
        });
      });
    })
  );
  console.log(con);
}

a();
