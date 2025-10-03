const express = require("express");
const router = express.Router();

//middleware
const { auth, isAdmin } = require("../middlewares/auth");

//import Teacher Section controller
const {
  createSection,
  editSection,
  getAllSection,
  deleteSection,
  getCounts,
  getTeachDetails,
} = require("../controllers/teacherSection");

//import Teacher SubSection controller
const {
  createSubSection,
  editSubSection,
  deleteSubSection,
  getAllSubSection,
} = require("../controllers/teacherSubSection");

//import Teacher Category controller
const {
  createCategory,
  editCategory,
  showAllCategories,
  deleteCategory,
  categoryPageDetails,
} = require("../controllers/teachCategory");

//Techer Section route
router.post("/createSection", auth, isAdmin, createSection);
router.post("/editSection", auth, isAdmin, editSection);
router.get("/getAllSection", getAllSection);
router.delete("/deleteSection", auth, isAdmin, deleteSection);
router.get("/getCounts", getCounts);
router.post("/getTeachDetails", auth, isAdmin, getTeachDetails);

//Teacher SubSection route
router.post("/createSubSection", auth, isAdmin, createSubSection);
router.post("/editSubSection", auth, isAdmin, editSubSection);
router.delete("/deleteSubSection", auth, isAdmin, deleteSubSection);
router.get("/getAllSubSection", getAllSubSection);

//Teacher Category route
router.post("/createCategory", auth, isAdmin, createCategory);
router.post("/editCategory", auth, isAdmin, editCategory);
router.get("/showAllCategories", showAllCategories);
router.delete("/deleteCategory", auth, isAdmin, deleteCategory);
router.post("/categoryPageDetails", categoryPageDetails);

module.exports = router;
