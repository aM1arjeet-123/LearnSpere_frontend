import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import Upload from "../CourseInformation/Upload"
import IconBtn from '../../../../Common/IconBtn';
import { setCourses } from '../../../../../slices/courseSlice';
import {toast} from "react-hot-toast"
import { createSubSection , updateSubSection } from '../../../../../services/operations/courseDetails';
import { setStep } from '../../../../../slices/courseSlice';


const SubSectionModal = ({
    modalData,
    setModalData,
    add=false,
    view=false,
    edit=false,
}) => {

    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
        getValues
    } = useForm();
console.log("add" , add);
console.log("edit" , edit);
console.log("view" , view);

    const dispatch = useDispatch();
    const [loading , setLoading] = useState(false);
    const {token }= useSelector((state)=>state.auth);
    const {course} = useSelector((state)=>state.course);
    

    useEffect(()=>{
        if(view || edit){
            setValue("lectureTitle" , modalData.title);
            setValue("lectureDesc" , modalData.description);
            setValue("lectureVideo" , modalData.videoUrl);
        }
    },[])

    const isFormUpdated = ()=> {
        const currentValues = getValues();

        if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl

        ){
            return true;
        }
        return false;
    }

    //  handle the editing of subsection

    const handleEditSubsection = async ()=>{
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId" , modalData.sectionId);
        formData.append("subSectionId" , modalData._id)
        if( currentValues.lectureDesc !== modalData.description){
            formData.append("description" , currentValues.lectureDesc);
        }
        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title" , currentValues.lectureTitle);
        }
        if( currentValues.lectureVideo !== modalData.videoUrl){
            formData.append("video" , currentValues.lectureVideo);
        }
        setLoading(true);
        const result =  await updateSubSection(formData , token);
        if(result){
            const updataedCourseContent = course.courseContent.map((section)=>
            section._id === modalData.sectionId ? result : section)
            const updateCourse = {...course , courseContent:updataedCourseContent};
        dispatch(setCourses(updateCourse))
        }
        setModalData(null);
        setLoading(false);
        

    }


    const onSubmit = async (data)=>{
        if(view) return

        if(edit){
            if(!isFormUpdated()){
                toast.error("No changes made to the form")
            }
            else{
                handleEditSubsection();
            }
            return 
        }
        const formData = new FormData();

        formData.append("sectionId" , modalData);
     
            formData.append("description" , data.lectureDesc);
    
            formData.append("title" , data.lectureTitle);
     
            formData.append("video" , data.lectureVideo);
        
        setLoading(true);
        const result =  await createSubSection(formData , token);
        if(result){
            const updataedCourseContent = course.courseContent.map((section)=>
            section._id === modalData ? result : section)
            const updateCourse = {...course , courseContent:updataedCourseContent};
            
        dispatch(setCourses(updateCourse))
       
        }
        setModalData(null);
        setLoading(false);

    }


  return (
    <div className='fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center
    overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800'>
        {/* Modal Header */}

        <div className=' flex items-center justify-between rounded-t-lg bg-richblack-700
        p-r'>
            <p className=' text-xl font-semibold text-richblack-5'>
                {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
            </p>
            <button onClick={()=>(!loading ? setModalData(null) : {})}>
                <RxCross2 className='text-2xl text-richblack-5'></RxCross2>
            </button>
        </div>

        {/* Modal Form */}

        <form className='space-y-8 px-8 py-10' onSubmit={handleSubmit(onSubmit)}>
            {/* Lecture Video upload */}
            <Upload 
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit? modalData.videoUrl : null}/>

            {/* Lecture Title */}
            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5' htmlFor='lectureTitle'>
                    Lecture Title <span className='text-pink-200'>*</span>
                </label>
                <input 
                disabled={view || loading}
                id="lectureTitle"
                placeholder="Enter Lecture Title"
                {...register("lectureTitle" , {required:true})}
                className='form-style w-full'

                />
                {errors.lectureTitle && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>Lecture Title is required</span>
                )}
            </div>
            {/* Lecture description */}
            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5' htmlFor='lectureDesc'>
                    Lecture Description <span className='text-pink-200'>*</span>
                </label>
                <textarea 
                disabled={view || loading}
                id="lectureDesc"
                placeholder="Enter Lecture Description"
                {...register("lectureDesc" , {required:true})}
                className='form-style resize-x-none min-h-[130px] w-full'

                />
                {errors.lectureDesc && (
                    <span className='ml-2 text-xs tracking-wide text-pink-200'>Lecture Description is required</span>
                )}
            </div>
            {!view && (
                <div className='flex justify-end'>
                    <IconBtn
                    disabled={loading}
                    text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}/>
                </div>
            )}

        </form>
        
        </div>
      
    </div>
  )
}

export default SubSectionModal
