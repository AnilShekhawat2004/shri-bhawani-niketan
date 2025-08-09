const mongoose = require("mongoose");

const imageCategorySchema = new mongoose.Schema({
    name:{
        type: String,
    },
    description: {
        type:String,
    },
    image: {
        type:String,
    },
    collegePhoto: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"collegePhoto",
        },
    ],
});

module.exports = mongoose.model("imageCategory", imageCategorySchema);