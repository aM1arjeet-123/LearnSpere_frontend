import { createSlice } from "@reduxjs/toolkit"
import {toast} from "react-hot-toast"


const initialState = {
    cart:localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) :[],
    total:localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) :0,
    totalItems:localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) :0,

}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state, action)=>{
            const course = action.payload
            const index = state.cart.findIndex((item)=>item._id === course._id)
            if(index>=0){
                // if the course is already in the cart , do not modify the quantity
                toast.error("Course already in Cart")
                return

            }
            // if course is not in thhe cart , add it to the cart
            state.cart.push(course);
            // update the total quantity
            state.total+=course.price
            state.totalItems++
            // update the local storage
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("total",JSON.stringify(state.total))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
            // show toast
            toast.success("Course added to Cart")

        },
        removeFromCart:(state,action)=>{
            const course = action.payload
          
     
            const index = state.cart.findIndex((item)=>item._id === course)
          
         
         
            if(index>=0){
                state.cart.splice(index,1);
                // update the total quantity
                state.total-=state.cart[index]?.price
                console.log(state.total)
                state.totalItems--
                // update the local storage
                localStorage.setItem("cart",JSON.stringify(state.cart))
                localStorage.setItem("total",JSON.stringify(state.total))
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
                // show toast
                toast.success("Course removed from Cart")

            }

        },
        resetCart:(state)=>{
            state.cart=[]
            state.total=0
            state.totalItems=0;
            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems")
        }


    }
})

export const {addToCart , removeFromCart , resetCart} = cartSlice.actions
export default cartSlice.reducer