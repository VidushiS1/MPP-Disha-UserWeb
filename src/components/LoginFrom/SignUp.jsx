import React, { useEffect, useRef, useState } from "react";
import Logo from "../../assets/drwerdishaicon.png";
import StadyTree from "../../assets/Sign up.gif";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button,CircularProgress,TextField } from "@mui/material";
import {useSelector , useDispatch} from "react-redux"
import {addSignUpData} from "../../../rtk/features/LoginForm/addSignUpDataSlice"
import { toast } from "react-toastify";
import "./login-form.css";
import { Link, useNavigate } from "react-router-dom";
import { GetCityList } from "../../../rtk/features/City/GetCityListSlice";
import ReactSelect from "react-select";



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
const SignUp = () => {
const dispatch = useDispatch();
const customId = "custom-id-yes";
const Navigate = useNavigate();


useEffect(() => {
    dispatch(GetCityList());
  }, []);

  const cityList = useSelector((state) => state.GetCityList?.users?.data);
  console.log("cityList", cityList);

  const formattedCityList = cityList?.map((city) => ({
    value: city._id,
    label: `${city.city}`,
  }));
  console.log("formattedCityList", formattedCityList);



  const [fromDetail, setFormDetail] = useState({
    name:"",
    email:"",
    employee_id:"",
    mobile_no:"",
    city:"",
    password:"",
    confirm_password:"",
    language:"English",
    fcm_token:  "fdugihjhgydfijlkui0789i"
  });
  console.log("fromDetail", fromDetail);

  const [newSelecteItem,setNewSelectedItem] = useState("")

const handleCityChange = (selectedOption) => {
  setNewSelectedItem(selectedOption)
  if (selectedOption) {
    setFormDetail({
      ...fromDetail,
      city: selectedOption.label, 
    });
  }
};


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };


const loginDetailsHandler = (e) =>{
    const {name,value} = e.target;

    if (name === "name") {
       
        const alphabeticPattern = /^[A-Za-z\s]*$/;
        if (!alphabeticPattern.test(value)) {
          return ;
        }
      }

      else if (name === "mobile_no") {
        const numericPattern = /^[0-9]*$/; 
        if (!numericPattern.test(value) || value.length > 10) {
          return;
        }
      } 

    setFormDetail((prevDetails) => ({
      ...prevDetails,
      [name]: value,
  }));
}


const requiredField = ["name","email","employee_id","mobile_no","city","password","confirm_password"]

// const handleSubmit = () => {
//   Navigate("/student-registration-information-form");
// }

