import React, { useState } from "react";
import Logo from "../../assets/drwerdishaicon.png";
import StadyTree from "../../assets/student-information-form.gif";
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
const RegistrationInformationForm = () => {
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
                    Student Information Form
                  </h1>

                  <img src={Logo} alt="logo" className="h-20 " />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="buttom-loginform-area ">
                    <div className="mb-3 w-full flex justify-between items-center">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          Name
                        </label>
                        <TextField
                          sx={{ width: "220px" }}
                          id="name"
                          defaultValue="Piyush Vyas"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="dob"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          Date of Birth
                        </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            sx={{
                              "& .MuiInputBase-root": {
                                borderColor: "#AC885A",
                              },
                              "& .MuiSvgIcon-root": {
                                color: "#AC885A",
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                    <div className="mb-3 w-full flex justify-between items-center">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          Gender
                        </label>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="female"
                            control={
                              <Radio
                                sx={{
                                  color: "#AC885A",
                                  "&.Mui-checked": {
                                    color: "#AC885A",
                                  },
                                }}
                              />
                            }
                            label="Female"
                          />
                          <FormControlLabel
                            value="male"
                            control={
                              <Radio
                                sx={{
                                  color: "#AC885A",
                                  "&.Mui-checked": {
                                    color: "#AC885A",
                                  },
                                }}
                              />
                            }
                            label="Male"
                          />
                          <FormControlLabel
                            value="other"
                            control={
                              <Radio
                                sx={{
                                  color: "#AC885A",
                                  "&.Mui-checked": {
                                    color: "#AC885A",
                                  },
                                }}
                              />
                            }
                            label="Other"
                          />
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="mb-3 w-full flex justify-between items-center">
                      <div className="flex flex-col">
                        <label
                          htmlFor="dob"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          Category
                        </label>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="general"
                            control={
                              <Radio
                                sx={{
                                  color: "#AC885A",
                                  "&.Mui-checked": {
                                    color: "#AC885A",
                                  },
                                }}
                              />
                            }
                            label="General"
                          />
                          <FormControlLabel
                            value="obc"
                            control={
                              <Radio
                                sx={{
                                  color: "#AC885A",
                                  "&.Mui-checked": {
                                    color: "#AC885A",
                                  },
                                }}
                              />
                            }
                            label="OBC"
                          />
                          <FormControlLabel
                            value="sc"
                            control={
                              <Radio
                                sx={{
                                  color: "#AC885A",
                                  "&.Mui-checked": {
                                    color: "#AC885A",
                                  },
                                }}
                              />
                            }
                            label="SC"
                          />
                          <FormControlLabel
                            value="st"
                            control={
                              <Radio
                                sx={{
                                  color: "#AC885A",
                                  "&.Mui-checked": {
                                    color: "#AC885A",
                                  },
                                }}
                              />
                            }
                            label="ST"
                          />
                          <FormControlLabel
                            value="ews"
                            control={
                              <Radio
                                sx={{
                                  color: "#AC885A",
                                  "&.Mui-checked": {
                                    color: "#AC885A",
                                  },
                                }}
                              />
                            }
                            label="EWS"
                          />
                          <FormControlLabel
                            value="nt"
                            control={
                              <Radio
                                sx={{
                                  color: "#AC885A",
                                  "&.Mui-checked": {
                                    color: "#AC885A",
                                  },
                                }}
                              />
                            }
                            label="NT"
                          />
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="mb-3 w-full flex justify-between items-center">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          Father`s Name
                        </label>
                        <TextField
                          sx={{ width: "228px" }}
                          id=""
                          placeholder="Please Enter Father Name"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="dob"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          Father`s Occupation
                        </label>
                        <TextField
                          sx={{ width: "228px" }}
                          id=""
                          placeholder="Please Enter Father Occupation"
                        />
                      </div>
                    </div>
                    <div className="mb-3 w-full flex justify-between items-center">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          Mother`s Name
                        </label>
                        <TextField
                          sx={{ width: "228px" }}
                          id=""
                          placeholder="Please Enter Mother Name"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="dob"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          Mother`s Occupation
                        </label>
                        <TextField
                          sx={{ width: "228px" }}
                          id=""
                          placeholder="Please Enter Mother Occupation"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center items-center mb-6 mt-8">
                      <h1 className="text-center text-lg font-bold text-slate-600 ">
                        Family Member in Police
                      </h1>
                    </div>
                    <div className="mb-3 w-full flex justify-between items-center">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          Name
                        </label>
                        <TextField
                          sx={{ width: "228px" }}
                          id=""
                          placeholder="Please Enter Name"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="dob"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          Designtion
                        </label>
                        <TextField
                          sx={{ width: "228px" }}
                          id=""
                          placeholder="Please Enter Designtion"
                        />
                      </div>
                    </div>
                    <div className="mb-3 w-full flex justify-between items-center">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          Posting Unit
                        </label>
                        <TextField
                          sx={{ width: "228px" }}
                          id=""
                          placeholder="Please Enter Posting Unit"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="dob"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          Relation
                        </label>
                        <TextField
                          sx={{ width: "228px" }}
                          id=""
                          placeholder="Please Enter Relation"
                        />
                      </div>
                    </div>

                    <div className="login-button-area  flex justify-center items-center mt-12">
                      <Button
                        type="submit"
                        variant="contained"
                        style={buttonStyles}
                        disabled={loading}
                      >
                        {loading ? (
                          <div>
                            Submiting...{" "}
                            <CircularProgress
                              style={{ color: "white", height: 15, width: 15 }}
                            />
                          </div>
                        ) : (
                          "Submit"
                        )}
                      </Button>
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

export default RegistrationInformationForm;
