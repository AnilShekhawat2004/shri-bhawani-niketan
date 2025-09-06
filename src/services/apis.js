const BASE_URL = "http://localhost:4000/api/v1"

// Auth Endpoints
export const endpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const paymentEndpoints = {
    PAYMENT_API: BASE_URL + "/payment/capturePayment",
    VERIFYPAYMENT_API: BASE_URL + "/payment/verifyPayment"
}

//Profile Endpoints
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
}

//Course Endpoints
export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    CREATE_COURSE_API: BASE_URL + "/course/createCourse",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",
}

//Course Category Endpoints
export const courseCategoryEndpoints = {
    CREATE_CATEGORIES_API: BASE_URL + "/course/createCategory",
    CATEGORYPAGEDETAILS_API: BASE_URL + "/course/categoryPageDetails",
    EDIT_CATEGORY_API: BASE_URL + "/course/editCategory",
    DELETE_CATEGORY_API: BASE_URL + "/course/deleteCategory",
    GET_COURSE_COUNT_API: BASE_URL + "/course/getCourseCounts",
    GET_COURSE_CATEGORY_DETAILS_API: BASE_URL + "/course/getCourseCategoryDetails"
}

//Course Category Program
export const courseCategoryProgramEndpoints = {
    CREATE_CATEGORYPROGRAM_API: BASE_URL + "/course/createCatProgram",
    EDIT_CATEGORYPROGRAM_API : BASE_URL + "/course/editCatProgram",
    DELETE_CATEGORYPROGRAM_API : BASE_URL + "/course/deleteCatProgram",
    SHOW_ALL_CATEGORYPROGRAM_API : BASE_URL + "/course/showAllCategoryProgram",
    PROGRAM_CATEGORY_COUNT_API: BASE_URL + "/course/getCategoryProgramCount"
}

//Contact-Us Endpoints
export const contactusEndpoints = {
    CONTACT_US_API: BASE_URL + "/reach/contactUs",
    GET_ALL_CONTACT: BASE_URL + "/reach/getAllContact"
}

//Settings Page Endpoints
export const settingsEndpoints = {
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
}

//Photos page Endpoints
export const photoEndpoints = {
    ADD_PHOTO_API: BASE_URL + "/images/addPhoto",
    DELETE_PHOTO_API: BASE_URL + "/images/deletePhoto",
    GET_ALL_PHOTO_API: BASE_URL + "/images/getAllPhotos",
    PHOTO_CATEGORIES_API: BASE_URL + "/images/showAllCategories",
}

//Image Category Endpoints
export const imageEndpoints = {
    CREATE_IMAGE_CATEGORY_API: BASE_URL + "/images/createCategory",
    EDIT_IMAGE_CATEGORY_API: BASE_URL + "/images/editCategory",
    DELETE_IMAGE_CATEGORY_API: BASE_URL +"/images/deleteCategory",
    IMAGE_CATEGORYPAGEDETAILS_API: BASE_URL + "/images/categoryPageDetails",
}

export const eventEndpoints = {
    CREATE_EVENTS_API : BASE_URL + "/event/createEvent",
    EDIT_EVENTS_API : BASE_URL + "/event/editEvent",
    DELETE_EVENTS_API : BASE_URL + "/event/deleteEvent",
    GET_ALL_EVENTS_API : BASE_URL + "/event/getAllEvent",
    GET_EVENT_COUNTS_API : BASE_URL + "/event/getEventCounts",
    GET_EVENT_DETAILS_API: BASE_URL + "/event/getEventDetails",
}

//News Endpoints 
export const newsEndpoints = {
    CREATE_NEWS_API: BASE_URL + "/news/createNews",
    DELETE_NEWS_API: BASE_URL + "/news/deleteNews",
    GET_ALL_NEWS: BASE_URL + "/news/getAllNews",
    GET_RECENT_NEWS: BASE_URL + "/news/getRecentNews",
    EDIT_NEWS: BASE_URL + "/news/editNews",
}

//Achievement Endpoints
export const achievementEndpoints = {
    CREATE_ACHIEVEMENT_API: BASE_URL + "/achievement/createAchiever",
    DELETE_ACHIEVEMENT_API: BASE_URL + "/achievement/deleteAchievement",
    GET_ALL_ACHIEVEMENT_API: BASE_URL + "/achievement/getAllAchievement",
    EDIT_ACHIEVEMENT_API: BASE_URL + "/achievement/editAchievement",
}

//Teacher Endpoints
export const teacherEndpoints = {
    CREATE_SECTION_API: BASE_URL + "/staff/createSection",
    EDIT_SECTION_API: BASE_URL + "/staff/editSection",
    GET_ALL_SECTION_API: BASE_URL + "/staff/getAllSection",
    DELETE_SECTION_API: BASE_URL + "/staff/deleteSection",
    GET_COUNTS_API: BASE_URL + "/staff/getCounts",
    GET_TEACH_DETAILS: BASE_URL + "/staff/getTeachDetails",
    CREATE_SUBSECTION_API: BASE_URL + "/staff/createSubSection",
    EDIT_SUBSECTION_API: BASE_URL + "/staff/editSubSection",
    DELETE_SUBSECTION_API: BASE_URL + "/staff/deleteSubSection",
    GET_ALL_SUBSECTION_API: BASE_URL + "/staff/getAllSubSection",
    TEACHER_CATEGORY_API: BASE_URL + "/staff/showAllCategories"
}

//Teacher category endpoints
export const teachCategoryEndpoints = {
    TEACHER_CREATE_CATEGORY_API: BASE_URL + "/staff/createCategory",
    TEACHER_EDIT_CATEGORY_API: BASE_URL + "/staff/editCategory",
    TEACHER_DELETE_CATEGORY_API: BASE_URL + "/staff/deleteCategory",
    TEACHER_CATEGORYPAGEDETAILS_API: BASE_URL + "/staff/categoryPageDetails",
}