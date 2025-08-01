const Core = require("@alicloud/pop-core");

// 创建客户端实例
const client = new Core({
  accessKeyId: "LTAI5tFCm7zK19ewgEvVaAET", // 替换为您的AccessKeyId
  accessKeySecret: "J7x8QzG228LxJevvQ2F7e85EbO6MKm", // 替换为您的AccessKeySecret
  endpoint: "https://dm.aliyuncs.com",
  apiVersion: "2015-11-23",
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
