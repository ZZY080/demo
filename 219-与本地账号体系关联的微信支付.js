const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const { parseString, Builder } = require("xml2js");

require("dotenv").config({ path: "./.development.env" });

const app = express();
const cors = require("cors");

const PORT = 8080;

// 中间件
app.use(express.json());
app.use(express.text({ type: "application/xml" }));

app.use(
  cors({
    origin: "http://192.168.2.8:5173", // 允许前端地址访问
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// 微信支付配置(替换为你的实际信息)
const config = {
  appId: process.env.WECHAT_APPID, // 小程序appId
  appSecrect: process.env.WECHAT_APPSECRECT, // 小程序的appSecrect
  mchId: process.env.WECHAT_MCHID, // 商户号Id
  apiKey: process.env.WECHAT_API_KEY, // 商户号上的apiKey
  notifyUrl: process.env.WECHAT_NOTIFY_URL,
};

// 生成签名
const generateSign = (params) => {
  const sorted = Object.keys(params)
    .filter((key) => params[key] && key !== "sign")
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return crypto
    .createHash("md5")
    .update(sorted + "&key=" + config.apiKey)
    .digest("hex")
    .toUpperCase();
};

// 微信登录获取 openId
app.post("/api/login", async (req, res) => {
  try {
    const { code } = req.body;
    const appId = config.appId;
    const appSecret = config.appSecrect; // 需要配置
    const response = await axios.get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
    );

    if (response.data.errcode) {
      throw new Error(response.data.errmsg);
    }
    res.json({
      code: 0,
      openid: response.data.openid,
    });
  } catch (error) {
    res.json({ code: 500, message: error.message });
  }
});

// === 统一下单 ===
app.post("/pay/unified", async (req, res) => {
  try {
    const { total, desc = "订单支付", tradeType = "JSAPI", openid } = req.body;

    if (!total) return res.json({ code: 400, message: "缺少金额 total" });

    const orderNo =
      "MINI_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);

    const params = {
      appid: config.appId, // 微信小程序appid
      mch_id: config.mchId, // 微信支付商户号id
      nonce_str: uuidv4().replace(/-/g, ""), //随机字符串  防止重放攻击，确保每次请求唯一
      body: desc, //  商品描述
      out_trade_no: orderNo, // 商户订单号
      total_fee: Math.round(total * 100), //订单金额 转换为分
      spbill_create_ip: req.ip.replace("::ffff:", "") || "127.0.0.1", // 终端IP
      notify_url: config.notifyUrl, // 通知地址
      trade_type: tradeType,
      attach: JSON.stringify({
        user_id: "1", // 前端传来的 user_id
        resource_id: "2", // 前端传来的商品/资源id
        resource_type: "course",
      }),
    };

    if (tradeType === "JSAPI") {
      if (!openid) return res.json({ code: 400, message: "JSAPI 需要 openid" });
      params.openid = openid;
    }

    params.sign = generateSign(params);

    const xml = new Builder().buildObject({ xml: params });
    const response = await axios.post(
      "https://api.mch.weixin.qq.com/pay/unifiedorder",
      xml,
      {
        headers: { "Content-Type": "application/xml" },
      }
    );

    const result = await new Promise((resolve, reject) => {
      parseString(response.data, (err, r) => (err ? reject(err) : resolve(r)));
    });

    const r = result.xml;
    if (r.return_code[0] !== "SUCCESS") throw new Error(r.return_msg[0]);
    if (r.result_code[0] !== "SUCCESS") throw new Error(r.err_code_des[0]);

    // === 返回不同支付场景 === 小程序
    if (tradeType === "JSAPI") {
      const prepay_id = r.prepay_id[0];
      const payParams = {
        appId: config.appId,
        timeStamp: Math.floor(Date.now() / 1000).toString(),
        nonceStr: uuidv4().replace(/-/g, ""),
        package: `prepay_id=${prepay_id}`,
        signType: "MD5",
      };
      payParams.paySign = generateSign(payParams);
      return res.json({ code: 0, data: { orderNo, payParams } });
    }
    //  PC H5 网页支付
    if (tradeType === "MWEB") {
      return res.json({ code: 0, data: { orderNo, mwebUrl: r.mweb_url[0] } });
    }
    // 扫码支付
    if (tradeType === "NATIVE") {
      return res.json({ code: 0, data: { orderNo, codeUrl: r.code_url[0] } });
    }

    res.json({ code: 400, message: "未知 tradeType" });
  } catch (err) {
    console.error("下单失败:", err.message);
    res.json({ code: 500, message: err.message });
  }
});

// === 支付回调 ===
app.post("/pay/notify", (req, res) => {
  parseString(req.body, (err, data) => {
    if (err) return res.send("<xml><return_code>FAIL</return_code></xml>");

    const r = data.xml;
    if (r.return_code[0] === "SUCCESS" && r.result_code[0] === "SUCCESS") {
      const orderId = r.out_trade_no[0];
      const amount = r.total_fee[0] / 100;
      const wxOrderId = r.transaction_id[0];

      // 解析 attach
      const attach = r.attach ? JSON.parse(r.attach[0]) : {};
      const userId = attach.user_id;
      const resourceId = attach.resource_id;
      const resourceType = attach.resource_type;

      console.log("支付成功 ✅", { orderId, amount, wxOrderId });

      // TODO: 这里你可以查数据库修改订单状态（演示版没有）
      res.send("<xml><return_code>SUCCESS</return_code></xml>");
    } else {
      res.send("<xml><return_code>FAIL</return_code></xml>");
    }
  });
});
// 查询订单状态
app.get("/pay/query/:orderId", async (req, res) => {
  try {
    const params = {
      appid: config.appId,
      mch_id: config.mchId,
      out_trade_no: req.params.orderId,
      nonce_str: uuidv4().replace(/-/g, ""),
    };
    params.sign = generateSign(params);

    const xml = new Builder().buildObject({ xml: params });
    const response = await axios.post(
      "https://api.mch.weixin.qq.com/pay/orderquery",
      xml,
      {
        headers: { "Content-Type": "application/xml" },
      }
    );

    const result = await new Promise((resolve, reject) => {
      parseString(response.data, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });

    res.json({ code: 0, data: result.xml });
  } catch (error) {
    res.json({ code: 500, message: error.message });
  }
});

app.listen(PORT, "192.168.2.8", () => {
  console.log(`微信支付服务运行在 http://192.168.2.8:${PORT}`);
});
