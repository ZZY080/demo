// 引入 mongoose
import mongoose from 'mongoose';
// 导入配置参数
import {MONGODB_PROTOCOL,MONGODB_DOMAIN,MONGODB_PORT,MONGODB_DATABASE_NAME} from "../config/config.js"



// 连接数据库，自动创建 globalpeople数据库
mongoose.connect(`${MONGODB_PROTOCOL}://${MONGODB_DOMAIN}:${MONGODB_PORT}/${MONGODB_DATABASE_NAME}`,{
    useNewUrlParser: true, // 避免“不建议使用当前URL字符串解析器”
    useUnifiedTopology: true, // 解决连接报错问题
});

export default mongoose;

