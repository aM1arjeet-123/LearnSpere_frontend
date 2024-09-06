import Spinner from "../../Common/Spinner";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import {getUserEnrolledCourses} from "../../../services/operations/profileAPI"
import ProgressBar from "@ramonak/react-progress-bar"


const StudentEnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading , setLoading] = useState(false);

  useEffect(()=>{
    (async()=>{
      try{
        setLoading(true);
        const res = await getUserEnrolledCourses(token);
        const filterPublicCourse = res.filter((ele)=>ele.status !=="Draft")
          setEnrolledCourses(filterPublicCourse)
          setLoading(false);
        
      }
      catch(err){
        console.log("Error in fetch user Enrolled courses" , err);
      }

    })();
  },[])

  if(loading){
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <Spinner/>
      </div>
    )
  }
  





  return (
    <div>
      <div className="text-3xl text-richblack-50">Enrolled Courses</div>
      {!enrolledCourses ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <Spinner />
        </div>
      ) : !enrolledCourses.length ? (
        <>
          <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
            You have not enrolled in any course yet
          </p>
          <div className="grid h-[10vh] w-full place-content-center ">
            <button
              type="button"
              className="p-3 w-fit flex items-center gap-x-1 font-semibold rounded-md bg-yellow-50"
              onClick={() => {
                navigate("/dashboard/cart");
              }}
            >
              Add Courses 
              <IoAdd size={20} />
            </button>
          </div>
        </>
      ) : (
        <div className="my-8 text-richblack-5">
            {/* Heading */}
            <div className="flex rounded-t-lg bg-richblack-500">
                <p className="w-[50%] px-5 py-3">Course Name</p>
                <p className="w-1/4 px-2 py-3">Duration</p>
                <p className="flex-1 px-2 py-3">Progress</p>
            </div>
            {/* course Name */}
            {console.log("Enrolled", enrolledCourses)}
            {enrolledCourses.map((course,i,arr)=>{
              return(
              <div className={`flex items-center border border-richblack-700 
                ${i===arr.length-1 ?"rounded-b-lg" :"rounded-none"}`} key={i}>
                  <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3 "
                  onClick={()=>{
                    navigate(`/view-course/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/
                      ${course.courseContent?.[0]?.subSection?.[0]?._id}`);
                  }}>
                    <img 
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-14 w-14 rounded-lg object-cover
                    "/>
                    <div className="flex max-w-xs flex-col hap-2">
                      <p className="font-semibold">{course?.courseName}</p>
                      <p className="text-xs text-richblack-300">
                        {course.courseDescription.length >50 ? `${course.courseDescription?.slice(0,50)}...`
                         : course.courseDescription}
                      </p>
                    </div>


                    </div>
                    <div className="w-1/4 px-2 ml-16 py-3">{course?.totalDuration}</div>
                    <div className="flex w-1/5 -translate-x-3 flex-col gap-2 px-2 py-3">
                    <p >Progress:{course.progressPercentage || 0}%</p>
                    <ProgressBar 
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}/>
                    
                    </div>

                  </div>
              )
            })}



        </div>
      )}
    </div>
  );
};

export default StudentEnrolledCourses;
