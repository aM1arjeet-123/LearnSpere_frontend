import { Chart, registerables } from "chart.js";
import React, { useState } from "react";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const InstructorChart = ({instructorData}) => {
  const [currChart, setCurrChart] = useState("students");

  //  function to generate random colors for the chart

  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`
      colors.push(color);
    }
    return colors;
  };

//    data for the chart displaying student information
const chartDataStudents = {
    labels: instructorData.map((course)=>course.courseName),
    datasets:[
        {
            data:instructorData.map((course)=>course.totalStudentsEnrolled),
            backgroundColor:generateRandomColors(instructorData.length)
        },
    ],

}
const chartIncomeData = {
    labels: instructorData.map((course)=>course.courseName),
    datasets:[
        {
            data:instructorData.map((course)=>course.totalAmountGenerated),
            backgroundColor:generateRandomColors(instructorData.length)
        },
    ],

}






  const options = {
    maintainAspectRatio: false,
  };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
      <div className="text-lg font-bold text-richblack-5 ">Visualize</div>
      <div className=" space-x-4 font-semibold">
        {/* Button to switch to the student chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "bg-richblack-700 rounded-md text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Students
        </button>
        {/* button to switch to income chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "bg-richblack-700 rounded-md text-yellow-50"
              : "text-yellow-400"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-full w-full">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  );
};

export default InstructorChart;
