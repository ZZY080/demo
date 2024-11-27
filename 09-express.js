const express = require('express');
const app = express();
app.get('/index', (req, res) => {
  res.send({ name: 'kenny', age: 12, sex: '男' });
});
app.get('/users', (req, res) => {
  res.send([
    { id: 1, name: 'kenny', age: 12, sex: '男' },
    { id: 2, name: 'kenny', age: 12, sex: '男' },
    { id: 3, name: 'kenny', age: 12, sex: '男' },
  ]);
});
app.listen(8089, '192.168.0.106', () => {
  console.log('http://192.168.0.106:8089');
});
