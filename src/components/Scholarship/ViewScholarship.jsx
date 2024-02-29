import React, { useEffect, useState } from "react";
import { Button, Tooltip,CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../assets/drwerdishaicon2.png";
import sectorImg from "../../assets/newmppimages/GovernmentKnowMoreicon1.png";
import eligibilityEducationImg from "../../assets/newmppimages/criteria.png";
import casteListImg from "../../assets/newmppimages/list.png";
import examImg from "../../assets/newmppimages/exam.png";
import faqImg from "../../assets/newmppimages/faq.png";
import StreamImg from "../../assets/newmppimages/graduation-cap.png";
import salaryImg from "../../assets/newmppimages/GovernmentKnowMoreicon4.png";
import WebsiteImg from "../../assets/newmppimages/GovernmentKnowMoreicon6.png";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {deleteScholershipDataById} from "../../../rtk/features/Scholarship/deleteScholershipDataByIdSlice"
import { toast } from "react-toastify";

const ViewScholarship = () => {
    const [isVerificationDialogOpen1, setisVerificationDialogOpen1] =
      useState(false);
       const navigate = useNavigate();
       const dispatch = useDispatch()
       const customId = "custom-id-yes"
       const [loading,setLoading] = useState(true);

  const ViewScholarshipData = useSelector(
    (state) => state.getScholarshipDataById?.users?.data?.[0]
  );

  console.log("ViewScholarshipData", ViewScholarshipData);

     const handleOpenVerificationDialog1 = () => {
       setisVerificationDialogOpen1(true);
     };
     const handleCloseVerificationDialog1 = () => {
       setisVerificationDialogOpen1(false);
     };

     const handleDeletePopup = () => {
       handleOpenVerificationDialog1();
     };

       const EditScholarshipForm = () => {
         navigate("/edit-scholarship");
       };

       const handleBack = () => {
        navigate("/all-scholarship-cards");
       }



const hadleScholarshipDelete = async()=>{
  try {
    const actionResult =  await dispatch(deleteScholershipDataById(ViewScholarshipData?._id));
    if (actionResult?.payload?.message) {
      toast?.success(actionResult?.payload?.message, {
        toastId: customId,
      });
      handleCloseVerificationDialog1();
      navigate("/all-scholarship-cards");
    }
  } catch (error) {
    console.log(error);
  }
}






  return (
    <>
      <div>
        <div className="flex items-center justify-between pb-12 ">
          <h1 className="text-2xl font-semibold">View Scholarship Details</h1>
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
                <h1 className="text-2xl font-bold text-yellow-dark">SCHEME</h1>
                <h6 className=" text-lg font-medium text-neutral-800">
                  {ViewScholarshipData?.scheme_name?.length > 70
                    ? ViewScholarshipData?.scheme_name?.substring(0, 70) + "..."
                    : ViewScholarshipData?.scheme_name}
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

            <div className="p-8 bg-blue-lightest  rounded-lg shadow-md mb-3.5 relative">
              <div className="flex items-start mb-4 mx-12">
                <img src={salaryImg} alt="Image" className="w-8 h-8" />
                <div className="flex flex-col justify-start ml-4">
                  <h6 className="text-lg font-bold">Amount of Scholarship</h6>
                  <div
                    className={`border-b-2 border-yellow-700 w-48 mt-1`}
                  ></div>
                  <h6 className="mt-2 text-sm font-medium text-neutral-600">
                    {ViewScholarshipData?.amount_of_scholership}
                  </h6>
                </div>
              </div>
              {ViewScholarshipData?.closing === true && (
                <h4 className="bg-white text-red-700 shadow-md p-2 rounded-md w-28 text-center font-bold absolute right-5 top-5">
                  Closed
                </h4>
              )}

              <div className="flex items-start mb-4 mx-12">
                <img
                  src={eligibilityEducationImg}
                  alt="Image"
                  className="w-8 h-8"
                />
                <div className="flex flex-col justify-start ml-4">
                  <h6 className="text-lg font-bold">
                    {" "}
                    Educational Eligibility{" "}
                  </h6>
                  <div
                    className={`border-b-2 border-yellow-700 w-48 mt-1`}
                  ></div>
                  <h6 className="mt-2 text-sm font-medium text-neutral-600">
                    {ViewScholarshipData?.eligibility}
                  </h6>
                </div>
              </div>
              <div className="flex items-start mb-4 mx-12">
                <img src={sectorImg} alt="Image" className="w-8 h-8" />
                <div className="flex flex-col justify-start ml-4">
                  <h6 className="text-lg font-bold">Category</h6>
                  <div
                    className={`border-b-2 border-yellow-700 w-20 mt-1`}
                  ></div>
                  <h6 className="mt-2 text-sm font-medium text-neutral-600">
                    {ViewScholarshipData?.category}
                  </h6>
                </div>
              </div>
              <div className="flex items-start mb-4 mx-12">
                <img src={examImg} alt="Image" className="w-8 h-8" />
                <div className="flex flex-col justify-start ml-4">
                  <h6 className="text-lg font-bold">Scheme Closing Date</h6>
                  <div
                    className={`border-b-2 border-yellow-700 w-44 mt-1`}
                  ></div>
                  <h6 className="mt-2 text-sm font-medium text-neutral-600">
                    {ViewScholarshipData?.scheme_closing_date}
                  </h6>
                </div>
              </div>
            </div>
            <div className="p-8 bg-blue-lightest  rounded-lg shadow-md mb-3.5">
              <div className="flex items-start mb-4 mx-12">
                <img src={casteListImg} alt="Image" className="w-8 h-8" />
                <div className="flex flex-col justify-start ml-4">
                  <h6 className="text-lg font-bold">Guidelines</h6>
                  <div
                    className={`border-b-2 border-yellow-700 w-24 mt-1`}
                  ></div>
                  <h6 className="mt-2 text-sm font-medium text-neutral-600">
                    {ViewScholarshipData?.guidelines}
                  </h6>
                </div>
              </div>
              <div className="flex items-start mb-4 mx-12">
                <img src={faqImg} alt="Image" className="w-8 h-8" />
                <div className="flex flex-col justify-start ml-4">
                  <h6 className="text-lg font-bold">FAQs</h6>
                  <div
                    className={`border-b-2 border-yellow-700 w-14 mt-1`}
                  ></div>
                  <h6 className="mt-2 text-sm font-medium text-neutral-600">
                    {ViewScholarshipData?.faq}
                  </h6>
                </div>
              </div>
              <div className="flex items-start mb-4 mx-12">
                <img src={WebsiteImg} alt="Image" className="w-8 h-8" />
                <div className="flex flex-col justify-start ml-4">
                  <h6 className="text-lg font-bold">Website</h6>
                  <div
                    className={`border-b-2 border-yellow-700 w-16 mt-1`}
                  ></div>
                  <h6 className="mt-2 text-sm font-medium text-neutral-600">
                    <a
                      href={
                        ViewScholarshipData?.website?.includes("://")
                          ? ViewScholarshipData?.website
                          : `https://${ViewScholarshipData?.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#4d4dff" }}
                    >
                      {ViewScholarshipData?.website}
                    </a>
                  </h6>
                </div>
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
            Are you sure you want to delete this Scholarship ?
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
              type="submit"
              onClick={hadleScholarshipDelete}
            >
              Yes
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ViewScholarship;
