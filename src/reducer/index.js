import { combineReducers } from "@reduxjs/toolkit";

import achievementReducer from "../slices/achievementSlice"
import authReducer from "../slices/authSlice"
import courseReducer from "../slices/courseSlice"
import newsReducer from "../slices/newsSlice"
import photoReducer from "../slices/photoSlice"
import profileReducer from "../slices/profileSlice"
import teacherReducer from "../slices/teacherSlice"
import paymentReducer from "../slices/paymentSlice"
import eventReducer from "../slices/eventSlice"
import contactReducer from "../slices/contactSlice"

const rootReducer = combineReducers({
    achievement: achievementReducer,
    auth: authReducer,
    course: courseReducer,
    news: newsReducer,
    photo: photoReducer,
    profile: profileReducer,
    teacher: teacherReducer,
    payment: paymentReducer,
    event: eventReducer,
    contact: contactReducer,
})

export default rootReducer