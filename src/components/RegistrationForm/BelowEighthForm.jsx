import React, { useState } from "react";
import Logo from "../../assets/drwerdishaicon.png";
import StadyTree from "../../assets/BelowEighthForm.gif";
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
import { YearCalendar } from "@mui/x-date-pickers/YearCalendar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AttachFileIcon from "@mui/icons-material/AttachFile";

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
const BelowEighthForm = () => {
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
    Navigate("/student-hobbies");
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

  const [fileName, setFileName] = useState("");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "");
  };
  const handleBack = () => {
    Navigate("/student-select-qualification");
  }

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
                    onClick={handleBack}
                  >
                    <KeyboardBackspaceIcon sx={{ color: "#FFF" }} />
                  </IconButton>

                  <h1
                    className="text-center text-xl font-bold text-blue-900 "
                    style={{ color: "#264796" }}
                  >
                    Below 8th
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
                          Class Name
                        </label>
                        <TextField
                          sx={{ width: "228px" }}
                          id=""
                          placeholder="Please Enter Class Name"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label
                          htmlFor="dob"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          School Name
                        </label>
                        <TextField
                          sx={{ width: "228px" }}
                          id=""
                          placeholder="Please Enter School Name"
                        />
                      </div>
                    </div>
                    <div className="mb-3 w-full flex justify-between items-center">
                      <div className="flex flex-col">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          Medium Of Education
                        </label>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="english"
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
                            label="English"
                          />
                          <FormControlLabel
                            value="hindi"
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
                            label="Hindi"
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
                          Year of Passing
                        </label>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            views={["year"]}
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
                      <div className="flex flex-col">
                        <label
                          htmlFor="dob"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          Percentage %
                        </label>
                        <TextField
                          sx={{ width: "220px" }}
                          id=""
                          placeholder="Please Enter Percentage %"
                        />
                      </div>
                    </div>
                    <div className="mb-3 w-full flex justify-between items-center">
                      <div className="flex flex-col">
                        <label
                          htmlFor="dob"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          Mode of Education
                        </label>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="regular"
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
                            label="Regular"
                          />
                          <FormControlLabel
                            value="distance learning"
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
                            label="Distance Learning"
                          />
                        </RadioGroup>
                      </div>
                    </div>
                    <div className="mb-3 w-full">
                      <div className="flex flex-col space-y-2">
                        <label
                          htmlFor=""
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                        >
                          Achievement If Any
                        </label>
                        <TextField
                          placeholder="Upload Achievement File"
                          InputProps={{
                            endAdornment: (
                              <AttachFileIcon
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  document.getElementById("fileInput").click();
                                }}
                              />
                            ),
                          }}
                          value={fileName}
                          disabled
                        />
                        <input
                          id="fileInput"
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleFileInputChange}
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

export default BelowEighthForm;
