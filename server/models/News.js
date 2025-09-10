const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  newsName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
  newsDescription: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Draft", "Published"],
    default: "Draft",
  },
});

module.exports = mongoose.model("News", newsSchema);
