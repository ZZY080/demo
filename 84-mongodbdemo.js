import UserModel from "./models/UserModel.js";
import GoodModel from "./models/GoodModel.js"
// import AddressModel from "./models/AddressModel.js";
import mongoose from "./dbs/mongodb.js";


async function run() {
    try {
        // 模拟注册用户
        // const new_user = await UserModel.create({
        //     user_id: "202003021002",
        //     user_name: `曾志远`,
        //     user_password: `ZZY806@!.`,
        //     user_email: `2916363651@qq.com`,
        //     user_age: 18,
        // });
        // 根据user_id 查找用户并返回 user_id
        // const { user_id } = new_user;
        // await AddressModel.create({
        //     user_id: user_id,
        //     address_province: "江苏省",
        //     address_city: "南京市",
        //     address_county: "江宁区",
        // });
        // await AddressModel.updateOne({ user_id: "202003021003" }, { address_city: "南京" });
        await GoodModel.create({
            good_name:"pear",
            good_desc:"几哈好久好久合计合计",
            good_cate:"食品",         
        })
    } catch (error) {
        // 检查错误类型
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            // 错误码 11000 表示违反唯一性约束，而且是 email 字段的唯一性冲突
            console.error('User already exists. Insert failed.');
        } else {
            // 其他类型的错误
            console.error('Error:', error);
        }
    } finally {
        // 关闭数据库连接
        mongoose.connection.close();
    }
}

// 调用 run 函数
run();
