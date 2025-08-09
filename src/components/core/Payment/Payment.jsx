import React, { useEffect, useState } from 'react';
import Footer from '../../Common/Footer/Footer';
import { toast } from "react-hot-toast";
import { apiConnector } from '../../../services/apiconnector';
import { paymentEndpoints } from '../../../services/apis';
import { useForm } from 'react-hook-form';
import Donate from "../../../assets/ImageLine/Donate.png";
import Price from "../../../assets/ImageLine/Price.jpg";
import LandingImage from "../../Common/landingImage";
import RedBar from '../../Common/redBar';
import CountryCode from "../../../data/countryCode.json";
import SButton from "../../Common/Buttons/sButton";
import ThankMessage from './thankMessage';

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      CountryCode: "+91",
    },
  });

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const submitPayment = async (data) => {
    setLoading(true);
    try {
      // Load Razorpay
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        toast.error("Razorpay failed to load. Check your connection.");
        setLoading(false);
        return;
      }

      // Create Razorpay order from backend
      const res = await apiConnector("POST", paymentEndpoints.PAYMENT_API, data);
      if (!res?.data?.success || !res?.data?.data) {
        throw new Error("Order creation failed");
      }

      // ✅ Correctly extract order ID and amount
      const { id: order_id, amount } = res.data.data;

      const options = {
        key: "rzp_test_t4LUM04KXw6wHc", // Replace with your Razorpay Key ID
        amount,
        currency: "INR",
        name: `${data.firstName} ${data.lastName || ""}`,
        description: "Donation to SBNC",
        order_id, // ✅ Fixed this line
        handler: async function (response) {
          try {
            const verifyRes = await apiConnector("POST", paymentEndpoints.VERIFYPAYMENT_API, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              ...data,
            });

            if (verifyRes?.data?.success) {
              toast.success("Payment Successful");
              setIsPaymentSuccessful(true);
            } else {
              toast.error("Payment verification failed");
              setIsPaymentSuccessful(false);
            }
          } catch (verifyError) {
            console.error("Verification Error:", verifyError);
            toast.error("Payment verification failed");
            setIsPaymentSuccessful(false);
          }
        },
        prefill: {
          name: `${data.firstName} ${data.lastName || ""}`,
          email: data.email,
          contact: data.number,
        },
        notes: {
          comment: data.comment,
        },
        theme: {
          color: "#dd2c00",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong. Please try again.");
      setIsPaymentSuccessful(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isPaymentSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        amount: "",
        comment: "",
        CountryCode: "+91",
      });
    }
  }, [isPaymentSuccessful, reset]);

  return (
    <div>
      <LandingImage
        LineImage={Price}
        text={"Give Now"}
        className="absolute z-20"
        textClassName="text-[60px] text-center uppercase font-bold translate-y-9"
      />

      <RedBar
        text="Thank you for taking this meaningful step your generosity supports education, empowers students, and helps us build a stronger future together. We deeply appreciate it."
        className="absolute font-semibold"
        textClassName="font-m1 text-center text-[28px] flex justify-center translate-x-[150px] -translate-y-[20px]"
      />

      <div className="mt-32 w-[85%] mx-auto flex flex-row gap-10 justify-center items-center">
        <img
          src={Donate}
          alt="Donate"
          loading="lazy"
          className="w-[40%] h-[650px] mt-20 rounded-3xl shadow-xl -translate-y-10"
        />

        <form
          onSubmit={handleSubmit(submitPayment)}
          className="w-[40%] mx-auto bg-white rounded-3xl shadow-xl border-gray-200"
        >
          <div className="bg-gradient-to-r from-bhawaniDark to-bhawaniDark2 py-6 px-8 rounded-t-3xl">
            <h2 className="text-white text-3xl font-bold">Join Our Cause</h2>
            <p className="text-white text-sm">Your support means the world to us!</p>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="form-input-style"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && <span className="text-red-500 text-sm">Required field</span>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="form-input-style"
                  {...register("lastName")}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="example@domain.com"
                className="form-input-style"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Enter a valid email.</span>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <select
                  className="w-20 form-input-style"
                  {...register("CountryCode", { required: true })}
                >
                  {CountryCode.map((ele, i) => (
                    <option key={i} value={ele.code}>
                      {ele.code} - {ele.country}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="12345 67890"
                  className="flex-1 form-input-style"
                  {...register("number", {
                    required: { value: true, message: "Phone number required." },
                    maxLength: { value: 12, message: "Too long" },
                    minLength: { value: 10, message: "Too short" },
                  })}
                />
              </div>
              {errors.number && (
                <span className="text-red-500 text-sm">{errors.number.message}</span>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Amount (INR) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                placeholder="Enter donation amount"
                className="form-input-style"
                {...register("amount", { required: "Amount is required" })}
              />
              {errors.amount && (
                <span className="text-red-500 text-sm">{errors.amount.message}</span>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="5"
                placeholder="Type your message here..."
                className="form-input-style"
                {...register("comment", { required: "Message is required" })}
              />
              {errors.comment && (
                <span className="text-red-500 text-sm">{errors.comment.message}</span>
              )}
            </div>

            <div className="pt-4">
              <SButton
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg text-lg font-semibold"
              >
                {loading ? "Processing..." : "Pay Now"}
              </SButton>
            </div>
          </div>
        </form>
      </div>

      <ThankMessage/>
      <Footer />
    </div>
  );
};

export default Payment;
