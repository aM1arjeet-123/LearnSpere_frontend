import React, { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'
import {setCompletedLecture , setCourseSectionDate , setTotalNoOfLecture,
    setEntireCourseDate
} from "../slices/viewSlice"
import { useDispatch, useSelector } from 'react-redux'
import {getFullDetailsOfCourse} from "../services/operations/courseDetails"

const ViewCourse = () => {
    const {courseId}=useParams()
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch()
    const [reviewModal , setReviewModal] = useState(false)
    useEffect(()=>{
        (async ()=>{
       
            const courseData = await getFullDetailsOfCourse(courseId, token);
          
            dispatch(setCourseSectionDate(courseData.courseDetails.courseContent))
            dispatch(setEntireCourseDate(courseData.courseDetails))
            dispatch(setCompletedLecture(courseData.completedVideos))
            let lecture = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec)=>{
                lecture+=sec.subSection.length
            })
            dispatch(setTotalNoOfLecture(lecture))
        })()
    },[])




  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
        <VideoDetailsSidebar setReviewModal={setReviewModal}/>
        <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
            <div className='mx-6'>
                <Outlet/>
            </div>
        </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
      
    </div>
  )
}

export default ViewCourse
