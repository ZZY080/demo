const Core = require("@alicloud/pop-core");

// 创建客户端实例
var client = new Core({
  accessKeyId: "LTAI5tFCm7zK19ewgEvVaAET", // 替换为您的AccessKeyId
  accessKeySecret: "J7x8QzG228LxJevvQ2F7e85EbO6MKm", // 替换为您的AccessKeySecret
  endpoint: "https://dm.aliyuncs.com", // 邮件推送服务的Endpoint
  apiVersion: "2015-11-23", // 推荐使用此版本
});

var params = {
  AccountName: "auth@service.leadvisor.com", // 发件人邮箱地址
  ReplyToAddress: "true", // 是否允许收件人回复到发件人邮箱
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
