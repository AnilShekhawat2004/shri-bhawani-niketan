// eventSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  event: {},
  editEvent: false,
  loading: false, // Loading state for API calls
  error: null, // Stores API errors
  success: false, // Indicates successful create/edit/delete
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setEvent(state, action) {
      state.event = action.payload;
    },
    setEditEvent(state, action) {
      state.editEvent = action.payload;
    },
    setEventLoading(state, action) {
      state.loading = action.payload;
    },
    setEventError(state, action) {
      state.error = action.payload;
    },
    setEventSuccess(state, action) {
      state.success = action.payload;
    },
    resetEventState() {
      return initialState;
    },
  },
});

export const {
  setEvent,
  setEditEvent,
  setEventLoading,
  setEventError,
  setEventSuccess,
  resetEventState,
} = eventSlice.actions;

export default eventSlice.reducer;
