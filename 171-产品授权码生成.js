const crypto = require("crypto");
require("dotenv").config();
class LicenseService {
  generateRandomString(length) {
    return crypto.randomBytes(length).toString("hex");
  }

  encryptData(data) {
    const ENCRYPTION_KEY = Buffer.from(process.env.ENCRYPTION_KEY, "hex"); // 或 'utf8'，具体取决于你密钥的存储方式
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16); // 16 字节的IV
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
  }

  generateChecksum(data) {
    return crypto.createHash("sha256").update(data).digest("hex").substr(0, 8);
  }

  generateComplexLicense(productType, userId, region) {
    const timestamp = Date.now().toString(36); // 转换为36进制的时间戳，较短
    const randomSegment = this.generateRandomString(8); // 8字节的随机字符串
    const userSegment = crypto
      .createHash("sha256")
      .update(userId)
      .digest("hex")
      .substr(0, 8); // 基于用户ID的哈希

    // 授权码的未加密部分
    const rawData = `${productType}-${region}-${timestamp}-${userSegment}-${randomSegment}`;
    console.log(rawData);
    // 加密生成的部分授权码
    const encryptedSegment = this.encryptData(rawData);

    // // 生成校验位
    const checksum = this.generateChecksum(encryptedSegment);

    // // 最终的复杂授权码
    return `${productType}-${region}-${encryptedSegment}-${checksum}`;
  }
}

let licenseService = new LicenseService();

console.log(
  licenseService.generateComplexLicense("manual", "202003021003", "中国")
);
