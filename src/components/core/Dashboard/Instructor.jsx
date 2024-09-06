import React, { useState , useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorMyDashboard/InstructorChart";
import {fetchInstructorCourses} from "../../../services/operations/courseDetails"
import {getInstructorData} from "../../../services/operations/profileAPI"
import Spinner from "../../Common/Spinner";


const Instructor = ()=>{
    const {user}  =useSelector((state)=>state.profile);
    const {token } =useSelector((state)=>state.auth);
    const [loading , setLoading] = useState(false);
    const [instructorData , setInstructorData] = useState(null);
    const [course , setCourse]  = useState([]);

    useEffect(()=>{
        ;(async()=>{
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);
            if(instructorApiData){
                setInstructorData(instructorApiData);
                console.log("instruxctcsh" , instructorApiData);
            }
            if(result){
                setCourse(result);
            }
            
            setLoading(false)
        })()
    },[])





    const totalAmount = instructorData?.reduce(
        (acc , curr)=> acc+curr.totalAmountGenerated,
        0
    )

    const totalStudents = instructorData?.reduce(
        (acc , curr)=>acc + curr. totalStudentsEnrolled
         ,0
    )

    



    return (
        <div >
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-richblack-5">
                    Hi {user?.firstName}

                </h1>
                <p className="font-medium text-richblack-200">
                    Let's start something new
                </p>
                {loading ? (<div className="w-full h-[80vh] mb-10 flex items-center justify-center"><Spinner/></div>) :
                course.length>0 ? (<div>
                    <div className="my-4 flex h-[450px] space-x-4">
                        {/* Render chart / graph */}
                        {totalAmount >0 || totalStudents >0 ? (
                            <InstructorChart instructorData = {instructorData}/>
                        ): (
                            <div className="flex-1 rounded-md bg-richblack-800 p-6">
                            <p className="text-lg font-bold text-richblack-5">Visualize</p>
                            <p className="mt-4 text-xl font-medium text-richblack-50">Not Enough Data To Visualize</p>
    
                        </div>
                        )}
                        {/* Total Statistic */}

                        <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
                            <p className="text-lg font-bold text-richblack-5">Statistics</p>
                            <div className=" mt-4 space-y-4">
                                <div>
                                    <p className="text-lg text-richblack-200">Total Courses</p>
                                    <p className="text-3xl font-semibold text-richblack-50">
                                        {course.length}
                                    </p>
                                </div>
                                <div>
                                    
                                <p className="text-lg text-richblack-200">Total Students</p>
                                    <p className="text-3xl font-semibold text-richblack-50">
                                        {!totalStudents  ? "0" : totalStudents}
                                    </p>
                                    
                                </div>
                                <div>
                                    
                                <p className="text-lg text-richblack-200">Total Amount</p>
                                    <p className="text-3xl font-semibold text-richblack-50">
                                        Rs. {!totalAmount  ? "0" : totalAmount}
                                    </p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-md bg-richblack-800 p-6">
                        {/* Render 3 courses for more click on view All */}
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-richblack-5">Your Courses</p>
                            <Link to="/dashboard/my-courses">
                            <p className="text-xs font-semibold text-yellow-50">View All</p></Link>
                        </div>
                        <div className="my-4 flex items-center space-x-6">
                            {course.slice(0,3).map((cou)=>{
                                return (
                                    <div key={cou._id} className="w-1/3 border-2 rounded-md border-richblack-700 p-2">
                                        <img src={cou.thumbnail}
                                        alt={cou.courseName}
                                        className="h-[210px]  w-full rounded-md object-cover"/>
                                        <div className="mt-3 w-full">
                                            <p className="text-sm font-medium text-richblack-25">
                                                {cou.courseName}
                                            </p>
                                            <div className="mt-1 flex items-center space-x-2">
                                                {console.log(cou)}
                                                <p className="text-xs font-medium text-richblack-300">
                                                    { !cou.studentsEnroled  ? "0" :cou.studentsEnroled.length} students
                                                </p>
                                                <p className="text-xs font-medium text-richblack-300">|</p>
                                                <p className="text-xs font-medium text-richblack-300">
                                                    Rs. {cou.price}
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    

                </div>)
                : (
                    <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
                        <p className=" text-center text-2xl font-bold text-richblack-5">
                            You have not created any courses  yet
                        </p>
                        <Link to="/dashboard/add-courses">
                        <p className=" mt-1 text-center text-lg font-semibold text-yellow-50">
                            Create a courses
                        </p>
                        
                        </Link>
                    </div>
                   
                )
                }
            </div>
            
            
       
        </div>
    )
};

export default Instructor;