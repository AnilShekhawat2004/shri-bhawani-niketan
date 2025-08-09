const mongoose = require("mongoose");

const collegePhotoSchema = new mongoose.Schema({
    thumbnail: {
        type:String,
    },
    imageCategory : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "imageCategory",
        },
    ],
})

module.exports = mongoose.model("collegePhoto", collegePhotoSchema);