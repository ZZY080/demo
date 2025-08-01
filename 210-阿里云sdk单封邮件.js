const Core = require("@alicloud/pop-core");
require("dotenv").config({ path: "./.development.env" });
// 创建客户端实例
var client = new Core({
  accessKeyId: process.env.ALIYUN_ACCESS_KEY_ID, // 替换为您的AccessKeyId
  accessKeySecret: process.env.ALIYUN_ACCESS_KEY_SECRET, // 替换为您的AccessKeySecret
  endpoint: process.env.ALIYUN_MAIL_ENDPOINT, // 邮件推送服务的Endpoint
  apiVersion: "2015-11-23", // 推荐使用此版本
});

var params = {
  AccountName: process.env.ALIYUN_MAIL_ACCOUNT_NAME, // 发件人邮箱地址
  ReplyToAddress: process.env.ALIYUN_MAIL_REPLY_TO_ADDRESS, // 是否允许收件人回复到发件人邮箱
  AddressType: "1", // 地址类型，1表示随机地址
  ToAddress: "zengzhiyuan@neptia.cn", // 收件人邮箱地址
  Subject: "测试邮件主题", // 邮件主题
  HtmlBody: "这是一封测试邮件的内容", // 邮件正文（HTML格式）
};

var requestOption = {
  method: "POST",
};

client.request("SingleSendMail", params, requestOption).then(
  (result) => {
    console.log(JSON.stringify(result));
  },
  (ex) => {
    console.log(ex);
  }
);
