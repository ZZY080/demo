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
  AccountName: "auth@service.leadvisor.com", // 发件人邮箱地址
  AddressType: "1", // 地址类型，1表示随机地址
  TemplateName: "test1", // 邮件模板名称
  ReceiversName: "test2", // 收件人列表名称
  //   TagName: "your-tag-name", // 标签名（可选）
};

var requestOption = {
  method: "POST",
};

client.request("BatchSendMail", params, requestOption).then(
  (result) => {
    console.log(JSON.stringify(result));
  },
  (ex) => {
    console.log(ex);
  }
);
