const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const fs = require("fs");
const path = require("path");


app.use(cors());
app.use(express.static("assets/statics"))
app.use(express.static("public"));
app.use("/assets/images",express.static("assets/images"))

let ip=`http://itpzwg.natappfree.cc`;

// 配置multer中间件，指定文件上传目录
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"assets/images");
    },
    filename:function(req,file,cb){
        // 保留原始文件名
        cb(null,file.originalname);
    }
})
const upload = multer({storage:storage});



app.post("/upload",upload.single("file"),(req,res)=>{
    if(!req.file){
        return res.status(400).send("未选择文件")
    }
    res.status(200).send("文件上传成功")
})
app.get("/getfilename",(req,res)=>{
    let fileList =[];
    fs.readdir("./assets/images",(err,files)=>{
        files.forEach((item,index)=>{
            let itemobj ={};
            itemobj["imgsrc"]=ip+"/assets/images/"+item;
            itemobj['imgpath']= "./assets/images/"+item;
            fileList.push(itemobj);
        })
        res.send(fileList);
    })
})
app.delete("/upload",(req,res)=>{
    let path = req.query.path;
    fs.unlink(path,(err)=>{
        if(err){
            return res.status(400).send("文件删除失败");
        }else {
            res.status(200).send("文件删除成功！")
        }
    })
})
app.get("/",(req,res)=>{
   res.sendFile(path.join(__dirname,"assets/statics","index.html"))
})

let PORT=8080;
let IP = "127.0.0.1"

app.listen(PORT,IP,()=>{
    console.log(`Server run http://${IP}:${PORT}`)
})