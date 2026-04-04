import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: {},
  courseDraft: {},
  editCourse: false,
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setCourse(state, action) {
      state.course = action.payload;
    },
    setCourseDraft(state, action) {
      state.courseDraft = {
        ...state.courseDraft,
        ...action.payload,
      };
    },
    setEditCourse(state, action) {
      state.editCourse = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    resetCourse() {
      return initialState;
    },
  },
});

export const {
  setCourse,
  setCourseDraft,
  setEditCourse,
  setLoading,
  setError,
  resetCourse,
} = courseSlice.actions;
export default courseSlice.reducer;
