import RatingStars from "../components/Common/RatingStars";
import Spinner from "../components/Common/Spinner";
import CourseAccordionBar from "../components/core/CourseDetails/CourseAccordionBar";
import CourseDetailsCard from "../components/core/CourseDetails/CourseDetailsCard";
import { fetchCourseDetails } from "../services/operations/courseDetails";
import GetAvgRating from "../utils/avgrating";
import { formatDate } from "../utils/formateDate";
import React, { useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Common/Footer"
import ConfirmationModal from "../components/Common/ConfirmationModal"
import { BuyCourse } from "../services/operations/studentFeature";

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [isActive, setIsActive] = useState(Array(0));
  const [collapse, setCollapse] = useState("");
  // declare a value to save state

  const [response, setresponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchCourseDetails(courseId);
        setresponse(res);
      } catch (err) {
        console.log("err in fetch details", err);
      }
    })();
  }, [courseId]);
  useEffect(() => {
    let lecture = 0;
    response?.courseDetails?.courseContent?.forEach((sec) => {
      lecture += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lecture);
  }, [response]);

  //  calculating average rating

  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    console.log("review", response?.courseDetails);
    const count = GetAvgRating(response?.courseDetails?.ratingAndReview);
    setAvgReviewCount(count);
  }, [response]);

  if (loading || !response) {
    return (
      <div className="grid min-h-[cale(100vh-3.5rem)] place-items-center">
        <Spinner />
      </div>
    );
  }
  

  const handleBuyCourse = () => {
    if (token) {
      BuyCourse(token , [courseId] , user, navigate , dispatch)
      return
    }
    setConfirmationModal({
        text1:"You are not logged in!",
        text2:"Please login to Purchase Course.",
        btn1Text:"Login",
        btn2Text:"Cancel",
        btn1Handler:()=>navigate("/login"),
        btn2Handler:()=>setConfirmationModal(null)
    })
  };

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e !== id)
    );
  };

  // Total No of Lectures

  return (
    <div>
      <div className="relative w-full bg-richblack-800">
        {/* Hero section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          <div
            className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center-center
                 py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]"
          >
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset"></div>
              <img
                src={response?.courseDetails?.thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>
            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5">
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {response?.courseDetails?.courseName}
                </p>
              </div>
              <p className="text-richblack-200">
                {response?.courseDetails?.courseDescription}
              </p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount || 0}</span>
                <RatingStars Review_Count={avgReviewCount || 0} />
                <span>{`(${
                  response?.courseDetails?.ratingAndReview?.length || 0
                } reviews) `}</span>
                <span>{`${
                  response?.courseDetails?.studentEnrolled?.length || 0
                } student Enrolled`}</span>
              </div>
              {console.log(response?.courseDetails?.instructor)}
              <div className="">
                Created By:{" "}
                {`${response?.courseDetails?.instructor?.firstName} ${response?.courseDetails?.instructor?.lastName}`}
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at{" "}
                  {formatDate(response?.courseDetails?.createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 border-7 border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {response?.courseDetails?.price}
              </p>
              <button className="yellowButton" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="blackButton">Add to Cart</button>
            </div>
          </div>
          {/* Course Card */}

          <div
            className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px
          translate-y-24 md:translate-y-0 lg:absolute lg:block"
          >
            <CourseDetailsCard
              course={response?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260Px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810]">
          {/* what will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <ReactMarkdown>
                {response?.courseDetails?.whatYouWillLearn}
              </ReactMarkdown>
            </div>
          </div>
          {/* course content section */}
          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {response?.courseDetails?.courseContent?.length}
                    {` section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures}
                    {` lecture(s)`}
                  </span>
                  <span>{response?.totalDuration} total time</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>
            {/* Course Details Accordion */}
            <div className="py-4">
              {response?.courseDetails?.courseContent?.map((course, index) => {
                return (
                  <CourseAccordionBar
                    course={course}
                    key={index}
                    isActive={isActive}
                    handleActive={handleActive}
                  />
                );
              })}
            </div>
            {/* Author details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                
                <img
                  src={
                    response?.courseDetails?.instructor?.image
                      ? response?.courseDetails?.instructor?.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${response?.courseDetails?.instructor?.firstName}${response?.courseDetails?.instructor?.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div className="flex flex-col">
                <p className="text-lg">
                    {`${response?.courseDetails?.instructor?.firstName}
                     ${response?.courseDetails?.instructor?.lastName}`}</p>
                     <p className="text-richblack-50">{response?.courseDetails?.instructor?.additionalDetails?.about}</p>
                     </div></div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  );
};

export default CourseDetails;
