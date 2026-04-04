const express = require("express");
const router = express.Router();

//middleware
const { auth, isAdmin } = require("../middlewares/auth");

//import courseCategory controllers
const {
  createCategory,
  showAllCategories,
  deleteCategory,
  editCategory,
  getCourseCounts,
  getCourseCategoryDetails,
} = require("../controllers/courseCategory");

//import Category program
const {
  createCatProgram,
  editCatProgram,
  showAllCategoryProgram,
  deleteCatProgram,
} = require("../controllers/CategoryProgram");

//category route
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.delete("/deleteCategory", auth, isAdmin, deleteCategory);
router.post("/editCategory", auth, isAdmin, editCategory);
router.get("/getCourseCounts", getCourseCounts);
router.post("/getCourseCategoryDetails", getCourseCategoryDetails);

//category program
router.post("/createCatProgram", auth, isAdmin, createCatProgram);
router.post("/editCatProgram", auth, isAdmin, editCatProgram);
router.delete("/deleteCatProgram", auth, isAdmin, deleteCatProgram);
router.get("/showAllCategoryProgram", showAllCategoryProgram);

module.exports = router;
