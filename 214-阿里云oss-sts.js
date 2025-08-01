const OSS = require("ali-oss");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: "./.development.env" });
// 初始化Oss
async function initOssClient() {
  try {
    const stsToken = await getStsToken();
    const client = new OSS({
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
      bucket: process.env.ALIYUN_OSS_BUCKET,
      cname: false, // 避免域名解析
      endpoint: process.env.ALIYUN_OSS_ENDPOINT,
      region: process.env.ALIYUN_OSS_REGION,
      refreshSTSToken: async () => {
        const newStsToken = await getStsToken();
        return {
          accessKeyId: newStsToken.credentials.AccessKeyId,
          accessKeySecret: newStsToken.credentials.AccessKeySecret,
          stsToken: newStsToken.credentials.SecurityToken,
        };
      },
      refreshSTSTokenInterval: 300, // 提前5分钟刷新
      stsToken: stsToken,
      secure: true,
    });
    return client;
  } catch (err) {
    console.log("初始化OSS客户端失败:", err);
    throw err;
  }
}
// 初始化Sts
async function initStsClient() {
  try {
    const client = new OSS.STS({
      accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID,
      accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET,
    });
    return client;
  } catch (err) {
    console.log("初始化Sts客户端失败:", err);
    throw err;
  }
}
// 获取sts临时凭证
async function getStsToken() {
  const stsClient = await initStsClient();
  // 设置BUCKET权限
  const policy = {
    Version: "1",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "oss:PutObject",
          "oss:GetObject", // 新增此行
        ],
        Resource: [`acs:oss:*:*:${process.env.ALIYUN_OSS_BUCKET}/images/*`],
      },
    ],
  };

  // 确保policyString是标准JSON字符串
  const policyString = JSON.stringify(policy);

  return stsClient.assumeRole(
    process.env.ALIYUN_OSS_ROLE_ARN,
    policyString, // 直接传递已序列化的JSON
    3600 // 有效期
    //   `user-${userId}`, // 会话名（非策略参数）
  );
}
async function generateSignedUrl(client, objectName, expires = 3600) {
  try {
    const url = client.signatureUrl(objectName, {
      expires: expires, // URL有效时间(秒)，默认1小时
      method: "GET",
    });
    console.log(`签名URL: ${url}`);
    return url;
  } catch (err) {
    console.error("生成签名URL失败:", err);
    throw err;
  }
}
async function uploadFile(client, filePath, objectName) {
  try {
    // 使用文件流上传
    const stream = fs.createReadStream(filePath);
    const result = await client.putStream(objectName, stream);
    const signedUrl = await generateSignedUrl(client, "file-in-OSS.png");
    console.log("upload result:", signedUrl, result);
    console.log(`文件 ${filePath} 已成功上传至 ${objectName}`);
    return result;
  } catch (err) {
    console.error(`上传失败: ${err.message}`);
    throw err;
  }
}

async function downloadFile(client, objectName, localSavePath) {
  try {
    // 正确下载文件的方法
    const result = await client.get(objectName);
    fs.writeFileSync(localSavePath, result.content);
    console.log(`文件 ${objectName} 下载成功，保存到 ${localSavePath}`);
    return result;
  } catch (err) {
    console.error(`下载失败: ${err.message}`);
    throw err;
  }
}

async function main() {
  try {
    const client = await initOssClient();
    if (!client) {
      console.error("无法初始化OSS客户端");
      return;
    }

    // 上传文件
    const localFilePath = path.join(__dirname, "bgc.png");
    const fileNameInOss = "file-in-OSS.png";
    await uploadFile(client, localFilePath, fileNameInOss);

    // 下载文件
    await downloadFile(
      client,
      "file-in-OSS.png",
      path.join(__dirname, "file-in-OSS2.png")
    );
  } catch (err) {
    console.error("主流程错误:", err);
  }
}

main();
