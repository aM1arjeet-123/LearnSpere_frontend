import React, { useEffect, useState } from 'react'
import { apiConnector } from "../../services/apiConnector"
import { ratingsEndpoints } from '../../services/apis';

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
import { Autoplay, FreeMode, Pagination } from "swiper"
import { FaStar } from "react-icons/fa"
import ReactStars from "react-rating-stars-component"

const ReviewSlider = () => {
    const [review, setReview] = useState([]);
    const TRUNCATE_WORD = 15;

    useEffect(() => {
        (async () => {
            const data = await apiConnector("GET", ratingsEndpoints.REVIEW_DETAILS_API)
            if (data?.data?.success) {
                setReview(data?.data?.data)
            }
        })();
    }, [])

    return (
        <div className='text-white '>
            <div className='my-[50px] h-[184px] bg-richblack-900 max-w-maxContentTab lg:max-w-maxContent'>
                {review.length > 0 && (
                    <Swiper
                        slidesPerView={2}
                        spaceBetween={30}
                        loop={true}  // Enables continuous looping
                        loopedSlides={review.length}  // Dynamically loop over all slides
                        loopFillGroupWithBlank={true}  // Fills groups with blank if there are fewer slides
                        freeMode={true}
                        autoplay={{
                            delay: 1500,  // Sets the autoplay delay to 2.5 seconds
                            disableOnInteraction: false  // Ensures autoplay continues even after interaction
                        }}
                        modules={[FreeMode, Pagination, Autoplay]}
                        className='w-full'
                    >
                        {review.map((re, i) => (
                            <SwiperSlide key={i}>
                                <div className='flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25'>
                                    <div className='flex items-center gap-4'>
                                        <img
                                            src={
                                                re?.user?.image ? re?.user?.image :
                                                `https://api.dicebear.com/5.x/initials/svg?seed=${re?.user?.firstName}${re?.user?.lastName}`
                                            }
                                            alt=""
                                            className='h-9 w-9 rounded-full object-cover'
                                        />
                                        <div className='flex flex-col'>
                                            <h1 className='font-semibold text-richblack-5'>
                                                {`${re?.user?.firstName} ${re?.user?.lastName}`}
                                            </h1>
                                            <h2 className='text-[12px] font-medium text-richblack-500'>
                                                {re?.course?.courseName}
                                            </h2>
                                        </div>
                                    </div>
                                    <p className='font-medium text-richblack-25'>
                                        {re?.review?.split(" ").length > TRUNCATE_WORD ?
                                            `${re?.review.split(" ").slice(0, TRUNCATE_WORD).join(" ")}...`
                                            : `${re?.review}`}
                                    </p>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-semibold text-yellow-100'>
                                            {re?.rating.toFixed(1)}
                                        </h3>
                                        <ReactStars
                                            count={5}
                                            value={re.rating}
                                            size={20}
                                            edit={false}
                                            activeColor="#ffd700"
                                            emptyIcon={<FaStar />}
                                            fullIcon={<FaStar />}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    )
}

export default ReviewSlider;
