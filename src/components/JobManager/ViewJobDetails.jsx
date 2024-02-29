import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../assets/drwerdishaicon2.png";
import titleImg from "../../assets/newmppimages/title.png";
import sectorImg from "../../assets/newmppimages/GovernmentKnowMoreicon1.png";
import agancyImg from "../../assets/newmppimages/corporation.png";
import eligibilityEducationImg from "../../assets/newmppimages/GovernmentKnowMoreicon2.png";
import examImg from "../../assets/newmppimages/exam.png";
import salaryImg from "../../assets/newmppimages/GovernmentKnowMoreicon4.png";
import ExamConductingAgencyImg from "../../assets/newmppimages/GovernmentKnowMoreicon5.png";
import WebsiteImg from "../../assets/newmppimages/GovernmentKnowMoreicon6.png";
import forImg from "../../assets/newmppimages/GovernmentKnowMoreicon7.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { getGovJobsListDataById } from "../../../rtk/features/JobManager/getGovJobsListDataByIdSlice";
import { DeleteGovernmentJobDataById } from "../../../rtk/features/JobManager/DeleteGovernmentJobDataByIdSlice";
import { getGovJobsListData } from "../../../rtk/features/JobManager/getGovJobsListDataSlice";
import { toast } from "react-toastify";

