const express = require("express");
const app = express();

app.get("/jsonp",(req,res)=>{
    console.log("访问成功！");
    let data={
        name:req.query.name,
        age:req.query.age
    }
    res.send(`${req.query.callback}(${JSON.stringify(data)})`)
})
app.listen(8080,()=>{
    console.log("http://127.0.0.1:8080")
})