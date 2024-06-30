import  mongoose from "../dbs/mongodb.js";

const GoodSchema = new mongoose.Schema({
    good_id:{
        type:String,
        unique:true,
        required:true,
        default:()=>{
            return new mongoose.Types.ObjectId().toString();
        }
    },
    good_name:{
        type:String,
    },
    good_desc:{
        type:String,
    },
    good_cate:{
        type:String,
    },
    good_nurtri_info:{
        type:String,
    },
    good_calories:{
        type:String,
    },
    good_price:{
        type:String,
    },
    good_img:{
        type:String
    },
    good_expiry_date:{
        type:String,
    }
});

const GoodModel = mongoose.model("Good", GoodSchema, "good");

export default GoodModel;