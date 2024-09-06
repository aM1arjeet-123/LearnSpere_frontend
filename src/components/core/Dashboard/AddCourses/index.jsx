import React from "react";
import RenderSteps from "./RenderSteps";
const AddCourse = () =>{
    return (
        <div className=" flex w-full items-center gap-x-6">
            <div className=" flex flex-1 flex-col">
                <h1 className=" mb-14 text-3xl font-medium text-richblack-5">
                    Add Courses
                </h1>
                <div className=" flex-1">
                    <RenderSteps/>
                </div>
            </div>

        </div>
    )
};

export default AddCourse;