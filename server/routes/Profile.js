const express = require("express")
const router = express.Router()

//middleware
const { auth, isAdmin } = require("../middlewares/auth")

const {
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
} = require("../controllers/Profile")

//profile routes
router.put("/updateProfile", auth, isAdmin, updateProfile)
router.get("/getUserDetails", auth, isAdmin, getAllUserDetails)
router.put("/updateDisplayPicture", auth, isAdmin, updateDisplayPicture)

module.exports = router;