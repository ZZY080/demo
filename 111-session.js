// 导入express
const express = require('express');
// 创建web服务器
const app = express();
//导入session中间件
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
let mysession = {};
//注册session
app.use(
  session({
    secret: 'key', //值，负责对session加密
    resave: false, //固定写法
    saveUninitialized: true, //固定写法
  })
);
app.use((req, res, next) => {
  req.mysession = mysession;
  next();
});

//配置这个，不然post请求是空
app.get('/login', (req, res) => {
  //只有配置了express-session这个中间件，才能通过req点出来session这个属性 session 是一个全局对象
  //通过 req.session追加任何属性
  console.log(req.query);
  req.session.user = req.query;
  req.session.islogin = true;
  req.mysession = req.query;
  req.res.send({
    status: 1,
    msg: '登录成功',
    info: req.session,
    my: req.mysession,
  });
});
app.get('/getsession', (req, res) => {
  console.log(req.cookies);
  res.send({
    user: req.session.user,
  });
});

// 启动文本服务器
app.listen(3000, () => {
  console.log('http://127.0.0.1:3000 服务器启动');
});
