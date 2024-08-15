/**
 * 需求分析
授权码生成:

使用 RSA 加密生成授权码。
授权码包含用户信息、产品信息、有效期等。
授权码签名以确保不被篡改。
授权码验证:

使用公钥验证授权码的合法性。
解密授权码，获取其中的用户信息、产品信息和有效期。
功能模块:

授权码生成模块
授权码验证模块
密钥生成和管理模块
 */

const NodeRSA = require("node-rsa");
const jwt = require("jsonwebtoken");
const fs = require("fs");

//  加载 RSA 私钥
const privateKey = fs.readFileSync("private.key", "utf8");

// 加载 RSA 公钥
const publicKey = fs.readFileSync("public.key", "utf-8");
const {
  generateLicenseKey,
} = require("./06-jsonwebtoken-node-rsa创建授权码生成模块.js");
/**
 * 创建授权码验证模块
 * 授权码验证模块使用 RSA 公钥解密数据并验证其有效性
 */

function validateLicenseKey(license) {
  try {
    // 验证 JWT 签名
    const decode = jwt.verify(license, publicKey, { algorithms: ["RS256"] });
    console.log("decode:", decode);

    // 创建 RSA 解密器
    const rsa = new NodeRSA(privateKey);

    // 使用 RSA 公钥解密数据
    const decryptedData = rsa.decrypt(decode.data, "utf8");
    console.log("des:", decryptedData);

    // 将解密后的 JSON 数据转换为对象
    const license1 = JSON.parse(decryptedData);

    // 检查授权码是否过期;
    if (license1.expiry < Date.now()) {
      throw new Error("License key has expired.");
    }
  } catch (err) {
    console.error("invalid License Key:", err.message);
  }
}

// 验证授权码
let license = generateLicenseKey({
  user: {
    id: "202003021003",
    age: 12,
  },
  product: {
    productID: "20202",
  },
  expiry: 6, // 单位为秒
});
console.log(license);
setTimeout(() => {
  const isValid = validateLicenseKey(license);
}, 1000);
