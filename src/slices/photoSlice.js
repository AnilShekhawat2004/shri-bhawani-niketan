import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photo: {},
  editPhoto: false,
  categories: [],
  loading: false,
  error: null,
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    setPhoto(state, action) {
      state.photo = action.payload;
    },
    setEditPhoto(state, action) {
      state.editPhoto = action.payload;
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

export const { setPhoto, setEditPhoto, setCategories, setLoading, setError } =
  photoSlice.actions;
export default photoSlice.reducer;