const ViewJobDetails = () => {
   const dispatch = useDispatch();
   const customId = "custom-id-yes";

  const [selectedGovJobId, setSelectedGovJobId] = useState(null);
    const [isVerificationDialogOpen1, setisVerificationDialogOpen1] =
      useState(false);
  const navigate = useNavigate();
  const getGovJobsListDataById2 = useSelector(
    (state) => state.getGovJobsListDataById?.users?.data?.[0]
  );

  console.log("getGovJobsListDataById", getGovJobsListDataById2);

   const handleOpenVerificationDialog1 = () => {
     setisVerificationDialogOpen1(true);
   };
   const handleCloseVerificationDialog1 = () => {
     setisVerificationDialogOpen1(false);
   };

  

    // const EditGovJob = () => {
    //   navigate("/edit-government-job");
    // };

    const EditGovJob = async (govId) => {
      setSelectedGovJobId(govId);
      await dispatch(getGovJobsListDataById(govId));
      navigate("/edit-government-job");
    };



  const handleDeletePopup = (tenantId) => {
    handleOpenVerificationDialog1();
    setSelectedGovJobId(tenantId);
    console.log("tenantId in popup", tenantId);
  };

  const handleRecruiterDelete = async () => {
     
    const actionResult = await dispatch(
      DeleteGovernmentJobDataById(getGovJobsListDataById2?._id)
    );
    console.log("actionResult", actionResult);
    if (actionResult?.payload?.message) {
      toast.success("Gov. Job has been deleted Successfully", {
        toastId: customId,
      });
     await dispatch(getGovJobsListData());
      navigate("/job-manager");
      handleCloseVerificationDialog1();
    }
    console.log("actionResult after delete", actionResult);
    handleClickAway();
  };

   const handleBack = () => {
     navigate("/job-manager");
   };
  return (
    <>
      <div className="flex items-center justify-between pb-12 ">
        <h1 className="text-2xl font-semibold">View Job Details</h1>
        <div className="relative"></div>
      </div>

      <div className="flex items-center justify-center px-12 w-full">
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
              <h1 className="text-2xl font-bold text-yellow-dark">Job Title</h1>
              <h6 className=" text-lg font-medium text-neutral-800">
                {getGovJobsListDataById2?.job_title}
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
              <img src={agancyImg} alt="Image" className="w-8 h-8" />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Agency</h6>
                <div className={`border-b-2 border-yellow-700 w-14 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  {getGovJobsListDataById2?.job_sector}
                </h6>
              </div>
            </div>
            <div className="flex items-start mb-4 mx-12">
              <img src={sectorImg} alt="Image" className="w-8 h-8" />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Sector</h6>
                <div className={`border-b-2 border-yellow-700 w-14 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  {getGovJobsListDataById2?.job_sector}
                </h6>
              </div>
            </div>
            <div className="flex items-start mb-4 mx-12">
              <img
                src={eligibilityEducationImg}
                alt="Image"
                className="w-8 h-8"
              />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Educational Eligibility </h6>
                <div className={`border-b-2 border-yellow-700 w-44 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  {getGovJobsListDataById2?.eligibility_education}
                </h6>
              </div>
            </div>
            <div className="flex items-start mb-4 mx-12">
              <img src={salaryImg} alt="Image" className="w-8 h-8" />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Salary</h6>
                <div className={`border-b-2 border-yellow-700 w-14 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  {getGovJobsListDataById2?.salary}
                </h6>
              </div>
            </div>
          </div>
          <div className="p-8 bg-blue-lightest rounded-lg shadow-md mb-3.5">
            <div className="flex items-start mb-4 mx-12">
              <img src={examImg} alt="Image" className="w-8 h-8" />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">
                  Exam Required For Selection
                </h6>
                <div className={`border-b-2 border-yellow-700 w-56 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  {getGovJobsListDataById2?.exam_for_selection}
                </h6>
              </div>
            </div>
            <div className="flex items-start mb-4 mx-12">
              <img
                src={ExamConductingAgencyImg}
                alt="Image"
                className="w-8 h-8"
              />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Exam Conducting Agency</h6>
                <div className={`border-b-2 border-yellow-700 w-56 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  {getGovJobsListDataById2?.exam_cunducting_agency}
                </h6>
              </div>
            </div>
          </div>
          <div className="p-8 bg-blue-lightest  rounded-lg shadow-md mb-8">
            <div className="flex items-start mb-4 mx-12">
              <img src={WebsiteImg} alt="Image" className="w-8 h-8" />
              <div className="flex flex-col justify-start ml-4">
                <h6 className="text-lg font-bold">Official Website</h6>
                <div className={`border-b-2 border-yellow-700 w-32 mt-1`}></div>
                <h6 className="mt-2 text-sm font-medium text-neutral-600">
                  <a
                    href={
                      getGovJobsListDataById2?.website?.includes("://")
                        ? getGovJobsListDataById2?.website
                        : `https://${getGovJobsListDataById2?.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#4d4dff" }}
                  >
                    {getGovJobsListDataById2?.website}
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={isVerificationDialogOpen1}
        onClose={handleCloseVerificationDialog1}
        className="custom-dialog"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "650px",
          height: "85vh",
          marginLeft: "30%",
          marginTop: "2rem",
          borderRadius: "16px",
          overflowY: "hidden",
          padding: "5rem",
        }}
      >
        <DialogContent
          className="diacontent mt-5"
          style={{ paddingTop: "0px", overflowY: "hidden" }}
        >
          <DialogTitle
            className="my-1 "
            style={{
              fontWeight: "500",
              fontSize: "text-xs", // Tailwind equivalent for 0.875rem
              padding: "0px",
              textShadow: "2px 2px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            Are you sure you want to delete this job ?
          </DialogTitle>

          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="mt-7"
          >
            <Button
              variant="contained"
              sx={{
                minWidth: "35px",
                padding: "6px 25px",
                marginRight: "10px",
                backgroundColor: "#AC885A",
                color: "#FFF",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#AC885A",
                  color: "#FFF",
                },
              }}
              type="submit"
              onClick={handleCloseVerificationDialog1}
            >
              No
            </Button>
            <Button
              variant="contained"
              sx={{
                minWidth: "35px",
                padding: "6px 25px",
                marginRight: "10px",
                backgroundColor: "#AC885A",
                color: "#FFF",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#AC885A",
                  color: "#FFF",
                },
              }}
              onClick={handleRecruiterDelete}
              type="submit"
            >
              Yes
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewJobDetails;
