import mongoose from "../dbs/mongodb.js";

const OrderSchema = new mongoose.Schema({
    order_id: {
        type: String,
        unique:true,
        required:true,
        default:()=>{
            return new mongoose.Types.ObjectId().toString();
        }
    },
    user_id: {
        type: String,
    },
    good_id: {
        type: String,
    },
    address_id: {
        type: String,
    },
    order_create_at: {
        type: String,
    },
    order_update_at: {
        type: String,
    },
    order_total_amount: {
        type: String,
    },
    order_status: {
        type: String,
        // 0 待处理 1 处理中  2 已发货  3  配送中 4 已送达 5 已完成 6 已取消
        enum:["0","1","2","3","4","5","6"]
    },
    order_pay_method: {
        type: String,
        // 0 微信支付  1 支付宝支付 2 现金支付
        enum:["0","1","2"]
    },
    order_shipping_method: {
        type: String,
        // 0 外卖 1 自取
        enum:["0","1"]
    },
    order_address: {
        type: String,
    }
})

const OrderModel = mongoose.model("Order", OrderSchema, "order");

export default OrderModel;