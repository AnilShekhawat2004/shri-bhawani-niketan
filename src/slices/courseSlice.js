import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courses: [],
    courseDetails: null,
    categories: [],
    loading: false,
    error: null,
};

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setCourses(state, action) {
            state.courses = action.payload;
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

export const { setCourses, setCourseDetails, setCategories, setLoading, setError } = courseSlice.actions;
export default courseSlice.reducer;
