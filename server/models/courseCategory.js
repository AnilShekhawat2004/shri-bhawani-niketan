const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        type:String,
    },
    courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
    categoryProgram: [
        {
            type: mongoose.Schema.Types.ObjectId,
			ref: "CatgoryProgram",
        }
    ]
});

module.exports = mongoose.model("courseCategory", categorySchema);