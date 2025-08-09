const News = require("../models/News");
const mongoose = require("mongoose")
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require('dotenv').config();

// Create News
exports.createNews = async (req, res) => {
    try {
        const userId = req.user.id;
        let { newsName, newsDescription, status } = req.body

        if (!newsName || !newsDescription || !req.files || !req.files.newsPic) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        status = status || "Draft";

        // Upload image to Cloudinary
        const newsImageUpload = await uploadImageToCloudinary(req.files.newsPic, process.env.FOLDER_NAME);
        const newsImage = newsImageUpload.secure_url; // Store only the URL

        const newNews = await News.create({
            newsName,
            newsDescription,
            status,
            newsImage,
        });

        return res.status(201).json({
            success: true,
            message: "News created successfully.",
            newNews,
        });

    } catch (error) {
        console.error(error);
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
        const allNews = await News.find(
            { status: "Published" }
        );

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

        const recentNews = await News.find({ _id: { $ne: newsId } })
            .sort({ createdAt: -1 })
            .limit(3);

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

        if (req.files && req.files.newsImage) {
            console.log("Updating news image...");
            const newsImageUpload = await uploadImageToCloudinary(req.files.newsImage, process.env.FOLDER_NAME);
            news.newsImage = newsImageUpload.secure_url;
        }

        await news.save();

        return res.status(200).json({
            success: true,
            message: "News updated successfully.",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
