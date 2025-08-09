const mongoose = require("mongoose");

const teachCategorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    branch : {
        type: String
    },
    image: {
        type: String,
    },
    landingImage: {
        type: String,
    },
    Section: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"teacherSection",
        },
    ],
});

module.exports = mongoose.models.teachCategory || mongoose.model("teachCategory", teachCategorySchema);
