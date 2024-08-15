const crypto = require("crypto");
const base32 = require("base32");

// 加密密钥（应存储在安全位置）
const ENCRYPTION_KEY = crypto.randomBytes(32); // 32字节的密钥
const IV_LENGTH = 16; // AES 块大小
const ALGORITHM = "aes-256-cbc"; // 使用AES-256-CBC加密算法

// 生成激活码
function generateActivationCode(productId, userId) {
  const timestamp = Date.now().toString();
  const rawData = `${productId}|${userId}|${timestamp}`;

  // 创建加密器
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(rawData, "utf8", "hex");
  encrypted += cipher.final("hex");

  // 拼接IV和加密数据
  const ivHex = iv.toString("hex");
  const activationCode = `${ivHex}:${encrypted}`;

  // 使用Base32编码（可选）
  return base32.encode(Buffer.from(activationCode, "hex"));
}

// 验证激活码
function validateActivationCode(encodedCode) {
  try {
    // 解码激活码
    const decoded = base32.decode(encodedCode).toString("hex");
    const [ivHex, encrypted] = decoded.split(":");
    const iv = Buffer.from(ivHex, "hex");

    // 创建解密器
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    // 解析原始数据
    const [productId, userId, timestamp] = decrypted.split("|");
    const currentTime = Date.now().toString();

    // 验证时间戳（例如，检查激活码是否过期）
    // 这里简单示例，不实际比较时间
    console.log(
      `Product ID: ${productId}, User ID: ${userId}, Timestamp: ${timestamp}`
    );
    return true; // 实际情况下应根据业务逻辑进行有效性检查
  } catch (error) {
    console.error("Invalid activation code:", error.message);
    return false;
  }
}

// 示例使用
const productId = "prod123";
const userId = "user456";

const activationCode = generateActivationCode(productId, userId);
console.log("Generated Activation Code:", activationCode);

const isValid = validateActivationCode(activationCode);
console.log("Is Activation Code Valid:", isValid);
