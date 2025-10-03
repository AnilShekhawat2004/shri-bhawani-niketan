import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  teacher: {}, // Stores all sections
  editTeacher: false,
  subSectionsList: [], // Stores all subsections
  categoriesList: [], // Stores all teacher categories
  loading: false, // Loading state for API calls
  error: null, // Stores API errors
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setTeacher(state, action) {
      state.teacher = action.payload;
    },
    setEditTeacher(state, action) {
      state.editTeacher = action.payload;
    },
    setSubSectionsList(state, action) {
      state.subSectionsList = action.payload;
    },
    setCategoriesList(state, action) {
      state.categoriesList = action.payload;
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
  setStep,
  setTeacher,
  setEditTeacher,
  setSubSectionsList,
  setCategoriesList,
  setLoading,
  setError,
} = teacherSlice.actions;
export default teacherSlice.reducer;
