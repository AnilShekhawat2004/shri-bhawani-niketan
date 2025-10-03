import { toast } from "react-hot-toast";
import {
  setPaymentDetails,
  setPaymentError,
  setPaymentLoading,
} from "../../slices/paymentSlice";
import { apiConnector } from "../apiconnector";
import { paymentEndpoints } from "../apis";

const {
  PAYMENT_API,
  VERIFYPAYMENT_API,
  GET_ALL_PAYMENT_API,
  GET_PAYMENT_COUNT_API,
  GET_PAYMENT_DETAILS_API,
} = paymentEndpoints;

// Capture Payment (Order Creation)
export function capturePayment(formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Initializing payment...");
    dispatch(setPaymentLoading(true));
    try {
      const response = await apiConnector("POST", PAYMENT_API, formData);

      console.log("Capture Payment API Response:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setPaymentDetails(response.data.data));
      toast.success("Payment initiated");
    } catch (error) {
      console.error("Capture Payment Error:", error);
      dispatch(
        setPaymentError(
          error?.response?.data?.message || "Payment initiation failed"
        )
      );
      toast.error("Payment initiation failed");
    }
    dispatch(setPaymentLoading(false));
    toast.dismiss(toastId);
  };
}

// Verify Payment
export function verifyPayment(verifyData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Verifying payment...");
    dispatch(setPaymentLoading(true));
    try {
      const response = await apiConnector(
        "POST",
        VERIFYPAYMENT_API,
        verifyData
      );

      console.log("Verify Payment API Response:", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Payment verified successfully");
      navigate("/payment-success"); // or any thank-you/success page
    } catch (error) {
      console.error("Verify Payment Error:", error);
      dispatch(
        setPaymentError(
          error?.response?.data?.message || "Payment verification failed"
        )
      );
      toast.error("Payment verification failed");
    }
    dispatch(setPaymentLoading(false));
    toast.dismiss(toastId);
  };
}

export const getAllPayments = async () => {
  let result = [];
  try {
    const response = await apiConnector("GET", GET_ALL_PAYMENT_API);
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Fetch All Payments"
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_ALL_PAYMENT_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const getPaymentCount = async () => {
  let result = null;
  try {
    const response = await apiConnector("GET", GET_PAYMENT_COUNT_API);
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Fetch Payment Counts"
      );
    }
    result = response?.data?.data;
  } catch (error) {
    console.error("GET_PAYMENT_COUNT_API Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  return result;
};

export const getPaymentDetails = async (paymentId, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_PAYMENT_DETAILS_API,
      {
        paymentId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!response?.data?.success) {
      throw new Error(
        response?.data?.message || "Could Not Get Payment Details"
      );
    }

    result = response?.data?.data;
  } catch (error) {
    console.error("Get Payment Details Api Error:", error);
    toast.error(error?.response?.data?.message || error.message);
  }
  toast.dismiss(toastId);
  return result;
};
