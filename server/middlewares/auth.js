const jwt = require("jsonwebtoken");
require("dotenv").config();

// Auth Middleware
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.body?.token ||
      (req.header("Authorization") &&
      req.header("Authorization").startsWith("Bearer ")
        ? req.header("Authorization").split(" ")[1]
        : null);

    // If token is missing, return an error
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded user info to request
      next();
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: "Token is invalid",
      });
    }
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

// isAdmin Middleware
exports.isAdmin = async (req, res, next) => {
  try {
    // Ensure req.user exists before accessing accountType
    if (!req.user || req.user.accountType !== "Admin") {
      return res.status(404).json({
        // 403 is better for "Forbidden"
        success: false,
        message: "Access denied. Admins only.",
      });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};
