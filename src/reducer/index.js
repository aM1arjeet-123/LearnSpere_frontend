import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"

import profileReducer from "../slices/profileSlice"
import courseReducer from "../slices/courseSlice"
import cartSlice from "../slices/cartSlice"
import viewSlice from "../slices/viewSlice"


const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  course: courseReducer,
  cart:cartSlice,
  viewCourse:viewSlice
 
})

export default rootReducer
