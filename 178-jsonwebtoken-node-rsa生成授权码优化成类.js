/**
 * 需求分析
    1. 功能模块:
        密钥生成和管理模块
        授权码生成模块
        授权码验证模块
    2. 授权码生成:
        使用 RSA 加密生成授权码。
        授权码包含用户信息、产品信息、有效期等。
        授权码签名以确保不被篡改。
    3. 授权码验证:
        使用公钥验证授权码的合法性。
        解密授权码，获取其中的用户信息、产品信息和有效期。
       
 */
const nodeRsa = require("node-rsa");
const jwt = require("jsonwebtoken");
const fs = require("fs");

class License {
  constructor() {
    this.privateKey = fs.readFileSync("private.key", "utf8");
    this.publicKey = fs.readFileSync("public.key", "utf8");
    // 创建RSA加密器 公钥用于加密数据
    this.publicKeyRsa = new nodeRsa(this.publicKey);
    // 创建RSA解密器 私钥用于解密数据
    this.privateKeyRsa = new nodeRsa(this.privateKey);
  }

  /**
   * 生成授权码
   * @param {*} params
   * @returns {string}
   */
  generateLicense(params) {
    // 要加密的授权数据
    const currentTimestamp = Date.now();
    const payload = {
      user: params.user, // 用户信息
      product: params.product, // 产品信息
      expiry: currentTimestamp + params.expiry * 1000, // 过期时间(单位为毫秒)
      created_time: currentTimestamp, // 创建时间 时间戳(单位为毫秒)
    };
    // 使用 RSA 私钥加密数据
    const encryptedData = this.publicKeyRsa.encrypt(
      JSON.stringify(payload),
      "base64"
    );

    // 使用JWT对加密数据进行签名 无需指定token过期时间 此token永久有效
    const license = jwt.sign(
      {
        data: encryptedData,
      },
      this.privateKey,
      {
        algorithm: "RS256",
      }
    );
    return license;
  }

  /**
   * 更新授权码的有效期
   * @param {string} license 为授权码内容
   * @param {number} delayTime 为延长的时间(单位为秒)
   */
  updataLicenseExpired(license, delayTime) {
    // 验证JWT签名
    const decoded = jwt.verify(license, this.publicKey, {
      algorithms: ["RS256"],
    });
    // 使用RSA私钥解密数据
    const decryptedData = this.privateKeyRsa.decrypt(decoded.data, "utf8");

    // 将解密后的JSON数据转换为对象
    const payload = JSON.parse(decryptedData);
    payload.expiry = payload.expiry + delayTime * 1000;

    // 使用 RSA 私钥加密数据
    const encryptedData = this.publicKeyRsa.encrypt(
      JSON.stringify(payload),
      "base64"
    );

    // 使用JWT对加密数据进行签名 无需指定token过期时间 此token永久有效
    const token = jwt.sign(
      {
        data: encryptedData,
      },
      this.privateKey,
      {
        algorithm: "RS256",
      }
    );
    return token;
  }
  /**
   *  验证授权码
   * @param {string} license
   * @returns {boolean}
   */
  validateLicense(license) {
    try {
      // 验证JWT签名
      const decoded = jwt.verify(license, this.publicKey, {
        algorithms: ["RS256"],
      });

      // 使用RSA私钥解密数据
      const decryptedData = this.privateKeyRsa.decrypt(decoded.data, "utf8");

      // 将解密后的JSON数据转换为对象
      const licenseData = JSON.parse(decryptedData);

      // 检查授权码是否过期
      if (licenseData.expiry < Date.now()) {
        throw new Error("License has expired!");
      }

      return {
        status: 200,
        message: "license has been pass check ",
      };
    } catch (err) {
      if (err.message == "invalid signature") {
        return {
          status: 400,
          message: "License is invalid,please checkout your license!",
        };
      } else {
        return {
          status: 400,
          message: err.message,
        };
      }
    }
  }
}

// 创建一个license对象
const licenseObj = new License();

// 生成license内容
const licenseContent = licenseObj.generateLicense({
  // 国家
  country: "中国",
  // 用户
  user: {
    id: "202003021003",
    age: 12,
  },
  // 产品
  product: {
    id: "20202",
  },
  expiry: 3, // 单位为秒
});
const licenseContent2 = licenseObj.updataLicenseExpired(licenseContent, 6);
console.log(licenseContent);
setTimeout(() => {
  const isValid1 = licenseObj.validateLicense(licenseContent);
  const isValid2 = licenseObj.validateLicense(licenseContent2);
  console.log(isValid1);
  console.log(isValid2);
}, 7000);
