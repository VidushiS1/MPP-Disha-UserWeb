import React, { useState } from "react";
import Logo from "../../assets/drwerdishaicon.png";
import StadyTree from "../../assets/Forgot password.gif";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { forgetPasswordData } from "../../../rtk/features/LoginForm/ForgetPasswordSlice";
import { toast } from "react-toastify";
import "./login-form.css";
import { useNavigate } from "react-router-dom";

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
  width: "25%",
};

const buttonStyles2 = {
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
  width: "25%",
};

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const customId = "custom-id-yes";
  const Navigate = useNavigate();

  const [fromDetail, setFormDetail] = useState({
    email: "",
  });

  console.log("fromDetail", fromDetail);

  const [loading, setLoading] = useState(false);

  const loginDetailsHandler = (e) => {
    const { name, value } = e.target;
    setFormDetail((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromDetail.email) {
      toast.error("Email is required", {
        toastId: customId,
      });
      return;
    }

    try {
      setLoading(true);
      const response = await dispatch(forgetPasswordData(fromDetail));
      console.log("success response", response);
      if (response.payload?.message) {
        toast.success(response.payload?.message, {
          toastId: customId,
        });
        setLoading(false);
        Navigate("/confirm-otp");
      }
    } catch (error) {
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
                    <div className="w-100 flex justify-center items-center flex-col mb-5">
                      <div className="singUp-screen-layout text-2xl">
                        Forget Password
                      </div>
                      <p className="singUp-screen-layout font-300 mt-5 text-center  text-base text-black text-opacity-80 font-semibold">
                        Enter your email for the verification process we will
                        send{" "}
                      </p>
                      <p className="singUp-screen-layout font-300  mb-8 text-center  text-base text-black text-opacity-80 font-semibold">
                        4 digit code to your email
                      </p>
                      <TextField
                        sx={{ width: "50%" }}
                        name="email"
                        type="email"
                        value={fromDetail.email}
                        onChange={loginDetailsHandler}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="login-button-area  flex justify-center items-center mt-8 gap-4">
                      <Button
                        variant="contained"
                        style={buttonStyles1}
                        onClick={() => Navigate("/login")}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        style={buttonStyles2}
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Submit"}
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

export default ForgetPassword;
