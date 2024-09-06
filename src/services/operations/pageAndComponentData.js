import { catalogData } from "../apis";
import {toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector";



export const getCategoryPageDetails = async(categoryId)=>{
    let result  =[];
    const toastId = toast.loading("Loading....")
    
    try{
        const response = await apiConnector("POST" , catalogData.CATALOG_PAGE_DATA_API , {
            categoryId : categoryId
        })
        console.log("Catalog page data API RESPONSE......." , response);
        if(!response?.data?.success){
            throw new Error("Could not catalog page data")
        }
        
        result = response?.data
    } catch(err){
        console.log("error in catalog page data ...." , err);
        toast.error("err.message");
        result=err.response?.data
    }

    toast.dismiss(toastId);
    return result;
}
