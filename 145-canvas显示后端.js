// 创建服务器对象
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const https = require("https");
// 私钥和证书
const httpsOption={
    key:fs.readFileSync("C:/Users/kenny/Desktop/activity/server/https/server.key"),
    cert:fs.readFileSync("C:/Users/kenny/Desktop/activity/server/https/server.cert"),
}
const newhttps=https.Server(httpsOption,app);

app.use(cors());
app.use(express.static("static"));

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


// app.listen(SERVER_PORT,SERVER_IP,()=>{
//     console.log(`server run https://${SERVER_IP}:${SERVER_PORT}`)
// })
newhttps.listen(8080,"192.168.31.34", () => {
    console.log(`服务启动成功!`)
    console.log(`https://192.168.31.34:${8080}`)
  })
