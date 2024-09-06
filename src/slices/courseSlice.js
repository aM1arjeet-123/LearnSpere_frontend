import { createSlice } from "@reduxjs/toolkit";

const initialState  =  {
    step:1,
    course:null,
    editCourse:false,
    paymentLoading:false,

}

const courseSlice = createSlice({
    name:"Course",
    initialState,
    reducers:{
        setStep:(state , action)=>{
            state.step = action.payload
        },
        setEditCourse:(state , action)=>{
            state.editCourse = action.payload
        },
        setCourses: (state , action)=>{
            state.course  =action.payload
        },
        resetCourseState:(state)=>{
            state.step=1
            state.course = null
            state.editCourse = false
        },
        setPaymentLoading:(state,action)=>{
            state.paymentLoading = action.payload
        }
    }
})

export const {setStep , setEditCourse , setCourses , resetCourseState , setPaymentLoading} = courseSlice.actions;

export default courseSlice.reducer;