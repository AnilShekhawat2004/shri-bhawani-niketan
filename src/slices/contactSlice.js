import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contact: {},
  editContact: false,
  loading: false,
  error: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContact(state, action) {
      state.contact = action.payload;
    },
    setEditContact(state, action) {
      state.editContact = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setContact, setEditContact, setLoading, setError } =
  contactSlice.actions;
export default contactSlice.reducer;
