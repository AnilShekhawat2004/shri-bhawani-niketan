import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentDetails: null, // stores order/payment info returned from server
  loading: false,
  error: null,
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
  },
});

export const {
  setPaymentDetails,
  setPaymentLoading,
  setPaymentError,
} = paymentSlice.actions;

export default paymentSlice.reducer;
