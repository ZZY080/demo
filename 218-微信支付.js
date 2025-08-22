const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const { parseString, Builder } = require("xml2js");

require("dotenv").config({ path: "./.development.env" });

const app = express();
const PORT = 8080;

// 中间件
app.use(express.json());
app.use(express.text({ type: "application/xml" }));

// 微信支付配置(替换为你的实际信息)
const config = {
  appId: process.env.WECHAT_APPID, // 小程序appId
  appSecrect: process.env.WECHAT_APPSECRECT, // 小程序的appSecrect
  mchId: process.env.WECHAT_MCHID, // 商户号Id
  apiKey: process.env.WECHAT_API_KEY, // 商户号上的apiKey
  notifyUrl: process.env.WECHAT_NOTIFY_URL,
};

app.post("/api/getOpenid", async (req, res) => {
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
    console.log("openid:", response.data.openid);
    res.json({
      code: 0,
      openid: response.data.openid,
    });
  } catch (error) {
    res.json({ code: 500, message: error.message });
  }
});

// 生成签名
function generateSign(params) {
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
}

// 小程序支付接口
app.post("/pay/wxpay", async (req, res) => {
  try {
    const { total, openid, desc = "小程序支付" } = req.body;

    if (!total || !openid) {
      return res.json({ code: 400, message: "缺少必要参数" });
    }

    // 构建微信支付参数
    const params = {
      appid: config.appId,
      mch_id: config.mchId,
      nonce_str: uuidv4().replace(/-/g, ""),
      body: desc,
      out_trade_no:
        "MINI_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5),
      total_fee: Math.round(total * 100), // 转换为分
      spbill_create_ip: req.ip.replace("::ffff:", "") || "127.0.0.1",
      notify_url: config.notifyUrl,
      trade_type: "JSAPI",
      openid: openid,
    };

    // 生成签名
    params.sign = generateSign(params);

    // 转换为XML
    const xml = new Builder().buildObject({ xml: params });

    // 调用微信统一下单接口
    const response = await axios.post(
      "https://api.mch.weixin.qq.com/pay/unifiedorder",
      xml,
      {
        headers: { "Content-Type": "application/xml" },
      }
    );

    // 解析XML响应
    const result = await new Promise((resolve, reject) => {
      parseString(response.data, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });

    if (result.xml.return_code[0] !== "SUCCESS") {
      throw new Error(result.xml.return_msg[0]);
    }

    if (result.xml.result_code[0] !== "SUCCESS") {
      throw new Error(result.xml.err_code_des[0]);
    }

    const prepay_id = result.xml.prepay_id[0];

    // 生成小程序支付参数
    const payParams = {
      timeStamp: Math.floor(Date.now() / 1000).toString(),
      nonceStr: uuidv4().replace(/-/g, ""),
      package: `prepay_id=${prepay_id}`,
      signType: "MD5",
    };

    // 生成paySign（注意这里的参数名和顺序）
    const signData = {
      appId: config.appId,
      timeStamp: payParams.timeStamp,
      nonceStr: payParams.nonceStr,
      package: payParams.package,
      signType: payParams.signType,
    };

    payParams.paySign = generateSign(signData);

    res.json({
      code: 0,
      data: payParams,
      message: "获取支付参数成功",
    });
  } catch (error) {
    console.error("支付参数生成失败:", error.message);
    res.json({
      code: 500,
      message: error.message || "支付参数生成失败",
    });
  }
});

// 支付回调接口
app.post("/pay/notify", (req, res) => {
  let xmlData = "";
  req.on("data", (chunk) => {
    xmlData += chunk;
  });

  req.on("end", () => {
    parseString(xmlData, (err, result) => {
      if (err) {
        return res.send(
          "<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[解析失败]]></return_msg></xml>"
        );
      }

      const data = result.xml;
      console.log("支付回调收到:", data);

      // 验证签名
      const sign = data.sign[0];
      const verifyData = {};
      Object.keys(data).forEach((key) => {
        if (key !== "sign") {
          verifyData[key] = data[key][0];
        }
      });

      if (generateSign(verifyData) !== sign) {
        return res.send(
          "<xml><return_code><![CDATA[FAIL]]></return_code><return_msg><![CDATA[签名验证失败]]></return_msg></xml>"
        );
      }

      if (
        data.return_code[0] === "SUCCESS" &&
        data.result_code[0] === "SUCCESS"
      ) {
        console.log("支付成功:", {
          orderId: data.out_trade_no[0],
          transactionId: data.transaction_id[0],
          amount: data.total_fee[0] / 100,
        });
        // TODO: 更新订单状态
      }

      res.send(
        "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>"
      );
    });
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

app.listen(PORT, "192.168.2.6", () => {
  console.log(`微信支付服务运行在 http://192.168.2.6:${PORT}`);
});
