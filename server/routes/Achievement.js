const express = require("express")
const router = express.Router()

//middleware
const {auth, isAdmin} = require("../middlewares/auth")

//import the Achievement controller
const{
    createAchiever,
    deleteAchieve,
    getAllAchievement,
    editAchievement,
} = require("../controllers/Achievement")

//Achievement route
router.post("/createAchiever", auth , isAdmin, createAchiever)
router.delete("/deleteAchievement", auth, isAdmin, deleteAchieve)
router.get("/getAllAchievement", getAllAchievement)
router.post("/editAchievement", auth, isAdmin, editAchievement)

module.exports = router