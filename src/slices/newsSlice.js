import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newsList: [],         // Stores all news
    recentNews: [],       // Stores recent news
    loading: false,       // Loading state for API calls
    error: null,          // Stores API errors
};

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        setNewsList(state, action) {
            state.newsList = action.payload;
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

export const { setNewsList, setRecentNews, setLoading, setError } = newsSlice.actions;
export default newsSlice.reducer;
