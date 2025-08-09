import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { paymentEndpoints } from "../apis"
import {
  setPaymentLoading,
  setPaymentDetails,
  setPaymentError,
} from "../../slices/paymentSlice"

const { PAYMENT_API, VERIFYPAYMENT_API } = paymentEndpoints

// Capture Payment (Order Creation)
export function capturePayment(formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Initializing payment...")
    dispatch(setPaymentLoading(true))
    try {
      const response = await apiConnector("POST", PAYMENT_API, formData)

      console.log("Capture Payment API Response:", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      dispatch(setPaymentDetails(response.data.data))
      toast.success("Payment initiated")
    } catch (error) {
      console.error("Capture Payment Error:", error)
      dispatch(setPaymentError(error?.response?.data?.message || "Payment initiation failed"))
      toast.error("Payment initiation failed")
    }
    dispatch(setPaymentLoading(false))
    toast.dismiss(toastId)
  }
}

// Verify Payment
export function verifyPayment(verifyData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Verifying payment...")
    dispatch(setPaymentLoading(true))
    try {
      const response = await apiConnector("POST", VERIFYPAYMENT_API, verifyData)

      console.log("Verify Payment API Response:", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Payment verified successfully")
      navigate("/payment-success")  // or any thank-you/success page
    } catch (error) {
      console.error("Verify Payment Error:", error)
      dispatch(setPaymentError(error?.response?.data?.message || "Payment verification failed"))
      toast.error("Payment verification failed")
    }
    dispatch(setPaymentLoading(false))
    toast.dismiss(toastId)
  }
}
