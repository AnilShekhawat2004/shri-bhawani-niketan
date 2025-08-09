// eventSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    eventList: [],        // Stores all events
    loading: false,       // Loading state for API calls
    error: null,          // Stores API errors
    success: false,       // Indicates successful create/edit/delete
};

const eventSlice = createSlice({
    name: "events",
    initialState,
    reducers: {
        setEventList(state, action) {
            state.eventList = action.payload;
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
        resetEventState(state) {
            state.eventList = [];
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
});

export const {
    setEventList,
    setEventLoading,
    setEventError,
    setEventSuccess,
    resetEventState,
} = eventSlice.actions;

export default eventSlice.reducer;