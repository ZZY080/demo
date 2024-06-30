import mongoose from "../dbs/mongodb.js";

import { getCurrentDate } from "../utils/utils.js";
const AddressSchema = new mongoose.Schema({
    address_id: {
        type: String,
        unique:true,
        required:true,
        default: ()=> {
            return new mongoose.Types.ObjectId().toString();
        },
    },
    user_id: {
        type: String,
        required:true,
    },
    address_province: {
        type: String,
    },
    address_city: {
        type: String,
    },
    address_county: {
        type: String,
    },
    address_create_at:{
        type:String,
        default:()=>{
            return getCurrentDate();
        },
    },
    address_update_at:{
        type:String,
        default:()=>{
            console.log(getCurrentDate());
            return getCurrentDate();
        },
    }
});

const AddressModel = mongoose.model("Address", AddressSchema, "address");

export default AddressModel;