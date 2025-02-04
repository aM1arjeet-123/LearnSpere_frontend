const BASE_URL = "https://learnspere.onrender.com/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}

// STUDENTS ENDPOINTS

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}


//  courses url

export const courseeEndpoints  ={
  EDIT_COURSE_API:BASE_URL + "/course/editCourse",
  CREATE_COURSE_API:BASE_URL + "/course/createCourse",
  COURSE_CATEGORIES_API:BASE_URL + "/course/showAllCategories",
  CREATE_SECTION_API:BASE_URL + "/course/addSection",
  UPDATE_SECTION_API:BASE_URL +"/course/updateSection",
  CREATE_SUBSECTION_API:BASE_URL + "/course/addSubSection",
  DELETE_SUBSECTION_API:BASE_URL + "/course/deleteSubSection",
  UPDATE_SUBSECTION_API:BASE_URL + "/course/updateSubSection",
  DELETE_SECTION_API:BASE_URL + "/course/deleteSection",
  GET_ALL_INSTRUCTOR_COURSES:BASE_URL +"/course/getInstructorCourses",
  DELETE_COURSE_API:BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_API:BASE_URL + "/course/getFullCourseDetails",
  GET_COURSE_DETAILS:BASE_URL +"/course/getCourseDetails",
  GET_FULL_COURSE_DETAILS_API:BASE_URL + "/course/getFullCourseDetails",
  CREATE_RATING_API:BASE_URL + "/course/createRating"

}

//  Categories Api

export const Categories = {
  CATEGORIES_API:BASE_URL + "/course/showAllCategories"
}

// catalog page data

export const catalogData = {
  CATALOG_PAGE_DATA_API: BASE_URL + "/course/getCategoryPageDetails"
}

// students endpoint

export const studentEndpoints = {
  COURSE_PAYMENT_API:BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API:BASE_URL +"/payment/verifyPayment",
  SEND_PAYMENT_SUCCESSFUL_EMAIL_API:BASE_URL + "/payment/sendPaymentSuccessEmail"
}

export const ratingsEndpoints = {
  REVIEW_DETAILS_API: BASE_URL +"/course/getReviews"
}