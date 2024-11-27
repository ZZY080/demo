const AlipaySdk = require('alipay-sdk').default; // 引入 SDK
const alipaySdk = new AlipaySdk({
  appId: '9021000135654977', // 沙箱环境应用ID
  privateKey:
    'MIIEpAIBAAKCAQEAlJVHn3ui7UD7+MZvo1bdYqFvvQiTuzWi0+hFMw2Oi5mQnSQaWGbscEDnLOG1eZgfoiJVhb67iWNaJsY4Dsuz6IpIsbiPXKvx08KHsW5KSp+ZP0zmbFQhfyaOJ6hnsOCeZZbgWrXwFkA3zq3LKg47lYVhTCSilcUCRN23PiHYKDW6QcJcG0nVqhDmpu5oL0hsQGqizD7XtC274iN5F6YgmYsB+ZKzMArQkmr+G2vzs1XhPqgNxSCU2cx0yzDEjfnEa5H4oO1xMmL+fysIHxuApUbMMWBAKmJabY7csPQfSzRc2jESRxzX+c5sWcCegRw2vfqGT2puyE13ZG/jJ0p7mQIDAQABAoIBADKNn/LZRBPpGlIIYg93DJf0SWpNssXtd9sVmgXGxQsmUpfEotoVGrkOvBj/KpmWcpzdha+dt30FOrUamBQgprOl6Rneq5hiQENGWpi557kAGEn7RiLxdPwoCBHiMHVz1zDFZsw2PtuzOcmuRAOpGAjFetdHV7IRd7YqoaAYL81uBU7ISePuUuTBXSUCoCYLMsoEq3psQoDmeiZrJgKYHsnp28K6SnIsJJ7ANhwneQxLbumjvqkB7XDwP6X67Re+rF3PhQI9OYdyVfu3wtz53djo+VHtCGXr154sO7j+QD5qe2JzqUGmX4WoaN+2z0zUhNkDjdfVQ9sOwug7FmoUu6kCgYEA0KUef0CMmfUF/swB6zY5Cvq//Rsyt9wEB9y6M1LSOEU7ANXwEQuZZINP3eXJniuZQ4beYRSkXvjIHxYi8lgob1MT7F8QLCfG5SdYBRjoOvwDKGV/nETRUI+IJ46/qoYhzt3F+rXLxm6SO0/6zP1p9lMnVx9YmLZJGHuDW12TTAsCgYEAtk5kKMNoW3lLFbSUk9XGg090WT1SyjT2fI7v2JykrrHxYg3GcK1y4e8iO+uKn7L9uLtFOmCeHqedwhV2rMZjI08kfOMfJkPa1j+UY3pVChEQjCKxD1LWqekA7CLBnEd8kjNDBvloBEts4yCxL+oEBZ4jxSJ8kNZPP87ubcgp+WsCgYBI8xKAp48BXVwlRCr/lEvJfPaXhmTrR+/Y1+H6g+CgcAQ7PJHdQ9L0A71u9iLSPKgvpf4mr1LxKca+p7y8QvqQQdnbcTl0VswB3wm1bonz5Z0tCJ/fgWg15JlUS2LUOmWjsILCL8H5tTtHpaUo+wmLaHN+0KTncASKnNTGoycXFQKBgQCl3b7dI6TQDRRWhDzmIIsDr4exJc0scnGMtFPeJe7jjryKtPPGUtkCXRstn0k5sZWMvL3otj1GsMQk8HhQDBPo7TnKcq5Fl1kEs0YkGApFJW+DwJCN25W5c2hGb/ztXlElh4RFVSfhOGqyX202pdjQ76el1ZG2CXaDHJfrxEEETwKBgQCdslrZhcyOZE3PRL7ZeAa39QqAX4Xt9jRYv8DYI10fyLdewJKbrfAUezB5SVhucSrv4adjU0dSDnwUqPprv67u/7iujZlKfQ2ZR+pmfsIkLT39Y6bDgelWv4i+XLdSe7SrO8iYwS+fxrMHqAOeQF2gQpfkbjKHSL8kubKP2p1KGQ==', // 沙箱环境应用私钥
  alipayPublicKey:
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqIrz8LPmeNUpFiycGmucYH1XLh+MdUkwey9FZrTU1aEJsCt3y4IrlQlbw15b6nI2oUthONv9gSwLvM5MsRRNTx+ktNAy6EeN1Wh2WeO2TzBbieCgs2Ytgdmytn8yXpyZxWRuu/w8FYLfchF+eC4hlUerwIYnNMOyLM1VrMP4Q09iafLR0xLSi9lLrbxnZcJbd02BhNX36AexrKZQvyMUNH5yWsKCiaqLr+MeG1mTaD8mHRLugYth1L2su7x69rLN7j/G3LSjE9OUf6bJNsPj0NghDLAAsgEWrBHYZecvNJ0y5OnTxPbmLJAM1jnyJM3Iulj9uznUBnUJtZYrLPJKGQIDAQAB', // 沙箱环境支付宝公钥
  signType: 'RSA2',
  gateway: 'https://openapi-sandbox.dl.alipaydev.com/gateway.do', // 沙箱环境网关地址
});

const express = require('express');
const app = express();
const router = express();
app.use(router);
const AlipayFormData = require('alipay-sdk/lib/form').default; // alipay.trade.page.pay 返回的内容为 Form 表单
const cors = require('cors');
router.use(express.json());
// 使用cors解决跨域问题
router.use(cors());
router.use(express.urlencoded({ extended: true }));

router.get('/api/pcpay', (req, res) => {
  // let orderId = req.body.orderId
  // * 添加购物车支付支付宝 */
  // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  const formData = new AlipayFormData();
  formData.setMethod('get');
  // 通过 addField 增加参数
  // 在用户支付完成之后，支付宝服务器会根据传入的 notify_url，以 POST 请求的形式将支付结果作为参数通知到商户系统。
  formData.addField('notifyUrl', 'https://www.xuexiluxian.cn'); // 支付成功回调地址，必须为可以直接访问的地址，不能带参数
  formData.addField('bizContent', {
    outTradeNo: 'nqpnmv9522@sandbox.com', // 商户订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
    productCode: 'FAST_INSTANT_TRADE_PAY', // 销售产品码，与支付宝签约的产品码名称,仅支持FAST_INSTANT_TRADE_PAY
    totalAmount: '0.01', // 订单总金额，单位为元，精确到小数点后两位
    subject: '商品', // 订单标题
    body: '商品详情', // 订单描述
  });
  formData.addField('returnUrl', 'https://opendocs.alipay.com'); //加在这里才有效果,不是加在bizContent 里面
  // 如果需要支付后跳转到商户界面，可以增加属性"returnUrl"
  const result = alipaySdk.exec(
    // result 为可以跳转到支付链接的 url
    'alipay.trade.page.pay', // 统一收单下单并支付页面接口
    {}, // api 请求的参数（包含“公共请求参数”和“业务参数”）
    { formData: formData }
  );
  result.then((resp) => {
    res.send({
      success: true,
      message: 'success',
      code: 200,
      timestamp: new Date().getTime(),
      result: resp,
      formData: formData,
    });
  });
});

app.listen(4000, '192.168.0.106', () => {
  console.log('http://192.168.0.106:4000');
});
