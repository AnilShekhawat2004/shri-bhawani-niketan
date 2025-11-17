const Achievement = require("../models/Achievement");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

require("dotenv").config();

//function for create Achievement
exports.createAchiever = async (req, res) => {
  try {
    //get all required from request body
    let { title, descritption, status } = req.body;

    //get image from files
    let thumbnail = req.files?.thumbnailImage;

    //vaildation
    if (!title || !descritption || !thumbnail) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required to fill in order to create a Achievement",
      });
    }

    if (!status || status == undefined) {
      status = "Draft";
    }

    //upload the thumbnail image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );


    //create Achievement with given Details
    const newAchievement = await Achievement.create({
      title,
      descritption,
      status: status,
      thumbnail: thumbnailImage.secure_url,
    });

    //return response
    return res.status(201).json({
      success: true,
      message: "Achievement is created successfully",
      data: newAchievement,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//delete a achivements
exports.deleteAchieve = async (req, res) => {
  try {
    const achieveId =
      req.body.achieveId || req.params.achieveId || req.query.achieveId;

    if (!achieveId || achieveId.length !== 24) {
      return res.status(404).json({
        success: false,
        message: "Invalid Achievement ID",
      });
    }

    const achievement = await Achievement.findById(achieveId);

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: "Achievement not found",
      });
    }

    await Achievement.findByIdAndDelete(achieveId);

    return res.status(200).json({
      success: true,
      message: "Achievement deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get all Achievement's
exports.getAllAchievement = async (req, res) => {
  try {
    const allAchievement = await Achievement.find();

    if (!allAchievement || allAchievement.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No achievement found",
      });
    }

    //return response
    return res.status(200).json({
      success: true,
      message: "All Achievement fetched successfully",
      data: allAchievement,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editAchievement = async (req, res) => {
  try {
    const { achieveId, title, descritption, status } = req.body;
    const achieve = await Achievement.findById(achieveId);

    if (!achieve) {
      return res.status(404).json({
        success: false,
        message: "Achievement is not found",
      });
    }

    //update title
    if (title !== undefined) {
      achieve.title = title;
    }

    //update the course Description
    if (descritption !== undefined) {
      achieve.descritption = descritption;
    }

    if (status !== undefined) {
      achieve.status = status;
    }

    //If thumbnail image is found, update it
    if (req.files) {
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      achieve.thumbnail = thumbnailImage.secure_url;
    }

    await achieve.save();

    const updatedAchievement = await Achievement.findOne({
      _id: achieveId,
    });

    return res.status(200).json({
      success: true,
      message: "Achievement edited successfully",
      data: updatedAchievement,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAchievementCounts = async (req, res) => {
  try {
    const achievementCount = await Achievement.countDocuments();

    return res.status(200).json({
      success: true,
      data: {
        achievementCount,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAchieveDetails = async (req, res) => {
  try {
    const { achieveId } = req.body;
    const achieveDetails = await Achievement.findOne({
      _id: achieveId,
    });

    if (!achieveDetails) {
      return res.status(404).json({
        success: false,
        message: "Could not found achievement details",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Details fetched successfully",
      data: achieveDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
