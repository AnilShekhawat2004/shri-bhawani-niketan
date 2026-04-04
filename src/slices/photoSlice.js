import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photo: {},
  editPhoto: false,
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
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setPhoto, setEditPhoto, setLoading, setError } =
  photoSlice.actions;
export default photoSlice.reducer;
