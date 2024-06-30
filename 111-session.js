// 导入express
const express = require('express')
// 创建web服务器
const app = express()
//导入session中间件
const session = require('express-session')

app.use(express.urlencoded({extended:false}));
app.use(express.json())

//注册session
app.use(session({
    secret: "key", //值，负责对session加密
    resave: false, //固定写法
    saveUninitialized: true, //固定写法
}))
//配置这个，不然post请求是空
app.post('/login', (req, res) => {
    //只有配置了express-session这个中间件，才能通过req点出来session这个属性
    //通过 req.session追加任何属性
    req.session.user = req.body
    req.session.islogin = true
    res.send({
        status: 1,
        msg: "登录成功"
    })
})
app.get('/getsession',(req,res)=>{
    res.send({
        s:req.session,
    })
})


// 启动文本服务器
app.listen(3000,()=>{
    console.log("80服务器启动")
})
