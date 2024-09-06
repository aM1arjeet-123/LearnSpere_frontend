import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    courseSectionDate:[],
    courseEntireDate:[],
    completedLecture:[],
    totalNoOfLecture:0
}

const veiwSlice = createSlice({
    name:"viewCourse",
    initialState:initialState,
    reducers:{
        setCourseSectionDate:(state, action)=>{
            state.courseSectionDate = action.payload
        },
        setEntireCourseDate:(state, action)=>{
            state.courseEntireDate = action.payload
        },
        setTotalNoOfLecture:(state,action)=>{
            state.totalNoOfLecture = action.payload
        },
        setCompletedLecture:(state,action)=>{
            state.completedLecture = action.payload
        },
        updateCompleteLecture:(state, action)=>{
            state.completedLecture  = action.payload
        }
    }
})

export const{setCompletedLecture , setCourseSectionDate , setEntireCourseDate , setTotalNoOfLecture
    , updateCompleteLecture
} = veiwSlice.actions

export default veiwSlice.reducer