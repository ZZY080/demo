const crypto = require("crypto");
const base64url = require("base64url");
const uuidv4 = require("uuid").v4;

const ENCRYPTION_KEY = crypto.randomBytes(32); // 32字节密钥
const IV_LENGTH = 16; // AES块大小

// 生成带有效期的唯一数据
function generateUniqueDataWithExpiry(expiryDuration) {
  const uuid = uuidv4(); // 生成UUID
  const creationTime = Date.now().toString(); // 当前时间戳
  const expiryTime = (Date.now() + expiryDuration).toString(); // 计算到期时间
  const randomBytes = crypto.randomBytes(16).toString("hex"); // 16字节随机数

  return `${uuid}|${creationTime}|${expiryTime}|${randomBytes}`;
}

// 加密数据
function encryptData(data) {
  const iv = crypto.randomBytes(IV_LENGTH); // 生成随机IV
  const cipher = crypto.createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  const ivHex = iv.toString("hex");
  const activationCode = `${ivHex}:${encrypted}`;

  return base64url.encode(activationCode);
}

// 生成带有效期的授权码
function generateActivationCodeWithExpiry(expiryDuration) {
  const uniqueData = generateUniqueDataWithExpiry(expiryDuration);
  return encryptData(uniqueData);
}

// 解密数据
function decryptData(encodedCode) {
  const decoded = base64url.decode(encodedCode);
  const [ivHex, encrypted] = decoded.split(":");
  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

// 验证授权码的有效性和合法性
function validateActivationCode(encodedCode) {
  try {
    const decryptedData = decryptData(encodedCode);
    const [uuid, creationTime, expiryTime, randomBytes] =
      decryptedData.split("|");

    // 获取当前时间戳
    const currentTime = Date.now();

    // 验证授权码是否过期
    if (currentTime > parseInt(expiryTime, 10)) {
      console.log("Activation code has expired.");
      return false;
    }

    // 验证授权码的合法性
    // 这里可以加入更多的合法性检查，例如UUID的格式、数据完整性等
    console.log(
      `Activation Code is valid. UUID: ${uuid}, Created At: ${new Date(
        parseInt(creationTime)
      )}`
    );
    return true;
  } catch (error) {
    console.error("Invalid activation code:", error.message);
    return false;
  }
}

// 示例：生成一个有效期为1小时的授权码
// const oneHourInMillis = 60 * 60 * 1000;
const oneHourInMillis = 1 * 1000;
const activationCode = generateActivationCodeWithExpiry(oneHourInMillis);
console.log("Generated Activation Code:", activationCode);

setTimeout(() => {
  // 示例：验证生成的授权码
  const isValid = validateActivationCode(activationCode + "123");
  console.log("Is Activation Code Valid:", isValid);
}, 4 * 1000);
