const express = require("express");
const router = express.Router();

//import middleware
const { auth, isAdmin } = require("../middlewares/auth");

//import controllers of auth
const { login, changePassword } = require("../controllers/Auth");

//import controllers of reset password
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

//cerate route for auth's controllers
router.post("/login", login);
router.post("/changePassword", auth, isAdmin, changePassword);

//create route for ResetPasword constollers
router.post("/resetPasswordToken", resetPasswordToken);
router.post("/resetPassword", resetPassword);

module.exports = router;
