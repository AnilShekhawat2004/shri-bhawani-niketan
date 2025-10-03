import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentDetails: null, // stores order/payment info returned from server
  loading: false,
  error: null,
  success: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentDetails(state, action) {
      state.paymentDetails = action.payload;
    },
    setPaymentLoading(state, action) {
      state.loading = action.payload;
    },
    setPaymentError(state, action) {
      state.error = action.payload;
    },
    setPaymentSuccess(state, action) {
      state.success = action.payload;
    },
    resetPayment(state) {
      state.paymentDetails = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const {
  setPaymentDetails,
  setPaymentLoading,
  setPaymentError,
  setPaymentSuccess,
  resetPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
