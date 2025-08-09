const express = require("express")
const router = express.Router();

//middleware
const {auth, isAdmin} = require("../middlewares/auth")

//import the college photo controllers
const{
    addPhoto,
    deletePhoto,
    getAllPhotos,
} = require("../controllers/collegePhoto")

//import the image category controllers
const{
    createCategory,
    editCategory,
    showAllCategories,
    deleteCategory,
    categoryPageDetails,
} = require("../controllers/imageCategory")

//college photo route
router.post("/addPhoto", auth, isAdmin, addPhoto)
router.delete("/deletePhoto", auth, isAdmin, deletePhoto)
router.get("/getAllPhotos", getAllPhotos)

//image category route
router.post("/createCategory", auth, isAdmin, createCategory)
router.post("/editCategory", auth, isAdmin, editCategory)
router.get("/showAllCategories", showAllCategories)
router.delete("/deleteCategory", auth, isAdmin, deleteCategory)
router.post("/categoryPageDetails", categoryPageDetails)

module.exports = router