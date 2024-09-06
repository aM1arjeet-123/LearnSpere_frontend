import React , {useEffect, useState} from 'react'
import {MdClose} from "react-icons/md"
import { useSelector } from 'react-redux';




const ChipInput = ({label , name , placeholder , register , error , setValue, getValues}) => {
    const [chips , setChips] = useState([]);
    const {editCourse , course} = useSelector((state)=>state.course);

    useEffect(()=>{
        if(editCourse){
            setChips(course?.tag);
        }
        register(name,{required:true , validate:(value)=>value.length >0})
    },[])

    useEffect(()=>{
        setValue(name, chips);
        
    },[chips]);

    // function to handle user input when chips are added

    const handleKeyDown = (e)=>{
        // check user press enter or ,
        if(e.key === "Enter" || e.key ===","){
            e.preventDefault();
            const chipValue = e.target.value.trim();
            if(chipValue && !chips.includes(chipValue)){
                const newchip = [...chips , chipValue]
                setChips(newchip);
                e.target.value=""

            }
        }
    }

    const handleDeleteChip = (chipIndex)=>{
        const newChips = chips.filter((_,index)=>index !== chipIndex)
        setChips(newChips);
    }




  return (
    <div className='flex flex-col space-y-2'>
        {/* Render the label for the input */}
        <label className='text-sm text-richblack-5' htmlFor={name}>
            {label} <sup className='text-pink-200'>*</sup>
        </label>
        <div className='flex w-full  gap-y-2'>
            {/* Map over the chips array and render each chip */}
            {chips.map((chip, index)=>{
                return (
                <div className=' m-1 flex  border-white border-2 items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5'
                key={index}>
                    {/* Rebder the chip value */}
                    {chip}
                    
                    <button type='button' className='ml-2 focus:outline-none' onClick={()=>handleDeleteChip(index)}>
                        <MdClose className="text-sm"></MdClose>
                    </button>


                    </div>
                )
                  

            })}
           
        </div>
        <input 
            id={name}
            type="text"
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className='form-style w-full'/>
        {
            error[name] && (
                <span className='ml-2 txt-xs tracking-wide text-pink-200'>{label} is required</span>
            )
        }
      
    </div>
  )
}

export default ChipInput
