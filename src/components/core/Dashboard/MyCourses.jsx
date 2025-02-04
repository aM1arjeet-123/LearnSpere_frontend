import React, { useEffect, useState } from 'react'
import { VscAdd } from "react-icons/vsc";
import IconBtn from "../../Common/IconBtn"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../services/operations/courseDetails';
import CoursesTable from './InstructorCourses/CoursesTable';

const MyCourses = () => {
    const navigate = useNavigate();
    const {token }= useSelector((state)=>state.auth);
    const [courses , setCourses] = useState([]);
    const fetchCourses = async ()=>{
        const result = await fetchInstructorCourses(token);
        if(result){
            setCourses(result);
        }

    }
    useEffect(()=>{
        fetchCourses();
    },[]);




  return (
    <div>
        <div className='mb-14 flex items-center justify-between'>
            <h1 className='text-3xl font-medium text-richblack-5'>
                My Courses
            </h1>
            <IconBtn text="Add Courses" onClick={()=>navigate("/dashboard/add-courses")}>
            <VscAdd />
            </IconBtn>
        </div>
        {courses && <CoursesTable courses={courses} setCourses={setCourses}/>}
      
    </div>
  )
}

export default MyCourses
