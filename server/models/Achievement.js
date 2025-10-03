const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  thumbnail: {
    type: String,
  },
  descritption: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },
});

module.exports = mongoose.model("Achievement", achievementSchema);
