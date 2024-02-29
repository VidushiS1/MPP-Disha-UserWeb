import React, { useState } from "react";
import Logo from "../../assets/drwerdishaicon.png";
import StadyTree from "../../assets/college students.gif";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button,CircularProgress,TextField } from "@mui/material";
import {useSelector , useDispatch} from "react-redux"
import {loginFormData} from "../../../rtk/features/LoginForm/LoginSlice"
import { toast } from "react-toastify";

import "./login-form.css";
import { Link, useNavigate } from "react-router-dom";

const LoginFrom = () => {
const dispatch = useDispatch();
const customId = "custom-id-yes";
const Navigate = useNavigate();

  const [fromDetail, setFormDetail] = useState({
    email: "",
    password: "",
    fcm_token:  "wertyuioplkjhgfdsazsxcvbnmmnbgfdsderfghj"
  });
  console.log("fromDetail", fromDetail);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const loginDetailsHandler = ({ target: { name, value } }) => {
    if (name === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            setEmailError("Please enter your email address");
        } else if (!emailPattern.test(value)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }

        if (!emailError) {
            setFormDetail((prevDetails) => ({
                ...prevDetails,
                [name]: value,
            }));
        }
    }

    if (name === "password") {
      if (!value) {
        setPasswordError("Please enter your password");
      } else {
        setPasswordError("");
      }
    }

    // Update the state for email or password based on the validation
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email and password are empty
    if (!fromDetail.email || !fromDetail.password) {
      toast.error("Email and password are required", {
        toastId: customId,
      });
      return;
    }

  

    try {
      setLoading(true);
      const response = await dispatch(loginFormData(fromDetail));
      console.log("success response", response);
      if (response.payload?.data?.message === "login successfully.") {
        toast.success("Login Successful", {
          toastId: customId,
        });
        Navigate("/");
      } else {
        console.log("error response", response);
        toast.error(
          response.payload?.data?.message || "Email or Password Does Not Exist",
          {
            toastId: customId,
          }
        );
      }
    } catch (error) {
      // Handle specific error messages if needed
      toast.error("An error occurred. Please try again.", {
        toastId: customId,
      });
    } finally {
      setLoading(false);
    }
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
                    <div className="mb-3 w-100 flex justify-center items-center">
                      <TextField
                        sx={{ width: "50%" }}
                        name="email"
                        type="email"
                        value={fromDetail.email}
                        onChange={loginDetailsHandler}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="mb-1 w-100 flex justify-center items-center">
                      <TextField
                        // required
                        sx={{ width: "50%" }}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={fromDetail.password}
                        onChange={loginDetailsHandler}
                        placeholder="Enter your password"
                        InputProps={{
                          endAdornment: (
                            <div
                              onClick={togglePasswordVisibility}
                              style={{ cursor: "pointer" }}
                            >
                              {showPassword ? (
                                 <VisibilityIcon
                                 className="eye-icon"
                                 sx={{ color: "#AC885A" }}
                               />
                              ) : (
                               
                                <VisibilityOffIcon
                                  className="eye-icon"
                                  sx={{ color: "#AC885A" }}
                                />
                              )}
                            </div>
                          ),
                        }}
                      />
                    </div>
                    <div className="forgaote-password mb-5">
                      <div className="mid-forgot-password-area">
                        <Link to="/forget-password">Forgot password?</Link>
                      </div>
                    </div>
                    <div className="login-button-area  flex justify-center items-center">
                      <Button
                        type="submit"
                        variant="contained"
                        style={buttonStyles}
                        disabled={loading}
                      >
                        {loading ? (
                          <div>
                          Logging in... <CircularProgress style={{ color: "white", height: 15, width: 15 }}/>
                          </div>
                        ) : (
                          "Login"
                        )}
                      </Button>
                    </div>
                    <div className="forgaote-password mb-4">
                      {/* <div className="mid-forgot-password-area">
                        <a href="">
                          You don't have an account yet?{" "}
                          <span className="singUp-screen-layout">Sign Up</span>
                        </a>
                      </div> */}
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

export default LoginFrom;
