const express = require("express")
const router = express.Router()


//middleware 
const { auth, isAdmin } = require("../middlewares/auth")

//import the controller
const {
    createEvent,
    editEvent,
    deleteEvent,
    getAllEvent,
} = require("../controllers/Events")

router.post("/createEvent", auth, isAdmin, createEvent)
router.post("/editEvent", auth, isAdmin, editEvent)
router.delete("/deleteEvent", auth, isAdmin, deleteEvent)
router.get("/getAllEvent", getAllEvent)

module.exports = router