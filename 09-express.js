const express = require("express");
const app = express();
app.get("/index",(req,res)=>{
    res.send({name:"kenny",age:12,sex:"男"});
})

app.listen(8080,()=>{
    console.log("123")
})


