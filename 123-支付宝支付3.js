const express = require('express');
const cors = require("cors");
const axios = require("axios");
const AlipaySdk = require('alipay-sdk').default;
const app = express();
// 本地局域网ip
let IP = "192.168.31.34";
const PORT = 4000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// alipay.trade.page.pay 返回的内容为 Form 表单
const AlipayFormData = require('alipay-sdk/lib/form').default;
// 创建 AlipaySdk 实例
const alipaySdk = new AlipaySdk({
    appId: '9021000135654977', // 沙箱环境应用ID
    privateKey: 'MIIEogIBAAKCAQEAtDOne8dnmWcwtDw9vSYRZdDYtghXmeybC4wsfQWlnJxb/SX6xz+SWIbnl9ftPPyBTEi5V7+cNiK9CbSevIPwCQrol0QG/FSKMiurIlyACV0ofxL15Qy27kIf3TAjVAaegiuwT3kL8jQCKoMCUR+Ja9Z5NEOEchqIUzRIJckhhSlkSSNn9GNc6z700MHISrpYvuj3OIfWJrZJcebfpY2f32YH1xa58ihNFD49FmTfYlTuScSD6EX6WTwgKs2Im+VlYEFAZ7ADZtkcqoCWOIcons7nV+CKMQsUBWRwKUylz2IOJC4CIUHBkzWEmeTZJnmBW8drXWZipVUsCagprJYf7wIDAQABAoIBAHCnlj34tFifvUAAJSy5vsijHsf2QSW2WFuIv0tNm3JkAdIpyzSDFq+HbwNrdyHYTdDt6gjkffkOEJYft9jstsRAcJYYbjGTfG3PBQbPQzAXcDi5FsaiAz7CUf9Kl9tw4+lG/MtCRmidgPkou+sRRy0GgPFegE+BLNavaadNrUn8P9I4S7XWf34RRnouWrKxrW8i9AaQCxuNyCS/BpjqXuOxRJQAVymdn5EEAaIN7YZTNJvfQ+eAatxaA4Cpc1egAO2iQVW5y61BIDIuh5S+9df56AA/7lCrmf6XSQDguEIvu1spKEfz5qK3PWC0Ju22FV+0j3WGo1pwyF2Bze07V3kCgYEA6x9Sp2hDTmU+3+uatar6W9V3Kv/+oSys8UkxnQNHJjeWGF9KipQ0WTDs9O0X/T//ivVRHCzZDRMdDZpZ6kD7dVAQLJTTwrvt8oc9QNTc2AxcOSi9LvT3Z4TXg2lBkUulyiXgIV8gF/KJW8NAT3q9t42sKP5wX/MoGfgW4CNOxrMCgYEAxDPn3xHQIePDm2GTlo6aKoHOs/lgo35Ibef31xtcmgviZ12GHx8j0E5XaE1ktF6s3wVsPWHo913MC7SkZ8tYDgHpw/n69FAWhm+gH2O8pMTC0k+a1VEfKQx623D49YrQmCCxF6FiBdyLcVaMfxytmqTi/5NqP7KoBSBky+aof9UCgYBFEpWgkpO7UykOdVOk7Q7RrbttiXkPdmV0GPGXU+AyDQBuNohaf8GFNkdWiNSUVJnJA9qJMW+uVKAjX+XsWJzG0Pd/cVVojvcPWcWX5zDd03vAWwSA5/xKkA8UDvbxLU0OPuRCSYTPJDRQHeMltkRHyTn7bQwsU+3C+0wVGqpI2wKBgCivcsepE/XTGz7fTxGLZKCn5ksfzVBZ4X8Y+SXcAKnZCQvSMvvFI1IQzMNOOTHF6CcfIsDfysVw590NioITgqD0+Jqw/b8n1GPwRc38iqPIQXYHF95gQgvrEJbsqFOSg4roTJDP4FnC0A+imOPK+Jz20DObSA8JZxoZC43UuOA5AoGAYtMHWjzrUD4IVrr0UJry6vSagUuASZMyYprEqdbCPNINpGRltZdnh9dYVYQtKA+I4+mGfffZ2VdjZMfoL+6pRr3iVjzjHs1lLfvHMYxS2xZ1pCp5wwRHnNVbiz0lMLKcGvMxZmM+HYKbYClzjkAcD4SO3zrsAxvXAJsAABhKELo=', // 沙箱环境应用私钥
    alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqIrz8LPmeNUpFiycGmucYH1XLh+MdUkwey9FZrTU1aEJsCt3y4IrlQlbw15b6nI2oUthONv9gSwLvM5MsRRNTx+ktNAy6EeN1Wh2WeO2TzBbieCgs2Ytgdmytn8yXpyZxWRuu/w8FYLfchF+eC4hlUerwIYnNMOyLM1VrMP4Q09iafLR0xLSi9lLrbxnZcJbd02BhNX36AexrKZQvyMUNH5yWsKCiaqLr+MeG1mTaD8mHRLugYth1L2su7x69rLN7j/G3LSjE9OUf6bJNsPj0NghDLAAsgEWrBHYZecvNJ0y5OnTxPbmLJAM1jnyJM3Iulj9uznUBnUJtZYrLPJKGQIDAQAB', // 沙箱环境支付宝公钥
    // signType: 'RSA2',
    gateway: 'https://openapi-sandbox.dl.alipaydev.com/gateway.do', // 沙箱环境网关地址
});
// 处理支付请求
app.get('/pay', async (req, res) => {
    try {
        const formData = new AlipayFormData();
        formData.setMethod('get');
        // 在用户支付完成之后，支付宝服务器会根据传入的 notify_url，以 POST 请求的形式将支付结果作为参数通知到商户系统。
        formData.addField('notifyUrl', 'https://www.xuexiluxian.cn'); // 支付成功回调地址，必须为可以直接访问的地址，不能带参数
        formData.addField('bizContent', {
            // 消费者订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
            outTradeNo: "29163636569@qq.com",
            // 销售产品码，与支付宝签约的产品码名称,仅支持FAST_INSTANT_TRADE_PAY
            productCode: 'FAST_INSTANT_TRADE_PAY',
            subject: '商品', // 订单标题
            body: '商品详情', // 订单描述
            // 订单总金额，单位为元，精确到小数点后两位
            totalAmount: '10',
            qrPayMode: "1",
            qrCodeWidth: 100,
        });
        formData.addField('returnUrl', 'https://opendocs.alipay.com');//加在这里才有效果,不是加在bizContent 里面
        const result = await alipaySdk.exec('alipay.trade.page.pay', {}, { formData: formData });
        res.redirect(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('支付请求失败');
    }
});

//支付交易查询
app.get('/api/paymentQuery', function (req, res, next) {
    // 消费者订单号
    let out_trade_no = "2916363653@qq.com";
    // 支付宝订单号设置为空就好
    let trade_no = "";
    // 支付宝配置
    const formData = new AlipayFormData();
    //调用setMethod 并传入get,会返回可以跳转到支付页面的url,
    formData.setMethod("get");
    // 支付时信息
    const bizContent = {
        out_trade_no,
        trade_no
    };
    formData.addField("bizContent", bizContent);

    // 返回promise
    const result = alipaySdk.exec(
        "alipay.trade.query",
        {},
        { formData: formData }
    ).catch(error => console.error('caught error!', error));
    //对接支付宝API
    result.then(resData => {
        axios({
            method: "GET",
            url: resData
        }).then(resdata => {
            let respondeCode = resdata.data.alipay_trade_query_response;
            if (respondeCode.code == 10000) {
                switch (respondeCode.trade_status) {
                    case 'WAIT_BUYER_PAY':
                        res.send({
                            code: 10001,
                            message: "支付宝有交易记录，没付款"
                        })
                        break;
                    case 'TRADE_FINISHED':
                        // 完成交易的逻辑
                        res.send({
                            code: 10002,
                            message: "交易完成(交易结束，不可退款)"
                        })
                        break;
                    case 'TRADE_SUCCESS':
                        // 完成交易的逻辑
                        res.send({
                            code: 10002,
                            message: "交易完成"
                        })
                        break;
                    case 'TRADE_CLOSED':
                        // 交易关闭的逻辑
                        res.send({
                            code: 10003,
                            message: "交易关闭"
                        })
                        break;
                }
            } else if (respondeCode.code == 40004) {
                return res.send({
                    code: 40004,
                    message: "交易不存在"
                })
            }
        }).catch(err => {
            return res.send({
                code: 50000,
                msg: "交易失败",
                data: err
            })
        })
    })
})

// 处理支付成功回调
app.get('/success', (req, res) => {
    res.send('支付成功');
});

// 启动 Express 服务器
app.listen(PORT, IP, () => {
    console.log(`Server running on http://${IP}:${PORT}`)
});
