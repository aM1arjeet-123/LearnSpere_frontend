import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import GetAvgRating from '../../../../utils/avgrating';
import {FaStar} from "react-icons/fa"
import ReactStars from "react-rating-stars-component"
import { RiDeleteBin6Line } from "react-icons/ri";
import {removeFromCart} from "../../../../slices/cartSlice"

const RenderCartCourse = () => {
  const {cart} = useSelector((state)=>state.cart);
  const dispatch = useDispatch();
  const [rating , setRating] = useState(0);

  
  return (
    <div className='flex flex-1 flex-col'>
    
      {cart.map((course,index)=>{
        return (
        <div className={`flex w-full flex-wrap items-center justify-between gap-6
          ${index !== cart.length-1 && "border-b border-b-richblack-400 pb-6"} ${index !==0 && "mt-6"}`}>
            <div className='flex flex-1 flex-col gap-4 xl:flex-row'>
              <img
              src={course?.thumbnail}
            alt={course?.courseName}
            className='h-[148px] w-[220px] rounded-lg object-cover'/>
            <div className='flex flex-col space-y-1'>
              <p className='text-lg font-medium text-richblack-5'>
                {course?.courseName}
              </p>
              <p className='text-sm text-richblack-300'>Category: {course?.category?.name}</p>
              <p className='text-sm text-richblack-200'>{course?.courseDescription?.length >80 ? `${course?.courseDescription?.slice(0,80)}...`
              : course?.courseDescription}</p>
              <div className='flex items-center gap-2'>
                {console.log(course)}
                <span className='text-yellow-5'>{GetAvgRating(course?.ratingAndReviews)}</span>
                <ReactStars
                count={5}
                value={course?.ratingAndReviews?.length}
                size={20}
                edit={false}
                activeColor="#ffd700"
                emptyIcon={<FaStar/>}
                fullIcon={<FaStar/>}
                />
                <span className='text-richblack-400'>
                  {course?.ratingAndReviews?.length} Ratings
                </span>
              </div>
            </div>
            </div>
            <div className='flex flex-col items-end space-y-2'>
              <button onClick={()=>{
                console.log(course._id)
                dispatch(removeFromCart(course._id))}}
              className='flex items-center
               gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200'>
                <RiDeleteBin6Line />
                <span>Remove</span>
               </button>
               <p className='mb-6 text-3xl font-medium text-yellow-100'>
                ₹ {course?.price}
               </p>
            </div>


            </div>
        )
      })}
      
    </div>
  )
}

export default RenderCartCourse
