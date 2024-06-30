const http = require("http");
let count=0;
for(let i=0;i<100;i++){
    // console.log(count++)
    http.get("http://localhost:8080/index",(res)=>{
        res.on("data",(chunk)=>{
            console.log(chunk+="")
        })
    })
}
