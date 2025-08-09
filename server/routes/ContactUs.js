const express = require("express");
const router = express.Router();

//middleware
const { auth, isAdmin } = require("../middlewares/auth");

//import contact us controller
const{ contactUs, getAllContact } = require("../controllers/contactUs");

//contact us route
router.post("/contactUs", contactUs);
router.get("/getAllContact", auth, isAdmin, getAllContact);

module.exports = router;