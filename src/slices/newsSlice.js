import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: {},
  editNews: false,
  recentNews: [], // Stores recent news
  loading: false, // Loading state for API calls
  error: null, // Stores API errors
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews(state, action) {
      state.news = action.payload;
    },
    setEditNews(state, action) {
      state.editNews = action.payload;
    },
    setRecentNews(state, action) {
      state.recentNews = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setNews, setEditNews, setRecentNews, setLoading, setError } =
  newsSlice.actions;
export default newsSlice.reducer;
