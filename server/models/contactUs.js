const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required: true,
        },
        lastName:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        contactNumber:{
            type:String,
            trim:true,
        },
        city:{
            type:String,
        },
        state:{
            type:String,
        },
        pincode:{
            type:String,
        },
        inquiry:{
            type:String
        },
        createdAt:{
            type:Date,
            default:Date.now(),
        },
    }
)

module.exports = mongoose.model("contactUs", contactUsSchema);