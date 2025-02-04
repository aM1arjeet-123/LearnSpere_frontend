import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgrating';
import RatingStars from '../../Common/RatingStars';

const Coursecard = ({course,Height}) => {
    
    const [avgReviewCount , setAvgReviewCount] = useState(0);
    console.log(course)
    useEffect(()=>{
        const count  = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);

    },[course])

  return (
    <div>
        <Link to={`/courses/${course._id}`}>
        <div className='border-2 border-richblack-700 p-2 rounded-md'>
            <div className='rounded-lg'>
                <img src={course?.thumbnail}
                alt="course thumbnail"
                className={`${Height} w-full rounded-xl object-cover`}/>
            </div>
            <div className='flex flex-col gap-2 px-1 py-3'>
                <p className='text-xl text-richblack-5'>{course?.courseName}</p>
                <p className='text-sm text-richblack-50'>
                   Instructor:  {course?.instructor?.firstName}{" "}{course?.instructor?.lastName}
                </p>
                <div className='flex items-center gap-2'>
                    <span className='text-yellow-5'>{avgReviewCount || 0}</span>
                    <RatingStars Review_Count = {avgReviewCount}/>
                    <span className='text-richblack-400'>
                        {course?.ratingAndReviews?.length} Ratings
                    </span>
                </div>
                <p className='text-xl text-richblack-5'>Rs. {course?.price}</p>
            </div>
        </div>
        
        
        </Link>
      
    </div>
  )
}

export default Coursecard
