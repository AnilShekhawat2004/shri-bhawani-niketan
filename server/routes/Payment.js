const express = require("express")
const router = express.Router();

//middleware


const { capturePayment, verifyPayment} = require("../controllers/Payment")

router.post("/verifyPayment", verifyPayment)
router.post("/capturePayment", capturePayment);

module.exports = router