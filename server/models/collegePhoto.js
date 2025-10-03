const mongoose = require("mongoose");

const collegePhotoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
  },
  imageCategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "imageCategory",
    },
  ],
});

module.exports = mongoose.model("collegePhoto", collegePhotoSchema);
