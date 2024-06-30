const express = require("express");
const app = express();
const {Worker}= require("worker_threads");
// 处理全局错误生成日志
require('handle-err')



   
const PORT = 3000;



const getSum = (limit)=>{
    
    let sum =0;
    for(let i=0;i<limit;i++){
        sum+=i;
    }
    return sum;
}

// 全局中间件
app.use(async (req, res) => {
    const user = await getUser()
    if (!user) throw new Error('Unauthorized')
  });

app.get("/",(req,res)=>{
    console.log(a)
    const result = getSum(1000);
    res.send(`main thread ${result}`)
})



app.get("/sepreate-thread",(req,res)=>{
    const num = req.query.num-0;
    const seprateThread = new Worker(__dirname + "/23-seprateThread.js");
    seprateThread.on("message",(result)=>{
        res.send(`Process function on seprate thread.${result}`);
    })
    seprateThread.postMessage(num);
  
})



// 全局错误处理中间件
app.use((err,req,res,next)=>{
    if(err.message=="Unauthorized"){
        res.status(401).send(err.message)
    }
    next(err);
})

app.listen(PORT,()=>{
    console.log(`server run http://127.0.0.1:${PORT}`)
})