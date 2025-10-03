const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { passwordReset } = require("../mail/templates/passwordReset");

require("dotenv").config();

// Reset Password Token
exports.resetPasswordToken = async (req, res) => {
  try {
    // Get email from request body
    const { email } = req.body;

    // Validate email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString("hex");

    // Update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email },
      {
        token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000, // 5 minutes expiry
      },
      { new: true }
    );

    // Create reset URL
    const url = `http://localhost:3000/update-password/${token}`;
    // await mailSender(email, "Password Reset Link", `Password Reset Link: ${url}`);
    try {
      await mailSender(
        email,
        "Password Reset Link",
        passwordReset(`${url}`, `${email}`)
      );
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Error in sending email:",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Email sent successfully. Please check your email and update your password.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    // Data fetch
    const { password, confirmPassword, token } = req.body;

    // Validate passwords match
    if (password !== confirmPassword) {
      return res.status(404).json({
        success: false,
        message: "Password and Confirm Password do not match.",
      });
    }

    // Get user details using token
    const userDetails = await User.findOne({ token });

    // Validate user and token
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    // Check if token has expired
    if (Date.now() > userDetails.resetPasswordExpires) {
      return res.status(404).json({
        success: false,
        message: "Token has expired. Please request a new password reset.",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and remove token
    await User.findOneAndUpdate(
      { token },
      { password: hashedPassword, token: null, resetPasswordExpires: null },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while resetting password.",
    });
  }
};
