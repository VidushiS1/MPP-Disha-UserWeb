import React, { useState } from "react";
import Logo from "../../assets/drwerdishaicon.png";
import StadyTree from "../../assets/Reset password.gif";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button,CircularProgress,TextField } from "@mui/material";
import {useSelector , useDispatch} from "react-redux"
import {ConfirmPasswordData} from "../../../rtk/features/LoginForm/ConfirmPasswordDataSlice"
import { toast } from "react-toastify";

import "./login-form.css";
import { Link, useNavigate } from "react-router-dom";

const ConfirmPassword = () => {
const dispatch = useDispatch();
const customId = "custom-id-yes";
const Navigate = useNavigate();

const ConfirmOtpData2 = useSelector((state)=>state.ConfirmOtpData?.users?.data);

console.log("ConfirmOtpData2",ConfirmOtpData2);


  const [fromDetail, setFormDetail] = useState({
    confirm_password: "",
    password: "",
    email:ConfirmOtpData2,
  });
  console.log("fromDetail", fromDetail);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword,setConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const togglePasswordVisibility2 = () => {
    setConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email and password are empty
    if (!fromDetail.password || !fromDetail.confirm_password) {
      toast.error("Please enter the Password and Confirm Password.", {
        toastId: customId,
      });
      return;
    }

      // Check if email and password are empty
      if (fromDetail.password !== fromDetail.confirm_password) {
        toast.error("Password and Confirm Password does not match!", {
          toastId: customId,
        });
        return;
      }

    try {
      setLoading(true);
      const response = await dispatch(ConfirmPasswordData(fromDetail));
      console.log("response", response);
      if (response?.payload?.status === true) {
        toast.success("Password Updated Successfully", {
          toastId: customId,
        });
        Navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        toastId: customId,
      });
    } finally {
      setLoading(false);
    }
  };

  const loginDetailsHandler = ({ target: { name, value } }) => {
    setFormDetail((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

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
          <div className="w-1/2">
            <div className="main-login-container">
              <div className="login-form-layout-main ">
                <div className="top-img-area mb-4  flex justify-center items-center">
                  <img src={Logo} alt="logo" />
                </div>
                <form onSubmit={handleSubmit}>
                <div className="buttom-loginform-area ">
                
                <div className="w-100 flex justify-center items-center flex-col mb-5">
                <div className="singUp-screen-layout text-2xl">Reset Password</div>
                  <p className="singUp-screen-layout font-300 mt-5 text-center text-base text-black text-opacity-80 font-semibold">Set the new password for your account so you can login</p>
                  <p className="singUp-screen-layout font-300  text-center mb-8 text-base text-black text-opacity-80 font-semibold"> and access all the features</p>
                    <TextField
                      sx={{ width: "50%" }}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={fromDetail.password}
                      onChange={loginDetailsHandler}
                      placeholder="Enter password"
                      InputProps={{
                        endAdornment: (
                          <div
                            onClick={togglePasswordVisibility}
                            style={{ cursor: "pointer" }}
                          >
                            {showPassword ? (
                              <VisibilityIcon className="eye-icon" />
                            ) : (
                             
                              <VisibilityOffIcon className="eye-icon" />
                            )}
                          </div>
                        ),
                      }}
                    />
                  </div>
                  <div className="mb-1 w-100 flex justify-center items-center mt-4">
                    <TextField
                      // required
                      sx={{ width: "50%" }}
                      name="confirm_password"
                      type={confirmPassword ? "text" : "password"}
                      value={fromDetail.confirm_password}
                      onChange={loginDetailsHandler}
                    
                      placeholder="Confirm password"
                      InputProps={{
                        endAdornment: (
                          <div
                            onClick={togglePasswordVisibility2}
                            style={{ cursor: "pointer" }}
                          >
                            {confirmPassword ? (
                              <VisibilityIcon className="eye-icon" />
                            ) : (
                              <VisibilityOffIcon className="eye-icon" />
                            )}
                          </div>
                        ),
                      }}
                    />
                  </div>
                 
                  <div className="login-button-area  flex justify-center items-center mt-8">
                  <Button
                  type="submit"
  variant="contained"
  style={buttonStyles}
  disabled={loading}
>
  {loading ? (
    <div> <span className="me-4">Saving...
    </span>
      <CircularProgress
        style={{ color: "white", height: 20, width: 20 }}
      />
    </div>
  ) : (
    "Save"
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

export default ConfirmPassword;
