const { instance } = require("../config/Razorpay");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
const Payment = require("../models/Payment");
const { paymentSuccessEmail } = require("../mail/templates/PaymentSuccessEmail");

exports.capturePayment = async (req, res) => {
  try {
    const { firstName, lastName, email, number, amount, comment } = req.body;

    if (!firstName || !lastName || !email || !number || !amount) {
      return res.status(400).json({
        success: false,
        message: "Please fill the required fields",
      });
    }

    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: Math.random().toString(36).substr(2, 9), // Generate a simpler receipt ID
    };

    const paymentResponse = await instance.orders.create(options);

    return res.status(200).json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verifying Razorpay Payment
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      firstName,
      lastName,
      email,
      number,
      amount,
      comment,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !firstName ||
      !lastName ||
      !email ||
      !number ||
      !amount
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // ✅ Save payment details
    const paymentRecord = await Payment.create({
      firstName,
      lastName,
      email,
      number,
      amount,
      comment,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    // ✅ Send confirmation email
    await mailSender(
      email,
      `Payment Received`,
      paymentSuccessEmail(`${firstName}`, `${lastName}`, `${email}`, `${number}`, `${amount}`, `${comment}`)
    );

    return res.status(200).json({
      success: true,
      message: "Payment Verified, Saved, and Email Sent",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
