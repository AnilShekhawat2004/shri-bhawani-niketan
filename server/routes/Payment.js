const express = require("express")
const router = express.Router();

//middleware

const{ auth, isAdmin } = require("../middlewares/auth")

const { capturePayment, verifyPayment, getAllPayments, getPaymentCount, getPaymentDetails, } = require("../controllers/Payment")

router.post("/verifyPayment", verifyPayment)
router.post("/capturePayment", capturePayment);
router.get("/getAllPayments", getAllPayments)
router.get("/getPaymentCount", getPaymentCount)
router.post("/getPaymentDetails", auth, isAdmin, getPaymentDetails)

module.exports = router