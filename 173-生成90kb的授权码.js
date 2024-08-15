const crypto = require("crypto");
const base64url = require("base64url");
// 配置
const ENCRYPTION_KEY = crypto.randomBytes(32); // 32 字节的密钥，用于 AES-256
const IV_LENGTH = 16; // AES 块大小

// 生成 90KB 原始数据
function generateLargeData(sizeInBytes) {
  return crypto.randomBytes(sizeInBytes);
}

// 加密数据
function encryptData(data) {
  const iv = crypto.randomBytes(IV_LENGTH); // 生成随机 IV
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(data, "binary", "hex");
  encrypted += cipher.final("hex");

  // 拼接 IV 和加密数据
  const ivHex = iv.toString("hex");
  const activationCode = `${ivHex}:${encrypted}`;

  // 使用 Base64 编码
  return base64url.encode(activationCode);
}

// 生成约 90KB 的授权码
const rawDataSize = 90 * 1024; // 90KB
const largeData = generateLargeData(rawDataSize);
const activationCode = encryptData(largeData);

console.log("Generated Activation Code:", activationCode);
console.log(
  "Activation Code Length:",
  Buffer.from(activationCode, "base64").length,
  "bytes"
);
