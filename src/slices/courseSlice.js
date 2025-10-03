import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: {},
  editCourse: false,
  courseDetails: null,
  categories: [],
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
    setEditCourse(state, action) {
      state.editCourse = action.payload;
    },
    setCourseDetails(state, action) {
      state.courseDetails = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setCourse,
  setEditCourse,
  setCourseDetails,
  setCategories,
  setLoading,
  setError,
} = courseSlice.actions;
export default courseSlice.reducer;
