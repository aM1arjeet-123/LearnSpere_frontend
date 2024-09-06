import {toast} from "react-hot-toast"
import {apiConnector} from "../apiConnector"
import { courseeEndpoints } from "../apis"

const {
    EDIT_COURSE_API,
    CREATE_COURSE_API,
    COURSE_CATEGORIES_API,
    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    CREATE_SUBSECTION_API,
    DELETE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_API,
    GET_COURSE_DETAILS,
    CREATE_RATING_API

} = courseeEndpoints;

//  get course details

export const fetchCourseDetails = async (courseId) =>{
    let result  =null;
    const toastId = toast.loading("Loading....")
    console.log("hello ji" ,courseId)
   
    try{
        const response = await apiConnector("POST" , GET_COURSE_DETAILS , {courseId}
         )
        console.log("FETCH COURSE DETAILS API RESPONSE......." , response);
        if(!response?.data){
            throw new Error(response.data.message)
        }
       
        result = response?.data?.data
    } catch(err){
        console.log("error in uploading courses details ...." , err);
        result=err.response.data
    }

    toast.dismiss(toastId);
    return result;
}






//  add course details

export const addCourseDetails = async (data , token) =>{
    let result  =null;
    const toastId = toast.loading("Loading....")
    console.log(data, token , CREATE_COURSE_API);
    try{
        const response = await apiConnector("POST" , CREATE_COURSE_API , data,{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`,
        })
        console.log("CREATE COURSE API RESPONSE......." , response);
        if(!response?.data?.success){
            throw new Error("Could not Add course details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    } catch(err){
        console.log("error in uploading courses details ...." , err);
        toast.error("err.message");
    }

    toast.dismiss(toastId);
    return result;
}

export const editCourseDetails = async (data , token )=>{
    let result  =null;
    const toastId = toast.loading("Loading....")
    try{
        const response = await apiConnector("POST" , EDIT_COURSE_API , data,{
            "Content-Type":"multipart/form-data",
            Authorization:`Bearer ${token}`,
        })
        console.log("Edit COURSE API RESPONSE......." , response);
        if(!response?.data?.success){
            throw new Error("Could not Edit course details")
        }
        toast.success("Course Details Edited Successfully")
        result = response?.data?.data
    } catch(err){
        console.log("error in editing courses details ...." , err);
        toast.error("err.message");
    }

    toast.dismiss(toastId);
    return result;

}

export const fetchCourseCategories = async ()=>{
    let result  = [];
  
    try{
        const response = await apiConnector("GET" , COURSE_CATEGORIES_API )
       
        if(!response?.data?.success){
            throw new Error("Could not get course category ")
        }
       
        result = response?.data?.data
    } catch(err){
        console.log("error in  courses category  details ...." , err);
        toast.error("err.message");
    }

   
    return result;
}

export const createSection = async (data , token)=>{
    let result  =null;
    const toastId = toast.loading("Loading....")
    try{
        const response = await apiConnector("POST" , CREATE_SECTION_API , data,{
     
            Authorization:`Bearer ${token}`,
        })
        console.log("Create Section API RESPONSE......." , response);
        if(!response?.data?.success){
            throw new Error("Could not Create ssection")
        }
        toast.success("Section created Successfully")
        result = response?.data?.updatedCourse
    } catch(err){
        console.log("error in section creation ...." , err);
        toast.error("err.message");
    }

    toast.dismiss(toastId);
    return result;
}
export const updateSection = async (data , token)=>{
    let result  =null;
    const toastId = toast.loading("Loading....")
    try{
        const response = await apiConnector("POST" , UPDATE_SECTION_API , data,{
     
            Authorization:`Bearer ${token}`,
        })
        console.log("Update Section API RESPONSE......." , response);
        if(!response?.data?.success){
            throw new Error("Could not Update ssection")
        }
        toast.success("Section updated Successfully")
        result = response?.data?.data
    } catch(err){
        console.log("error in section updation ...." , err);
        toast.error("err.message");
    }

    toast.dismiss(toastId);
    return result;
}

export const createSubSection = async (data , token)=>{
    let result  =null;
    const toastId = toast.loading("Loading....")
    console.log(data , token)
    try{
        const response = await apiConnector("POST" , CREATE_SUBSECTION_API , data,{
     
            Authorization:`Bearer ${token}`,
        })
        console.log("Create Sub Section API RESPONSE......." , response);
        if(!response?.data?.success){
            throw new Error("Could not Created sub section")
        }
        toast.success("SubSection created Successfully")
        result = response?.data?.data
    } catch(err){
        console.log("error in Subsection creation ...." , err);
        toast.error("err.message");
    }

    toast.dismiss(toastId);
    return result;
}

export const updateSubSection = async (data , token)=>{
    let result  =null;
    const toastId = toast.loading("Loading....")
    try{
        const response = await apiConnector("POST" , UPDATE_SUBSECTION_API , data,{
     
            Authorization:`Bearer ${token}`,
        })
        console.log("Update SubSection API RESPONSE......." , response);
        if(!response?.data?.success){
            throw new Error("Could not Update Subsection")
        }
        toast.success("SubSection updated Successfully")
        result = response?.data?.data
    } catch(err){
        console.log("error in SUbsection updation ...." , err);
        toast.error("err.message");
    }

    toast.dismiss(toastId);
    return result;
}

export const deleteSection = async (data , token)=>{
    let result  =null;
    const toastId = toast.loading("Loading....")
    try{
        const response = await apiConnector("POST" , DELETE_SECTION_API , data,{
     
            Authorization:`Bearer ${token}`,
        })
        console.log("Delete Section API RESPONSE......." , response);
        if(!response?.data?.success){
            throw new Error("Could not Delete section")
        }
        toast.success("Section deleted Successfully")
        result = response?.data?.data
    } catch(err){
        console.log("error in section deletion ...." , err);
        toast.error("err.message");
    }

    toast.dismiss(toastId);
    return result;
}

export const deleteSubSection = async (data , token)=>{
    let result  =null;
    const toastId = toast.loading("Loading....")
    try{
        const response = await apiConnector("POST" , DELETE_SUBSECTION_API , data,{
     
            Authorization:`Bearer ${token}`,
        })
        console.log("DELETE Sub Section API RESPONSE......." , response);
        if(!response?.data?.success){
            throw new Error("Could not delete sub section")
        }
        toast.success("SubSection delete Successfully")
        result = response?.data?.data
    } catch(err){
        console.log("error in Subsection deletion ...." , err);
        toast.error("err.message");
    }

    toast.dismiss(toastId);
    return result;
}

export const fetchInstructorCourses = async (token)=>{
    let result  = [];
    const toastId = toast.loading("Loading....")
    try{
        const response = await apiConnector("GET" , GET_ALL_INSTRUCTOR_COURSES , null,{
     
            Authorization:`Bearer ${token}`,
        })
        console.log("Get Instructor courses API RESPONSE......." , response);
        if(!response?.data?.success){
            throw new Error("Could not get Instructor Courses")
        }
       
        result = response?.data?.data
    } catch(err){
        console.log("error in get Instructor Courses ...." , err);
        toast.error("err.message");
    }

    toast.dismiss(toastId);
    return result;
}

export const deleteCourse = async (data , token)=>{
  
    const toastId = toast.loading("Loading....")
    try{
        const response = await apiConnector("DELETE" , DELETE_COURSE_API , data,{
     
            Authorization:`Bearer ${token}`,
        })
        console.log("DELETE Course API RESPONSE......." , response);
        if(!response?.data?.success){
            throw new Error("Could not delete course")
        }
        toast.success("Course delete Successfully")
        
    } catch(err){
        console.log("error in Course deletion ...." , err);
        toast.error("err.message");
    }

    toast.dismiss(toastId);
  
}

export const getFullDetailsOfCourse = async (courseId , token)=>{
  
    const toastId = toast.loading("Loading....")
    let result = null;
    try{
        const response = await apiConnector("POST" , GET_FULL_COURSE_DETAILS_API , {courseId},{
     
            Authorization:`Bearer ${token}`,
        })
        console.log("Course full details API RESPONSE......." , response);
        if(!response?.data?.success){
            throw new Error(response.data.message)
        }
        result = response?.data?.data
    
        
    } catch(err){
        console.log("error in get all course details ...." , err);
        toast.error("err.message");
        result = err.response.data
    }

    toast.dismiss(toastId);
    return result;
  
}

export const createRating = async (data , token)=>{
  
    const toastId = toast.loading("Loading....")
    let success=false;
    try{
        const response = await apiConnector("POST" , CREATE_RATING_API , data,{
     
            Authorization:`Bearer ${token}`,
        })
        console.log("Course ratin  API RESPONSE......." , response);
        if(!response?.data?.success){
            throw new Error("Could not create rating")
        }
        toast.success("Rating created")
        success=true
        
    
        
    } catch(err){
        console.log("error in get all course details ...." , err);
        toast.error("err.message");
        
        success=false
    }

    toast.dismiss(toastId);
    return success;
  
}




