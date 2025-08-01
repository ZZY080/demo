const Core = require("@alicloud/pop-core");
const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: "./.development.env" });
// 创建客户端实例
var client = new Core({
  accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID, // 替换为您的AccessKeyId
  accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET, // 替换为您的AccessKeySecret
  endpoint: process.env.ALIYUN_MAIL_ENDPOINT, // 邮件推送服务的Endpoint
  apiVersion: "2015-11-23", // 推荐使用此版本
});

// 读取附件并转换为Base64
function getAttachment(filePath) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    return {
      FileName: path.basename(filePath),
      Content: fileBuffer.toString("base64"), // 关键修正：必须Base64编码
    };
  } catch (e) {
    console.error(`读取附件失败: ${filePath}`, e);
    return null;
  }
}

// 准备参数
const params = {
  AccountName: "auth@service.leadvisor.com",
  AddressType: 1, // 注意：必须是数字，不是字符串
  ReplyToAddress: true, // 注意：必须是布尔值，不是字符串
  ToAddress: "2916363651@qq.com",
  Subject: "测试邮件主题（带附件）",
  HtmlBody: "这是一封带附件的测试邮件内容，请查收附件",
  Attachments: [
    getAttachment("./test1.txt"),
    getAttachment("./test2.txt"),
  ].filter(Boolean), // 过滤掉读取失败的文件
};

// 调试输出附件信息
console.log("附件1信息:", {
  name: params.Attachments[0]?.FileName,
  size: params.Attachments[0]?.Content?.length,
});
console.log("附件2信息:", {
  name: params.Attachments[1]?.FileName,
  size: params.Attachments[1]?.Content?.length,
});

const requestOption = {
  method: "POST",
  headers: {
    "x-acs-content-type": "application/json",
  },
};

// 发送请求
client
  .request("SingleSendMail", params, requestOption)
  .then((result) => {
    console.log("\n=== 邮件发送成功 ===");
    console.log("RequestId:", result.RequestId);
    console.log("附件数量:", params.Attachments.length);
  })
  .catch((ex) => {
    console.error("\n=== 邮件发送失败 ===");
    console.error("错误代码:", ex.code);
    console.error("错误信息:", ex.message);

    // 特定错误处理
    if (ex.code === "InvalidAttachment.Malformed") {
      console.error("\n附件格式错误，请确认：");
      console.error("1. 每个附件必须小于4MB");
      console.error("2. 必须使用Base64编码");
      console.error("3. 文件名不能包含特殊字符");
    }
  });
