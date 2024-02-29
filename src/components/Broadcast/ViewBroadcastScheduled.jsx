import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../assets/drwerdishaicon2.png";
import DiscImg from "../../assets/newmppimages/job-description.png";
import meetingDateImg from "../../assets/newmppimages/meeting.png";
import meetingTimeImg from "../../assets/newmppimages/time-planning.png";
import meetingDurationImg from "../../assets/newmppimages/duration.png";
import meetingIDImg from "../../assets/newmppimages/badge.png";
import passCodeImg from "../../assets/newmppimages/pincode.png";
import WaitingMeetingImg from "../../assets/newmppimages/waiting-meeting.png";
import VideoMeetingImg from "../../assets/newmppimages/video-conference.png";
import videoRecordingImg from "../../assets/newmppimages/teaching.png";
import videoJoinImg from "../../assets/newmppimages/video-join.png";
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";

const ViewBroadcastScheduled = () => {
  const navitage = useNavigate();
 
  const getZoomMeetingDataById2 = useSelector(
    (state) => state.getZoomMeetingDataById?.users?.data
  );

  console.log("getZoomMeetingDataById2",getZoomMeetingDataById2);

  const handleBack = () => {
navitage("/broadcast-scheduled-all-card");
  }

  return (
    <>
      <div className="flex items-center justify-between pb-12 ">
        <h1 className="text-2xl font-semibold">Broadcast Scheduled Details</h1>
        <div className="relative"></div>
      </div>

      <div className="flex items-center justify-center px-12">
        <div className="job-details-main-container px-36 w-full">
          <div className="top-btn-and-logo-area-v-j-d mb-6">
            <div className="left-side-btn-area pb-12">
              <Button
                variant="contained"
                sx={{
                  fontSize: "10px",
                  minWidth: "30px",
                  padding: "2px 2px",
                  backgroundColor: "#AC885A",
                  color: "#FFF",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#AC885A",
                    color: "#FFF",
                  },
                }}
                onClick={handleBack}
              >
                <ArrowBackIcon sx={{ color: "#FFF", fontSize: "20px" }} />
              </Button>
            </div>
            <div className="flex flex-col justify-center text-center ml-4 pt-6">
              <h1 className="text-2xl font-bold text-yellow-dark">
                MEETING TOPIC
              </h1>
              <h6 className=" text-lg font-medium text-neutral-800">
                {getZoomMeetingDataById2?.agenda?.length > 40
                  ? getZoomMeetingDataById2?.agenda?.substring(0, 40)
                  : getZoomMeetingDataById2?.agenda}
              </h6>
              <div
                className={`border-b-2 border-yellow-dark w-auto mt-1`}
              ></div>
            </div>
            <div className="right-side-logo-area">
              <img
                src={logo}
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          </div>

          <div className="p-8 bg-blue-lightest  rounded-lg shadow-md mb-3.5">
            <div className="flex items-start mb-4 mx-12">
              <img src={DiscImg} alt="Image" className="w-8 h-8" />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Description</h6>
                <div className={`border-b-2 border-yellow-700 w-24 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  {getZoomMeetingDataById2?.description?.length > 40
                    ? getZoomMeetingDataById2?.description?.substring(0, 40)
                    : getZoomMeetingDataById2?.description}
                </h6>
              </div>
            </div>
            <div className="flex items-start mb-4 mx-12">
              <img src={meetingDateImg} alt="Image" className="w-8 h-8" />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Scheduled Date</h6>
                <div className={`border-b-2 border-yellow-700 w-36 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  {getZoomMeetingDataById2?.date}
                </h6>
              </div>
            </div>
            <div className="flex items-start mb-4 mx-12">
              <img src={meetingTimeImg} alt="Image" className="w-8 h-8" />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Scheduled Time</h6>
                <div className={`border-b-2 border-yellow-700 w-36 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  {getZoomMeetingDataById2?.start_time} -{" "}
                  {getZoomMeetingDataById2?.end_time}
                </h6>
              </div>
            </div>
            <div className="flex items-start mb-4 mx-12">
              <img src={meetingDurationImg} alt="Image" className="w-8 h-8" />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Meeting Duration</h6>
                <div className={`border-b-2 border-yellow-700 w-36 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  {getZoomMeetingDataById2?.start_time}
                </h6>
              </div>
            </div>

            <div className="flex items-start mb-4 mx-12">
              <img src={VideoMeetingImg} alt="Image" className="w-8 h-8" />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Meeting Link</h6>
                <div className={`border-b-2 border-yellow-700 w-36 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  <a
                    href={
                      getZoomMeetingDataById2?.link?.includes("://")
                        ? getZoomMeetingDataById2?.link
                        : `https://${getZoomMeetingDataById2?.link}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#4d4dff" }}
                  >
                    {getZoomMeetingDataById2?.link}
                  </a>
                </h6>
              </div>
            </div>
          </div>
          {/* <div className="p-8 bg-blue-lightest rounded-lg shadow-md mb-3.5">
            <div className="flex items-start mb-4 mx-12">
              <img src={meetingIDImg} alt="Image" className="w-8 h-8" />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Meeting ID</h6>
                <div className={`border-b-2 border-yellow-700 w-24 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  MI125487598
                </h6>
              </div>
            </div>
            <div className="flex items-start mb-4 mx-12">
              <img src={passCodeImg} alt="Image" className="w-8 h-8" />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Passcode</h6>
                <div className={`border-b-2 border-yellow-700 w-20 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  5fxk3AD55
                </h6>
              </div>
            </div>
            <div className="flex items-start mb-4 mx-12">
              <img src={WaitingMeetingImg} alt="Image" className="w-8 h-8" />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Waiting Room</h6>
                <div className={`border-b-2 border-yellow-700 w-34 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  Not Selected
                </h6>
              </div>
            </div>
          </div>
          <div className="p-8 bg-blue-lightest  rounded-lg shadow-md mb-8">
            <div className="flex items-start mb-4 mx-12">
              <img src={VideoMeetingImg} alt="Image" className="w-8 h-8" />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Video Only Host</h6>
                <div className={`border-b-2 border-yellow-700 w-32 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  Video Mode On
                </h6>
              </div>
            </div>
            <div className="flex items-start mb-4 mx-12">
              <img src={videoRecordingImg} alt="Image" className="w-8 h-8" />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Auto Recording</h6>
                <div className={`border-b-2 border-yellow-700 w-32 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  Auto Recording Off
                </h6>
              </div>
            </div>
            <div className="flex items-start mb-4 mx-12">
              <img src={videoJoinImg} alt="Image" className="w-8 h-8" />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Join Before Host</h6>
                <div className={`border-b-2 border-yellow-700 w-32 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  This Mode is Off
                </h6>
              </div>
            </div>
          </div>  */}
        </div>
      </div>
    </>
  );
};

export default ViewBroadcastScheduled;
