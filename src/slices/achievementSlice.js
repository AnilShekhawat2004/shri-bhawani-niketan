import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    achievementsList: [],  // Stores all achievements
    loading: false,        // Loading state for API calls
    error: null,           // Stores API errors
};

const achievementSlice = createSlice({
    name: "achievement",
    initialState,
    reducers: {
        setAchievementsList(state, action) {
            state.achievementsList = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setAchievementsList, setLoading, setError } = achievementSlice.actions;
export default achievementSlice.reducer;
