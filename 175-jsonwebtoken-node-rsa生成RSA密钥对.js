const NodeRSA = require("node-rsa");
const jwt = require("jsonwebtoken");
const fs = require("fs");

/**
 *  生成 RSA 密钥对
 */

// // 创建2048位的RSA密钥对
const key = new NodeRSA({ b: 2048 });
//  导出私钥和公钥
const privateKey = key.exportKey("private");
const publicKey = key.exportKey("public");

// 将密钥保存到文件中
fs.writeFileSync("private.key", privateKey);
fs.writeFileSync("public.key", publicKey);

console.log(privateKey);
console.log(publicKey);
