const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        about: {
            type:String,
        },
        contactNumber: {
            type:String,
            trim:true,
        },
    }
);

module.exports = mongoose.model("Profile", profileSchema);