const mongoose = require("mongoose");

const categoryProgramSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseCategory",
    },
  ],
});

module.exports = mongoose.model("CatgoryProgram", categoryProgramSchema);
