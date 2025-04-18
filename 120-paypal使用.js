const express = require("express");
const paypal = require("paypal-rest-sdk");

const app = express();
const IP = "192.168.2.18";
const PORT = process.env.PORT || 3000;

// 配置PayPal沙箱环境
paypal.configure({
  mode: "sandbox", // 沙箱环境
  client_id:
    "AZCBGYiWxFwE0uCumLynQ-b5gdcFVUp7XUAerUUGE8vnCEAEfX5lwwEvSxWk7K_bfcFi4t1hyfBC1lQw", // App id
  client_secret:
    "EB2U8jJU6ehgd8tny6usPqh-iX0xjajs5oP59AyKo6LZjz61JA8FoZSXBqa47zzsNhZMcCAvehn249dn", // App secret
});

// 处理支付请求
app.get("/pay", (req, res) => {
  // 创建支付请求的参数
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `http://${IP}:` + PORT + "/success",
      cancel_url: `http://${IP}:` + PORT + "/cancel",
    },
    transactions: [
      {
        // 商品列表
        item_list: {
          //
          items: [
            {
              // 商品名称
              name: "mate 60",
              // 商品库存单位
              sku: "个",
              price: "1.00",
              // 商品货币
              currency: "USD",
              // 商品数量
              quantity: 1,
            },
          ],
        },
        amount: {
          // 交易货币
          currency: "USD",
          // 交易总金额
          total: "1.00",
        },
        description: "This is the payment description.",
        // 自定义地址
        shipping_address: {
          recipient_name: "John Doe",
          line1: "123 Main St",
          city: "San Jose",
          state: "CA",
          postal_code: "95131",
          country_code: "US",
        },
        // 给商家的备注或说明
        note_to_payer: "Thank you for your purchase!",
      },
    ],
  };

  // 创建支付请求
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      // 找到支付链接并重定向用户进行支付
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

// 处理支付成功回调
app.get("/success", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "1.00",
        },
      },
    ],
  };

  // 执行支付
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.error(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        res.send("Payment successful");
      }
    }
  );
});

// 处理支付取消回调
app.get("/cancel", (req, res) => res.send("Payment cancelled"));

// 启动 Express 服务器
app.listen(PORT, IP, () =>
  console.log(`Server running on http://${IP}:${PORT}`)
);
