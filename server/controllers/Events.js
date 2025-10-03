const Events = require("../models/Events");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

require("dotenv").config();

// ========================== CREATE EVENT ==========================
exports.createEvent = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, description, date, day, branch } = req.body;

    const thumbnail = req.files.thumbnailImage;

    if (!name || !description || !day || !date || !thumbnail || !branch) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const adminDetails = await User.findOne({
      _id: userId,
      accountType: "Admin",
    });

    if (!adminDetails) {
      return res.status(404).json({
        success: false,
        message: "Admin access required",
      });
    }

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newEvent = await Events.create({
      name,
      description,
      date,
      day,
      branch,
      thumbnail: thumbnailImage.secure_url,
    });

    return res.status(200).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    console.error("Error while creating the Event:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================== EDIT EVENT ==========================
exports.editEvent = async (req, res) => {
  try {
    const { eventId, name, description, date, day, branch } = req.body;

    const event = await Events.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event ID not found",
      });
    }

    if (name !== undefined) event.name = name;
    if (description !== undefined) event.description = description;
    if (date !== undefined) event.date = date;
    if (day !== undefined) event.day = day;
    if (branch !== undefined) event.branch = branch;

    if (req.files && req.files.thumbnailImage) {
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      event.thumbnail = thumbnailImage.secure_url;
    }

    await event.save();

    const updatedEvent = await Events.findById(eventId);

    return res.status(200).json({
      success: true,
      message: "Event edited successfully",
      data: updatedEvent,
    });
  } catch (error) {
    console.error("Error while editing the Event:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================== DELETE EVENT ==========================
exports.deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await Events.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event ID not found",
      });
    }

    await Events.findByIdAndDelete(eventId);

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting the Event:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================== GET ALL EVENTS ==========================
exports.getAllEvent = async (req, res) => {
  try {
    const allEvent = await Events.find();

    return res.status(200).json({
      success: true,
      message: "All Events fetched successfully",
      data: allEvent,
    });
  } catch (error) {
    console.error("Error while fetching Events:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEventCounts = async (req, res) => {
  try {
    const EventCount = await Events.countDocuments();

    return res.status(200).json({
      success: true,
      data: {
        EventCount,
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

exports.getEventDetails = async (req, res) => {
  try {
    const { eventId } = req.body;
    const eventDetails = await Events.findOne({
      _id: eventId,
    });

    if (!eventDetails) {
      return res.status(404).json({
        success: false,
        message: "Could not found event details",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Events Details fetched successfully",
      data: eventDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
