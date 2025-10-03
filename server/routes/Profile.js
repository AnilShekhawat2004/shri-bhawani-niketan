const express = require("express");
const router = express.Router();

//middleware
const { auth, isAdmin } = require("../middlewares/auth");

const {
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
} = require("../controllers/Profile");

//profile routes
router.post("/updateProfile", auth, isAdmin, updateProfile);
router.get("/getAllUserDetails", auth, isAdmin, getAllUserDetails);
router.post("/updateDisplayPicture", auth, isAdmin, updateDisplayPicture);

module.exports = router;
