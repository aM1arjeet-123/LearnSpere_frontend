import IconBtn from "../../Common/IconBtn";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const loaction = useLocation();
  const playerRef = useRef();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionDate, courseEntireDate, completedLecture } = useSelector(
    (state) => state.viewCourse
  );
  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnd, setVideoEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!courseSectionDate.length) return;

      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        console.log(typeof courseSectionDate);
        const filterData = courseSectionDate.filter(
          (cou) => sectionId.trim() === cou._id.trim()
        );

        console.log("Filtered Data:", courseSectionDate); // This will show the matched object(s)

        const filterVideoData = filterData?.[0]?.subSection?.filter(
          (data) => data._id === subSectionId
        );
        setVideoData(filterVideoData[0]);
        setPreviewSource(courseEntireDate.thumbnail);
        setVideoEnd(false);
      }
    })();
  }, [courseEntireDate, courseSectionDate, loaction.pathname]);

  // check first video

  const isFirstVideo = () => {

    let temp = sectionId.trim()
    
    const currectSectionIndex = courseSectionDate.findIndex(
      (data) => data._id === temp
    );
    console.log(temp.length ,courseSectionDate)
    const currentSubSectionIndex = courseSectionDate[
      currectSectionIndex
    ].subSection.findIndex((data) => data._id.trim() === subSectionId.trim());
    if (currectSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  // check last video

  const isLastVideo = () => {
    const currectSectionIndex = courseSectionDate.findIndex(
      (data) => data._id.trim() === sectionId.trim()
    );
    const currentSubSectionIndex = courseSectionDate[
      currectSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);
    const numberOfSection =
      courseSectionDate[currectSectionIndex].subSection.length;
    if (
      currectSectionIndex === courseSectionDate.length - 1 &&
      currentSubSectionIndex === numberOfSection - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  //  go to next video

  const goToNextVideo = () => {
    const currectSectionIndex = courseSectionDate.findIndex(
      (data) => data._id.trim() === sectionId.trim()
    );
    const currentSubSectionIndex = courseSectionDate[
      currectSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);
    const numberOfSection =
      courseSectionDate[currectSectionIndex].subSection.length;

    if (currentSubSectionIndex !== numberOfSection - 1) {
      const nextSubSectionId =
        courseSectionDate[currectSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionDate[currectSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionDate[currectSectionIndex + 1].subSection[0]._id;

      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  //  go for last video
  const goToPrevVideo = () => {
    const currectSectionIndex = courseSectionDate.findIndex(
      (data) => data._id.trim() === sectionId.trim()
    );
    const currentSubSectionIndex = courseSectionDate[
      currectSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId =
        courseSectionDate[currectSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionLength =
        courseSectionDate[currectSectionIndex - 1].subSection.length;

      const prevSectionId = courseSectionDate[currectSectionIndex - 1]._id;
      const prevSubSectionId =
        courseSectionDate[currectSectionIndex - 1].subSection[
          prevSectionLength - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {};

  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        // <Player
        // ref={playerRef}
        // aspectRatio='1:1'
        // playsInline
        // onEnded={()=>setVideoEnd(true)}
        // src={videoData?.videoUrl}>
        //     <BigPlayButton position='center'/>
        <video
          src={videoData?.videoUrl}
          poster={previewSource}
          width="1440"
          height="680"
          controls
          autoPlay
          muted
          playsInline
        >
          {/* Render when video ends */}

          {/* <IconBtn 
                            disabled={loading}
                            onClick={()=>{
                                if(playerRef?.current){
                                    playerRef?.current?.seek(0)
                                    setVideoEnd(false)
                                }
                            }}
                            text="Rewatch"
                            customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                            /> */}

          {/* {!isFirstVideo() && (
                                    <button 
                                    disabled={loading}
                                    onClick={goToPrevVideo}
                                    className='blackButton'>Prev</button>
                                )} */}
          {/* {
                                    !isLastVideo() && (
                                        <button
                                        disabled={loading}
                                        onClick={goToNextVideo}
                                        className='blackButton'
                                        >Next</button>
                                    )
                                } */}
        </video>
      )}
      {!completedLecture.includes(subSectionId) && (
        <IconBtn
          disabled={loading}
          onClick={() => {}}
          text={!loading ? "Mark as Completed" : "Loading..."}
          customClasses="text-xl max-w-max px-4 mx-auto"
        />
      )}

      {/* <div className="mt-10 flex max-w-[250px] justify-center gap-x-2 text-xl">
        {!isFirstVideo() && (
          <button
            disabled={loading}
            
            className="blackButton"
          >
            Prev
          </button>
        )}
      </div> */}
      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6 "> {videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
