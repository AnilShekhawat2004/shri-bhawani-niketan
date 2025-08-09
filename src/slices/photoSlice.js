import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    photos: [], 
    categories: [],
    loading: false,
    error: null,
};

const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        setPhotos(state, action) {
            state.photos = action.payload;
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

export const { setPhotos, setCategories, setLoading, setError } = photoSlice.actions;
export default photoSlice.reducer;
