const express = require("express");
const router = express.Router();

//middleware
const {auth, isAdmin} = require("../middlewares/auth");

//import the course controllers
const{
    createCourse,
    editCourse,
    deleteCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
} = require("../controllers/Course");

//import courseCategory controllers
const{
    createCategory,
    showAllCategories,
    categoryPageDetails,
    deleteCategory,
    editCategory,
    getCourseCounts,
} = require("../controllers/courseCategory");

//import Category program
const{
    createCatProgram,
    editCatProgram,
    showAllCategoryProgram,
    deleteCatProgram,
    getCategoryProgramCount,
} = require("../controllers/CategoryProgram")


//Course route 
router.post("/createCourse", auth, isAdmin, createCourse)
router.post("/editCourse", auth, isAdmin, editCourse)
router.delete("/deleteCourse", auth, isAdmin, deleteCourse)
router.get("/getAllCourses", getAllCourses)
router.post("/getCourseDetails", getCourseDetails)
router.post("/getFullCourseDetails", getFullCourseDetails)

//category route 
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/categoryPageDetails", categoryPageDetails)
router.delete("/deleteCategory", auth, isAdmin, deleteCategory)
router.post("/editCategory", auth, isAdmin, editCategory)
router.get("/getCourseCounts", getCourseCounts)

//category program 
router.post("/createCatProgram", auth, isAdmin, createCatProgram)
router.post("/editCatProgram", auth, isAdmin, editCatProgram)
router.delete("/deleteCatProgram", auth, isAdmin, deleteCatProgram)
router.get("/showAllCategoryProgram", showAllCategoryProgram)
router.get("/getCategoryProgramCount", getCategoryProgramCount)

module.exports = router