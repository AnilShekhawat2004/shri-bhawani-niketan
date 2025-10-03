const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

require("dotenv").config();

//method for updating profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, about, contactNumber } = req.body;

    const id = req.user.id;

    //find the profile by id
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User Details are not found",
      });
    }

    const profile = await Profile.findById(userDetails.additionalDetails);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "User profile Details are not found",
      });
    }

    if (firstName !== undefined) userDetails.firstName = firstName;
    if (lastName !== undefined) userDetails.lastName = lastName;
    if (email !== undefined) userDetails.email = email;

    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
    });
    await user.save();

    //Update Profile fields
    if (about !== undefined) profile.about = about;
    if (contactNumber !== undefined) profile.contactNumber = contactNumber;

    //save the updated profile
    await profile.save();

    //find the updated user Details
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    //return response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUserDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();
    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const image = req?.files.thumbnailImage;
    const userId = req.user.id;
    const thumbnailImage = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: thumbnailImage.secure_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Image Updated Successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
