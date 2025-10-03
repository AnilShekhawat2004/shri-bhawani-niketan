const express = require("express");
const router = express.Router();

//middleware
const { auth, isAdmin } = require("../middlewares/auth");

//import contact us controller
const {
  contactUs,
  editContactUs,
  getAllContact,
  deleteContact,
  getContactCounts,
  getContactDetails,
  getUnseenContact,
  MarkingSeenContact,
} = require("../controllers/contactUs");

//contact us route
router.post("/contactUs", contactUs);
router.post("/editContactUs", auth, isAdmin, editContactUs);
router.get("/getAllContact", getAllContact);
router.delete("/deleteContact", auth, isAdmin, deleteContact);
router.get("/getContactCounts", getContactCounts);
router.post("/getContactDetails", auth, isAdmin, getContactDetails);
router.get("/getUnseenContact", getUnseenContact);
router.post("/MarkingSeenContact", MarkingSeenContact);

module.exports = router;
