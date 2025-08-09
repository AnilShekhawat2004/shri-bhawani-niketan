const mongoose = require("mongoose");

const teacherSectionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    designation:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    teachCat: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"teachCategory",
        },
    ],
    SubSection: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "teacherSubSection",
        },
    ],
});

module.exports = mongoose.models.teacherSection || mongoose.model("teacherSection", teacherSectionSchema);
