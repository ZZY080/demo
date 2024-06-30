const { Buffer } = require('buffer');
const fs = require("fs");
let originalText = "Hello world";
let originalBuffer = Buffer.from(originalText);


// 文本数据的编码与解码
let utf8Encoded = originalBuffer.toString("utf-8");
let utf8Decoded = Buffer.from(utf8Encoded,"utf-8").toString();

console.log("UTF-8 Encoded:",utf8Encoded);
console.log("UTF-8 Decoded:",utf8Decoded);

// Base64 编码与解码
let base64Encoded = originalBuffer.toString("base64");
let base64Decoded = Buffer.from(base64Encoded,"base64").toString();
console.log("Base64 Encoded:",base64Encoded);
console.log("Base64 Decoded:",base64Decoded);

// 二进制数据的编码与解码
let hexEncoded = originalBuffer.toString("hex");
let hexDecoded = Buffer.from(hexEncoded,"hex").toString();
console.log("Hex Encoded:",hexEncoded);
console.log("Hex Decoded:",hexDecoded);


// 图片文件读取与转码
fs.readFile("./images/refresh.png","base64",(err,res)=>{
    // console.log( res)
})


