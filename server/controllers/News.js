const News = require("../models/News");
const User = require("../models/User");
const mongoose = require("mongoose");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.createNews = async (req, res) => {
  try {
    const { newsName, newsDescription, status } = req.body;
    const image = req.files?.thumbnailImage;
    const userId = req.user.id;

    if (!newsName || !newsDescription || !image) {
      return res.status(404).json({
        success: false,
        message: "All fields are required to create a news",
      });
    }

    const adminDetails = await User.findById(userId, {
      accountType: "Admin",
    });

    if (!adminDetails) {
      return res.status(404).json({
        success: false,
        message: "Admin details are not found",
      });
    }

    const thumbnailImage = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME
    );

    const newNews = await News.create({
      newsName: newsName,
      newsDescription: newsDescription,
      image: thumbnailImage.secure_url,
      status: status,
    });

    return res.status(200).json({
      success: true,
      message: "News is Successfully created",
      data: newNews,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete News
exports.deleteNews = async (req, res) => {
  try {
    const { newsId } = req.body;

    if (!newsId || !mongoose.Types.ObjectId.isValid(newsId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing newsId.",
      });
    }

    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    await News.findByIdAndDelete(newsId);

    return res.status(200).json({
      success: true,
      message: "News deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Published News
exports.getAllNews = async (req, res) => {
  try {
    const allNews = await News
      .find
      // { status: "Published" }
      ();

    return res.status(200).json({
      success: true,
      message: "All news fetched successfully.",
      data: allNews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Recent News (excluding the given newsId)
exports.getRecentNews = async (req, res) => {
  try {
    const { newsId } = req.body;

    if (!newsId) {
      return res.status(400).json({
        success: false,
        message: "newsId is required.",
      });
    }

    const recentNews = await News.find({ _id: { $ne: newsId } }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Recent news fetched successfully.",
      recentNews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Edit News
exports.editNews = async (req, res) => {
  try {
    const { newsId, newsName, newsDescription } = req.body;

    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found.",
      });
    }

    if (newsName !== undefined) news.newsName = newsName;
    if (newsDescription !== undefined) news.newsDescription = newsDescription;

    if (req.files) {
      console.log("Updating news image...");
      const image = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        image,
        process.env.FOLDER_NAME
      );
      news.image = thumbnailImage.secure_url;
    }

    await news.save();

    const updateNews = await News.findOne({
      _id: newsId,
    });

    return res.status(200).json({
      success: true,
      message: "News updated successfully.",
      data: updateNews,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getNewsCount = async (req, res) => {
  try {
    const newsCount = await News.countDocuments();

    const publishedCount = await News.countDocuments({ status: "Published" });

    const draftCount = await News.countDocuments({ status: "Draft" });

    return res.status(200).json({
      success: true,
      data: {
        newsCount,
        publishedCount,
        draftCount,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getNewsDetails = async (req, res) => {
  try {
    const { newsId } = req.body;
    const newsDetails = await News.findOne({
      _id: newsId,
    });

    if (!newsDetails) {
      return res.status(404).json({
        success: false,
        message: "Could not found news details",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Details fetched successfully",
      data: newsDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
