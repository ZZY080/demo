/**
 *  创建授权码生成模块
 */
const NodeRSA = require("node-rsa");
const jwt = require("jsonwebtoken");
const fs = require("fs");

//  加载 RSA 私钥
const privateKey = fs.readFileSync("private.key", "utf8");

// 加载 RSA 公钥
const publicKey = fs.readFileSync("public.key", "utf-8");

function generateLicenseKey(userData) {
  // 创建RSA加密器 公钥用于加密数据
  const rsa = new NodeRSA(publicKey);
  // 要加密的授权数据
  const payload = {
    user: userData.user, // 用户信息
    product: userData.product, // 产品信息
    expiry: Date.now() + userData.expiry * 1000, // 过期时间(unix 时间戳)
  };
  // 使用 RSA 私钥加密数据
  const encryptedData = rsa.encrypt(JSON.stringify(payload), "base64");
  // 使用JWT对加密数据进行签名
  const token = jwt.sign(
    {
      data: encryptedData,
      exp: Math.floor(Date.now() / 1000) + userData.expiry,
    },
    privateKey,
    {
      algorithm: "RS256",
    }
  );
  return token;
}
module.exports = {
  generateLicenseKey: generateLicenseKey,
};
