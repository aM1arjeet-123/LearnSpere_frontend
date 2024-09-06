import React from 'react'
import { Swiper , SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper';
import Coursecard from './Coursecard';

const CourseSlider = ({courses}) => {
  return (
    <div>{
        courses?.length ? (
            <Swiper 
            slidesPerView={1}
            spaceBetween={25}
            loop={true}
            modules={[FreeMode , Pagination]}
            breakpoints={{
                1024:{
                    slidesPerView:3,
                }
            }}
            className='max-h-[30rem]'>
                {courses?.map((course , index)=>{
                    return(
                        <SwiperSlide key={index}>
                            <Coursecard course={course} Height={"h-[250px"}/>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        ):(
            <p className='text-xl text-richblack-5'>No Courses Found</p>
        )
        
        
        
        }
      

      
    </div>
  )
}

export default CourseSlider
