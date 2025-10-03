import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  achievement: {},
  editAchievement: false,
  loading: false, // Loading state for API calls
  error: null, // Stores API errors
};

const achievementSlice = createSlice({
  name: "achievement",
  initialState,
  reducers: {
    setAchievement(state, action) {
      state.achievement = action.payload;
    },
    setEditAchievement(state, action) {
      state.editAchievement = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setAchievement, setEditAchievement, setLoading, setError } =
  achievementSlice.actions;
export default achievementSlice.reducer;
