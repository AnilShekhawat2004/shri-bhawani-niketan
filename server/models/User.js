const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
            trim: true,
        },
        lastName:{
            type: String,
            required: true,
            trim: true,
        },
        email:{
            type: String,
            required: true,
            trim: true,
        },
        password:{
            type:String,
            required: true,
        },
        accountType:{
            type:String,
            enum: ["Admin"],
            required: "true",
        },
        approved: {
			type: Boolean,
			default: true,
		},
        additionalDetails:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Profile",
        },
        courseCatPro: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "courseCategory",
            },
        ],
        imageCat: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "imageCategory",
            },
        ],
        teachCat: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "teachCategory",
            },
        ],
        token: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
        image: {
            type: String,
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model("User", userSchema);