const express = require("express");
const app = express();
// 密钥 secret 本质：就是一个字符串
const secretKey = "kenny";
/**
 * 用于生成jwt  JWT 的三个组成部分，从前到后分别是 Header、Payload、Signature Payload 部分才是真正的用户信息，它是用户信息经过加密之后生成的字符串。
 * Header 和 Signature 是安全性相关的部分，只是为了保证 Token 的安全性。
 */
const jwt = require("jsonwebtoken");
// 用于解析jwt字符串还原成JSON对象
const expressJWT=require("express-jwt");
/**
 * 用于解析token字符串
 * unless({path:[/^\/api\//]}) 用来指定哪些接口不需要访问权限
 */ 
app.use(expressJWT({secret:secretKey}).unless({path:[/^\/api\//]}))
app.use(express.json());
// 登录接口
app.post("/api/login",(req,res)=>{
    let {user_name,user_id} = req.body;
    // .... 省略了登录失败的情况
    // 登录成功
    res.send({
        status:200,
        message:"登录成功！",
        // 调用jwt.sign() 生成jwt字符串,三个参数分别是: 用户信息对象 加密密钥 配置对象
        token:jwt.sign({user_id:user_id,user_name:user_name},secretKey,{expiresIn:"50s"})
    })
})
// 这是一个有权限的api接口
app.get("/admin/getinfo",(req,res)=>{
    console.log(req.user);
    res.send({
        status:200,
        message:"获取用户信息成功",
        data:req.user,
    })
})

// 全局错误解析中间件
app.use((err,req,res,next)=>{
    // token字符串过期或不合法
    if(err.name=="UnauthorizedError"){
        return res.send({
            status:401,
            message:"无效的token",
        })
    }
    // 其他原因导致的错误
    res.send({
        status:500,
        message:"未知错误",
    })
    next();
})

app.listen(8080,()=>{

})