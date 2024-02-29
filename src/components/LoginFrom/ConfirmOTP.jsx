import React, { useEffect, useState } from "react";
import Logo from "../../assets/drwerdishaicon.png";
import StadyTree from "../../assets/Enter OTP.gif";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { loginFormData } from "../../../rtk/features/LoginForm/LoginSlice";
import { toast } from "react-toastify";
import { MuiOtpInput } from "mui-one-time-password-input";
import { styled } from "@mui/system";
import { forgetPasswordData } from "../../../rtk/features/LoginForm/ForgetPasswordSlice";
import { ConfirmOtpData } from "../../../rtk/features/LoginForm/ConfirmOtpDataSlice";

import "./login-form.css";
import { Link, useNavigate } from "react-router-dom";




  const MuiOtpInputStyled = styled(MuiOtpInput)({
    display: "flex",
    gap: "0px",
    marginInline: "auto",
    "& .MuiFormControl-root": {
      width: "70px",
    },
    "& .MuiInputBase-root": {
      border: "1px solid #FFF", // Border style
      borderRadius: "7px", // Border radius
      padding: "12px 0px",
      margin: "0px 12px ",
      // background: " #ffffff38",
    },
    "& input": {
      color: "#000", // Text color
    },
  });

    const buttonStyles1 = {
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

const ConfirmOTP = () => {
  const dispatch = useDispatch();
  const customId = "custom-id-yes";
  const Navigate = useNavigate();
  const [otp, setOtp] = React.useState("----");
  const [resendTimer, setResendTimer] = useState(60); // Initial timer value (in seconds)
  const [resentCode, setResentCode] = useState(true);
  const forgetPasswordData2 = useSelector(
    (state) => state.forgetPasswordData?.users?.data
  );

  console.log("forgetPasswordData2", forgetPasswordData2);

  const [loading, setLoading] = useState(false);




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp === "----") {
      toast.error("Please enter the OTP", {
        toastId: customId,
      });
      return;
    }

    const objToSentInOtp = {
      email: forgetPasswordData2,
      otp: parseInt(otp),
    };

    try {
      setLoading(true);
      const response = await dispatch(ConfirmOtpData(objToSentInOtp));
      console.log("response", response);

      if (response?.payload?.status === true) {
        toast.success("OTP Verified Successfully", {
          toastId: customId,
        });
        Navigate("/confirm-password");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        toastId: customId,
      });
    } finally {
      setLoading(false);
    }
  };
   
 const handleChange = (newValue) => {
   setOtp(newValue);
 };
  const ResendOptDataSubmit = async () => {
    try {
      const fromDetail = {
        email: forgetPasswordData2,
      };
      const response = await dispatch(forgetPasswordData(fromDetail));
      console.log("response", response);

      if (response.payload?.status === true) {
        toast.success("OTP has been resent to your registered email address.", {
          toastId: customId,
        });
        setResentCode(false);
        setOtp("----");
        startResendTimer();
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        toastId: customId,
      });
    }
  };

  const startResendTimer = () => {
    setResendTimer(60); // Reset the timer to its initial value
    const intervalId = setInterval(() => {
      setResendTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      setResentCode(true); // Allow the user to click on "Resend OTP" after the timer ends
    }, 60000); // Stop the timer after 60 seconds
  };

  useEffect(() => {
    if (resendTimer === 0) {
      // Timer reached 0, stop the timer
      clearInterval(resendTimer);
    }
  }, [resendTimer]);

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
                      <div className="singUp-screen-layout text-2xl">
                        Enter 4 digit code
                      </div>
                      <p className="singUp-screen-layout font-300 mt-3 mb-8 text-base text-black text-opacity-80 font-semibold">
                        Enter 4 digit code that you have received on your email.
                      </p>
                      <div className="input-container  mb-3">
                        <MuiOtpInputStyled
                          value={otp}
                          length={4}
                          onChange={handleChange}
                        />
                      </div>

                      {resentCode ? (
                        <a
                          class="text-center text-sm text-blue-500 border-b border-blue-500 hover:border-blue-700 cursor-pointer"
                          onClick={ResendOptDataSubmit}
                        >
                          Resend Code
                        </a>
                      ) : (
                        <p
                          style={{ color: "#000", fontSize: "14px" }}
                          className=" text-black text-opacity-80 font-semibold text-sm"
                        >
                          Resend OTP in {resendTimer} seconds
                        </p>
                      )}
                    </div>
                    <div className="login-button-area  flex justify-center items-center mt-8 gap-4">
                      <Button
                        type="submit"
                        variant="contained"
                        style={buttonStyles1}
                        disabled={loading}
                      >
                        {loading ? (
                          <div>
                            {" "}
                            <span className="me-4">Submitting...</span>
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

export default ConfirmOTP;
