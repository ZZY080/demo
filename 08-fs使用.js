let fs = require("fs");


// 删除文件
// fs.unlink("./demo.txt",(err)=>{
//     if(err){
//         return console.log("Error deleting the file:",err);
//     }
//     console.log("删除成功")
// })

// 删除目录
// fs.rmdirSync("./demo")

// 获取某个路径
// let stats = fs.statSync("demo.txt");
// if(stats.isFile()){
//     console.log("is file")
// }
// else if (stats.isDirectory()){
//     console.log("is directory")
// }

console.log(fs.existsSync("demo"))

fs.readdir("./assets/images",(err,files)=>{
    console.log(files)
})