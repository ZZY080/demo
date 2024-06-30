import mongoose from "../dbs/mongodb.js";
import  {getCurrentDate}  from "../utils/utils.js"


const UserSchema = new mongoose.Schema({
    user_id:{
        type:String,
        unique:true,
        required:true,
    },
    user_name: {
        type:String,
    },
    user_password:{
        type:String,
    },
    user_email: {
        type: String,
        unique:true,
    },
    user_age: {
        type:Number,
    },
    user_create_at:{
        type:String,
        default:()=>{
            return getCurrentDate();
        },
    },
    user_update_at:{
        type:String,
        default:()=>{
            return getCurrentDate();
        },
    }
});

const UserModel = mongoose.model("User",UserSchema,"user");

export default UserModel