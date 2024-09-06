import {toast} from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { studentEndpoints } from "../apis"
import { setPaymentLoading } from "../../slices/courseSlice"
import {resetCart} from "../../slices/cartSlice"
import rzpLogo from "../../assets/Logo/rzp_logo.png"


const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESSFUL_EMAIL_API

} = studentEndpoints;

// load the Razorpay sdk from the cdn

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src=src
        script.onload = ()=>{
            resolve(true)
        }
        script.onerror = ()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

// Buy the courses

export async function BuyCourse (
    token ,
    courses,
    user_details,
    navigate,
    dispatch
){
    const toastId = toast.loading("Loadong...")
  
    
   
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        if(!res){
            toast.error("Razorpay SDK failed to load. Check your Internat connention")
            return
        }
        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,{courses},{
            Authorization:`Bearer ${token}`
        })
        if(!orderResponse){
            throw new Error(orderResponse.data.message)

        }
        console.log("hello 2", orderResponse)

// opening the razorpay SDK
        const options ={
            key:process.env.REACT_APP_RAZORPAY_KEY,
            currency:orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description:"Thank you for purchasing the course.",
            image:rzpLogo,
            prefill:{
                name:`${user_details.firstName} ${user_details.lastName}`,
                email:user_details.email,
            },
            handler:function(response){
                sendPaymentSuccessEmail(response , orderResponse.data.data.amount, token)
                verifyPayment({...response,courses}, token ,navigate , dispatch)
            }
           

        }
        const paymentObject = new window.Razorpay(options);

        paymentObject.on("payment.failed" , function(response){
            toast.error("Oops! payment Failed")

        })
        paymentObject.open();
        console.log(paymentObject);



        console.log("hello 3 ",  options , orderResponse)
    }
    catch(err){
        console.log("could not make payment" , err);
                toast.error("could not make payments")
              
    }
    toast.dismiss(toastId);
    
    // initiate the order in Backend
   
}

 async function verifyPayment (
    bodyData,
    token,
    navigate,
    dispatch
){
    const toastId = toast.loading("Loadong...")
    dispatch(setPaymentLoading(true));
    try{
       
        const Response = await apiConnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorization:`Bearer ${token}`
        })
        if(!Response.data.success){
            throw new Error(Response.data.message)

        }
        toast.success("Payment Successful. You are added to the course")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())

    }
    catch(err){
                toast.error("could not verify payment")
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
 
   
}
//  send the Payment successful

async function sendPaymentSuccessEmail (
   response,
   amount,
   token
){
 
   
    try{
       
         await apiConnector("POST",SEND_PAYMENT_SUCCESSFUL_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razopay_payment_id,
            amount
         },{
            Authorization:`Bearer ${token}`
        })
      
    }
    catch(err){
                console.log("payment success email error..." , err)
    }

    // initiate the order in Backend
   
}
