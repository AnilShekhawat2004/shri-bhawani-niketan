const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Profile = require("../models/Profile");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");

require("dotenv").config();

// User Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Please provide both email and password",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please enter a correct email.",
      });
    }

    // Validate password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id, accountType: user.accountType },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Set cookie options
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while logging in",
    });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized. Please log in again.",
      });
    }

    const userDetails = await User.findById(req.user.id);
    const { oldPassword, newPassword } = req.body;

    if (oldPassword === newPassword) {
      return res.status(404).json({
        success: false,
        message: "Both passwords are same",
      });
    }

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      return res.status(404).json({
        success: false,
        message: "Current pasword is incorrect",
      });
    }

    // Hash new password and update DB
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      await mailSender(
        updatedUserDetails.email,
        "Password Updated Successfully",
        passwordUpdated(
          updatedUserDetails.email,
          `${updatedUserDetails.firstName}`
        )
      );
    } catch (error) {
      console.error("Error sending email:", error);
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while changing password",
    });
  }
};
