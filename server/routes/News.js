const express = require("express");
const router = express.Router();

//middleware
const{ auth, isAdmin } = require("../middlewares/auth")

//import the news controller
const {
    createNews,
    deleteNews,
    getAllNews,
    getRecentNews,
    editNews,
    getNewsCount,
    getNewsDetails,
} = require("../controllers/News")

//news route
router.post("/createNews", auth, isAdmin, createNews)
router.delete("/deleteNews", auth, isAdmin, deleteNews)
router.get("/getAllNews", getAllNews)
router.post("/getRecentNews", getRecentNews)
router.post("/editNews", auth, isAdmin, editNews)
router.get("/getNewsCount", getNewsCount)
router.post("/getNewsDetails", auth, isAdmin, getNewsDetails)

module.exports = router