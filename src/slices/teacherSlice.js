import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  teacher: {}, // Stores all sections
  teacherDraft: {},
  editTeacher: false,
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
    setTeacherDraft: (state, action) => {
      state.teacherDraft = {
        ...state.teacherDraft,
        ...action.payload,
      }
    },
    setEditTeacher(state, action) {
      state.editTeacher = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    resetTeacher(){
      return initialState;
    }
  },
});

export const {
  setStep,
  setTeacher,
  setTeacherDraft,
  setEditTeacher,
  setLoading,
  setError,
  resetTeacher,
} = teacherSlice.actions;
export default teacherSlice.reducer;
