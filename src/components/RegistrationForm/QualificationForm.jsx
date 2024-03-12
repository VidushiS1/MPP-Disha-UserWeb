import React, { useState } from "react";
import Logo from "../../assets/drwerdishaicon.png";
import StadyTree from "../../assets/education-qualification.gif";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { loginFormData } from "../../../rtk/features/LoginForm/LoginSlice";
import { toast } from "react-toastify";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import edthClassImg from "../../assets/newmppimages/Education1.png";
import BlowTenthImg from "../../assets/newmppimages/blow-10.png";
import TenthImg from "../../assets/newmppimages/10th-class.png";
import towlthImg from "../../assets/newmppimages/12th-class.png";
import diplomaImg from "../../assets/newmppimages/Education5.png";
import underImg from "../../assets/newmppimages/under-graduated.png";
import postImg from "../../assets/newmppimages/post-graduate.png";
import jobSeekerImg from "../../assets/newmppimages/cv.png";

import { Link, useNavigate } from "react-router-dom";

const buttonStyles = {
  padding: "10px",
  color: "#FFF",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "normal",
  borderRadius: "5px",
  background: "linear-gradient(180deg, #B08C5D 0%, #8D6C45 100%)",
  textTransform: "capitalize",
  border: "1px solid #AC885A",
  width: "50%",
};
const QualificationForm = () => {
  const dispatch = useDispatch();
  const customId = "custom-id-yes";
  const Navigate = useNavigate();

  const [fromDetail, setFormDetail] = useState({
    mobile_no: "",
    password: "",
    fcm_token: "fdugihjhgydfijlkui0789i",
  });
  console.log("fromDetail", fromDetail);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const loginDetailsHandler = (e) => {
    const { name, value } = e.target;

    setFormDetail((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    Navigate("/student-select-qualification");
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!fromDetail.mobile_no || !fromDetail.password) {
  //     toast.error("Mobile Number and password are required", {
  //       toastId: customId,
  //     });
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const response = await dispatch(loginFormData(fromDetail));
  //     console.log("success response", response);
  //     if (response.payload?.data?.message === "User login successfully.") {
  //       toast.success("Login Successful", {
  //         toastId: customId,
  //       });
  //       Navigate("/");
  //     } else {
  //       console.log("error response", response);
  //       toast.error(
  //         response.payload?.data?.message ||
  //           "Mobile Number or Password Does Not Exist",
  //         {
  //           toastId: customId,
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred. Please try again.", {
  //       toastId: customId,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleBelowEighth = () => {
    Navigate("/student-below-eighth");
  }

  const handleBelowTenth = () => {
    Navigate("/student-below-tenth");
  };

  const handleClassTenth = () => {
    Navigate("/student-class-tenth");
  };

  const handleClassTwelfth = () => {
    Navigate("/student-class-twekfth");
  };

   const handleUnderGraduationDiploma = () => {
     Navigate("/student-under-graduation-diploma");
   };

   const handleUnderGraduation = () => {
     Navigate("/student-under-graduation");
   };

   const handlePostGraduation = () => {
     Navigate("/student-post-graduation");
   };

   const handleJobSeeker = () => {
     Navigate("/student-job-seeker");
   };

  return (
    <>
      <div
        className="w-full flex justify-between items-center h-screen"
        style={{ height: "100vh" }}
      >
        <div className="w-full flex justify-center items-center">
          <div className="">
            <div className="right-side-img-area flex justify-center items-center w-100">
              <img src={StadyTree} alt="" style={{ height: "620px" }} />
            </div>
          </div>
          <div
            className="w-1/2 overflow-y-scroll scrollbar-hide main-right-side-section-main"
            style={{ height: "100vh" }}
          >
            <div className="main-login-container">
              <div className="login-form-layout-main ">
                <div className="flex justify-between items-center">
                  <IconButton
                    sx={{
                      background: "#AC885A",
                      padding: "2px",
                      borderRadius: "5px",
                      "&:hover": {
                        background: "#AC885A",
                      },
                    }}
                  >
                    <KeyboardBackspaceIcon sx={{ color: "#FFF" }} />
                  </IconButton>

                  <h1
                    className="text-center text-xl font-bold text-blue-900 "
                    style={{ color: "#264796" }}
                  >
                    Current Education Qualification
                  </h1>

                  <img src={Logo} alt="logo" className="h-20 " />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="buttom-loginform-area ">
                    <div className="mb-3  mt-8 w-full flex justify-evenly items-center">
                      <div
                        className="s-c-e-q-layout transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
                        onClick={handleBelowEighth}
                      >
                        <div className="mid-img-area-sceq">
                          <img src={edthClassImg} alt="" />
                        </div>
                        <div className="buttom-text-sceq">
                          <p>Below</p>
                          <p>8th</p>
                        </div>
                      </div>
                      <div
                        className="s-c-e-q-layout transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
                        onClick={handleBelowTenth}
                      >
                        <div className="mid-img-area-sceq">
                          <img src={BlowTenthImg} alt="" />
                        </div>
                        <div className="buttom-text-sceq">
                          <p>Below</p>
                          <p>10th</p>
                        </div>
                      </div>
                      <div
                        className="s-c-e-q-layout transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
                        onClick={handleClassTenth}
                      >
                        <div className="mid-img-area-sceq">
                          <img src={TenthImg} alt="" />
                        </div>
                        <div className="buttom-text-sceq">
                          <p>Class</p>
                          <p>10th</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3  mt-6 w-full flex justify-evenly items-center">
                      <div
                        className="s-c-e-q-layout transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
                        onClick={handleClassTwelfth}
                      >
                        <div className="mid-img-area-sceq">
                          <img src={towlthImg} alt="" />
                        </div>
                        <div className="buttom-text-sceq">
                          <p>Class</p>
                          <p>12th</p>
                        </div>
                      </div>
                      <div
                        className="s-c-e-q-layout transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
                        onClick={handleUnderGraduationDiploma}
                      >
                        <div className="mid-img-area-sceq">
                          <img src={diplomaImg} alt="" />
                        </div>
                        <div className="buttom-text-sceq">
                          <p>UG</p>
                          <p>Diploma</p>
                        </div>
                      </div>
                      <div
                        className="s-c-e-q-layout transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
                        onClick={handleUnderGraduation}
                      >
                        <div className="mid-img-area-sceq">
                          <img src={underImg} alt="" />
                        </div>
                        <div className="buttom-text-sceq">
                          <p>under</p>
                          <p>graduation</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3  mt-6 w-full flex justify-center items-center">
                      <div
                        className="s-c-e-q-layout transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 me-6"
                        onClick={handlePostGraduation}
                      >
                        <div className="mid-img-area-sceq">
                          <img src={postImg} alt="" />
                        </div>
                        <div className="buttom-text-sceq">
                          <p>Post</p>
                          <p>graduation</p>
                        </div>
                      </div>
                      <div
                        className="s-c-e-q-layout transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300"
                        onClick={handleJobSeeker}
                      >
                        <div className="mid-img-area-sceq">
                          <img src={jobSeekerImg} alt="" />
                        </div>
                        <div className="buttom-text-sceq">
                          <p>Job</p>
                          <p>Seeker</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QualificationForm;
