const mongoose = require("mongoose");

const teacherSubSectionSchema = new mongoose.Schema({
  contactNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  startingYear: {
    type: Number,
  },
  experience: {
    type: Number,
  },
  educationHistory: [
    {
      institute: {
        type: String,
      },
      degree: {
        type: String,
      },
      year: {
        type: Number,
      },
    },
  ],
  strengths: [
    {
      type: String,
    },
  ],
  hobbies: [
    {
      type: String,
    },
  ],
  professionalHistory: [
    {
      institute: {
        type: String,
      },
      designation: {
        type: String,
      },
      duration: {
        type: Number,
      },
    },
  ],
  love: {
    type: String,
  },
  teacherSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teacherSection",
    },
  ],
});

module.exports = mongoose.model("teacherSubSection", teacherSubSectionSchema);
