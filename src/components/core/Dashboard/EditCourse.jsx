import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Spinner from "../../Common/Spinner"
import { setCourses , setEditCourse } from '../../../slices/courseSlice';
import { getFullDetailsOfCourse } from '../../../services/operations/courseDetails';

import RenderSteps from "../Dashboard/AddCourses/RenderSteps"

const EditCourse = () => {
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course}= useSelector((state)=>state.course);
    const [loading , setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);

    useEffect(()=>{
        (async()=>{
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId , token);
            if(result?.courseDetails){
                dispatch(setEditCourse(true));
                dispatch(setCourses(result?.courseDetails))
            }
            setLoading(false);
        })()
    },[])





    if(loading){
        return(
            <div className='grid flex-1 place-items-center'>
                <Spinner/>
            </div>
            
        )
    }

  return (
    <div>
        <h1 className='mb-14 text-3xl font-medium text-richblack-5'>
            Edit Course
        </h1>
        <div className='mx-auto max-w-[600px]'>
            {course ? (
                <RenderSteps/>
            ):(
                <p className='mt-14 text-center text-3xl font-semibold text-richblack-100'>
                    Course Not Found
                </p>
            )}
        </div>
      
    </div>
  )
}

export default EditCourse