const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Required fields check
    const hasEmptyFields = requiredField.some((field) => !fromDetail[field]);
    if (hasEmptyFields) {
      toast.error("Please fill all the required fields", {
        toastId: customId,
      });
      return;
    }

    if (fromDetail.mobile_no?.length !== 10) {
        toast.error("Please enter a 10-digit mobile number", {
            toastId: customId,
        });
        return;
    }
  
    // Password and confirm password match check
    if (fromDetail.password !== fromDetail.confirm_password) {
      toast.error("Passwords and confirm password do not match", {
        toastId: customId,
      });
      return;
    }

    if (fromDetail.password.length < 8 || fromDetail.confirm_password.length < 8) {
        toast.error("Password and confirm password should be at least 8 characters long", {
            toastId: customId,
        });
        return;
    }


    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fromDetail.email)) {
      toast.error("Please enter a valid email address", {
        toastId: customId,
      });
      return;
    }
  
    try {
      setLoading(true);
      const response = await dispatch(addSignUpData(fromDetail));
      console.log("success response", response);
      if (response.payload?.message === "User signed up successfully.") {
        toast.success(response.payload?.message, {
          toastId: customId,
        });
        Navigate("/student-registration-information-form");
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
            <div className="right-side-img-area overflow-y-hidden flex justify-center items-center w-100">
              <img src={StadyTree} alt="" style={{ height: "720px", }} />
            </div>
          </div>
          <div className="w-1/2">
            <div className="main-login-container">
              <div className="login-form-layout-main ">
                <div className="top-img-area mb-4  flex justify-center items-center">
                <h1 className="text-2xl font-semibold">Sign Up</h1>{" "}
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="buttom-loginform-area ">
                  <div className="mb-3 w-100 flex justify-center items-center">
                      <TextField
                        sx={{ width: "50%" }}
                        name="name"
                        type="text"
                        value={fromDetail.name}
                        onChange={loginDetailsHandler}
                        placeholder="Enter name"
                      />
                    </div> <div className="mb-3 w-100 flex justify-center items-center">
                      <TextField
                        sx={{ width: "50%" }}
                        name="email"
                        type="email"
                        value={fromDetail.email}
                        onChange={loginDetailsHandler}
                        placeholder="Enter email"
                      />
                    </div> <div className="mb-3 w-100 flex justify-center items-center">
                      <TextField
                        sx={{ width: "50%" }}
                        name="employee_id"
                        type="text"
                        value={fromDetail.employee_id}
                        onChange={loginDetailsHandler}
                        placeholder="Enter employee ID"
                      />
                    </div> <div className="mb-3 w-100 flex justify-center items-center">
                    <ReactSelect
    className="block appearance-none w-1/2 bg-white p-0 rounded-md focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-offset-2"
    classNamePrefix="select City"
    options={formattedCityList}
    value={newSelecteItem}
    onChange={handleCityChange}
    name="city"
    placeholder="Select City"
    styles={{
        control: (baseStyles, state) => ({
            ...baseStyles,
            border: "1px solid #AC885A",
            boxShadow: state.isFocused ? "#AC885A" : "", // For focused state
            borderColor: state.isFocused ? "#AC885A" : "",
            "&:hover": {
                borderColor: state.isFocused ? "#AC885A" : "",
            },
            minHeight: "34px",
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused ? "#f6f3ee" : baseStyles.backgroundColor,
            backgroundColor: state.isSelected ? "#d4c2aa" : "",
            "&:hover": {
                backgroundColor: "#f6f3ee",
            },
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            paddingTop: 0,
            paddingBottom: 0,
        }),
        placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "#a1a1a1", // Placeholder color
            fontSize: "14px", // Match font size with TextField
            fontWeight:"400",
            
          
        }),
    }}
    menuPlacement="auto"
    menuPosition="fixed"
    MenuProps={{
        PaperProps: {
            style: {
                maxHeight: "200px",
                width: "400px",
                position: "absolute",
                top: "100%",
                left: 0,
                zIndex: 1,
            },
        },
    }}
/>

                    </div> <div className="mb-3 w-100 flex justify-center items-center">
                      <TextField
                        sx={{ width: "50%" }}
                        name="mobile_no"
                        type="text"
                        value={fromDetail.mobile_no}
                        onChange={loginDetailsHandler}
                        placeholder="Enter mobile number"
                        inputProps={{
                            maxLength: 10, 
                            pattern: "[0-9]*", 
                          }}
                      />
                    </div>
                    <div className="mb-3 w-100 flex justify-center items-center">
                      <TextField
                        // required
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
                    <div className="mb-1 w-100 flex justify-center items-center">
                      <TextField
                        // required
                        sx={{ width: "50%" }}
                        name="confirm_password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={fromDetail.confirm_password}
                        onChange={loginDetailsHandler}
                        placeholder="Enter confirm password"
                        InputProps={{
                          endAdornment: (
                            <div
                              onClick={toggleConfirmPasswordVisibility}
                              style={{ cursor: "pointer" }}
                            >
                              {showConfirmPassword ? (
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
                   
                    <div className="login-button-area  flex justify-center items-center mt-5">
                      <Button
                        type="submit"
                        variant="contained"
                        style={buttonStyles}
                        disabled={loading}
                      >
                       {loading ? (
    <div>
        Signing Up... <CircularProgress style={{ color: "white", height: 15, width: 15 }}/>
    </div>
) : (
    "Sign Up"
)}

                      </Button>
                    </div>
                    <div className="forgaote-password mb-4">
                      <div className="mid-forgot-password-area">
                      <Link to="/login">
                          Already a member?{" "}
                          <span className="singUp-screen-layout">Log in</span>
                          </Link>
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

export default SignUp;
