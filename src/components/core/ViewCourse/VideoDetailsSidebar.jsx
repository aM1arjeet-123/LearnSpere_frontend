import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import IconBtn from '../../Common/IconBtn';
import { BsChevronDown } from "react-icons/bs";

const VideoDetailsSidebar = ({setReviewModal}) => {
    const [activeStatus , setActiveStatus] = useState("")
    const [videoBarActive , setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const {sectionId , subSectionId} = useParams();
    const {courseSectionDate,courseEntireDate,totalNoOfLecture,completedLecture

    } = useSelector((state)=>state.viewCourse)

    useEffect(()=>{
        (()=>{
            console.log("hi" , sectionId.length)
            if(!courseSectionDate.length) return

            const currentSectionIndex = courseSectionDate.findIndex((data)=>data._id === sectionId)
            const currentSubSectionIndex = courseSectionDate?.[currentSectionIndex]?.subSection?.findIndex((data)=>data._id=== subSectionId)

            const activeSubSectionId = courseSectionDate[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id

            setActiveStatus(courseSectionDate?.[currentSectionIndex]?._id)
            setVideoBarActive(activeSubSectionId)
        })()
    },[courseSectionDate , courseEntireDate , location.pathname])

    




  return (
    <div className='flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px]  flex-col border-r-[1px]
    border-r-richblack-700 bg-richblack-800'>
        <div className='mx-5 flex flex-col font-bold items-start justify-between gap-2 gap-y-4 border-b
        border-richblack-600 py-5 text-lg text-richblack-25'>
            <div className='flex w-full items-center justify-between'>
                <div onClick={()=>{
                    navigate("/dashboard/enrolled-courses")
                }}
                className='flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 
                p-1 text-richblack-700 hover:scale-90' title='back'>
                    <IoIosArrowBack />

                </div>
                <IconBtn 
                text="Add Review"
                customClasses="ml-auto"
                onClick={()=>setReviewModal(true)}/>
            </div>
            <div className='flex flex-col'>
                <p>{courseEntireDate?.courseName}</p>
                <p className='text-sm font-semibold text-richblack-500'>
                    {completedLecture?.length} / {totalNoOfLecture}
                </p>
            </div>
        </div>

        <div className='h-[calc(100vh-3.5rem)] overflow-y-auto'>
            {courseSectionDate.map((course,index)=>{
                return (
                    <div className='mt-2 cursor-pointer text-sm text-richblack-5'
                    onClick={()=>setActiveStatus(course?._id)} key={index}>
                        {/* section  */}
                       
                        <div className='flex flex-row justify-between bg-richblack-600 
                        px-5 py-4'>
                            <div className='w-[60%] font-semibold'>
                                {course?.sectionName}
                            </div>
                            <div className='flex items-center gap-2'>
                                Lession {course?.subSection?.length}
                                <span className={`${activeStatus === course?._id ? "rotate-0" : "rotate-180"} 
                            transition-all duration-500`}>
                                <BsChevronDown />
                            </span>
                            </div>
                          

                            </div>
                            {/* sub section */}

                            {activeStatus === course?._id && (
                                
                                <div className='transition-[height] duration-1000 ease-in-out'>
                                   
                                    {course?.subSection?.map((topic , i)=>{
                                        return (
                                        <div 
                                        key={i}
                                        onClick={()=>{
                                            setVideoBarActive(topic._id)
                                            navigate(`/view-course/${courseEntireDate?._id}/section/
                                                ${course?._id}/sub-section/${topic?._id}`)
                                               
                                        }}
                                        
                                        className={`flex gap-3 px-5 py-2 ${
                                            videoBarActive === topic._id ?
                                            "bg-yellow-200 font-semibold text-richblack-800" :
                                            "hover:bg-richblack-800"
                                        }`}>
                                            {console.log("hello")}

                                            <input 
                                            type="checkbox"
                                            checked={completedLecture.includes(topic?._id)}
                                            onChange={()=>{}}/>
                                            {topic.title}


                                            </div>
                                        )
                                    })}
                                </div>
                            )}

                    </div>
                )
            })}
        </div>


      
    </div>
  )
}

export default VideoDetailsSidebar
