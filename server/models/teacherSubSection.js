const mongoose = require("mongoose");


const teacherSubSectionSchema = new mongoose.Schema({
    contactNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    startingYear: {
        type: String,
    },
    experience: {
        type: String,
    },
    educationHistory: {
        type: String,
    },
    strengths:{
        type: String,
    },
    hobbies : {
        type: String,
    },
    professionalHistory: {
        type: String,
    },
    love:{
        type: String,
    },
    teacherSection: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"teacherSection",
        },
    ],
})

module.exports = mongoose.model("teacherSubSection", teacherSubSectionSchema);