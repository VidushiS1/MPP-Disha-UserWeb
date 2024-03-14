import React, { useState, useEffect, useRef } from "react";
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
import {addStuentRegistrationInformationData} from "../../../rtk/features/RegistrationForm/addStuentRegistrationInformationDataSlice"
import dayjs from "dayjs";

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
  const [loading, setLoading] = useState(false);

  const addSignUpData2 = useSelector((state) => state.addSignUpData?.users?.data);
  console.log("addSignUpData2", addSignUpData2);

const [registrationInfoForm,setRegistrationInfoFrom] = useState({
  student_name:addSignUpData2?.name || "",
  dob:"",
  gender:"",
  category:"",
  father_name:"" ,
  father_occupation:"",
  mother_name:"",
  mother_occupation:"" ,
  name:"",
  designation:"",
  posting_unit:"",
  relation:""
})




const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (
    name === "student_name" ||
    name === "father_name" ||
    name === "father_occupation" ||
    name === "mother_name" ||
    name === "mother_occupation" ||
    name === "name" ||
    name === "relation"
  ) {
    const alphabeticPattern = /^[A-Za-z\s]*$/;

    if (!alphabeticPattern.test(value)) {
      return;
    }
  }

  setRegistrationInfoFrom({
    ...registrationInfoForm,
    [name]: type === "checkbox" ? checked : value,
  });
};



const requiredField = ["student_name","gender","category","father_name","father_occupation","mother_name","mother_occupation","designation","posting_unit","relation"];

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);
  

    const hasEmptyFields = requiredField.some(
      (fields) => !registrationInfoForm[fields]
    );
    if (hasEmptyFields) {
      toast.error("Please fill all the required fields", {
        toastId: customId,
      });
      return;
    }

    if(registrationInfoForm?.dob === "Invalid Date"){
      toast.error("Please Select the DOB.", {
        toastId: customId,
      });
      return
    }

      const actionResult = await dispatch(
      addStuentRegistrationInformationData(registrationInfoForm)
    );
    if (actionResult?.payload?.message) {
      setLoading(false);
      toast.success(actionResult?.payload?.message, { toastId: customId });
      Navigate("/student-select-qualification");
    }
  } catch (error) {
    console.log("error", error);
    setLoading(false);
  } finally {
    setLoading(false);
  }
};


  const dateFormat = "DD/MM/YYYY";
  const [selectedDate, setSelectedDate] = useState(
    dayjs( dateFormat)
  );

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };
  const maxDate = dayjs().subtract(0, "day");
  useEffect(() => {
    setRegistrationInfoFrom((prevFormValue) => ({
      ...prevFormValue,
      dob: selectedDate?.format(dateFormat),
    }));
  }, [selectedDate]);
  
  console.log("registrationInfoForm",registrationInfoForm);

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
                    onClick={()=>Navigate("/sign-up")}
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
                          htmlFor="student_name"
                          className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                          placeholder="Please Enter Name"
                        >
                          Name
                        </label>
                        <TextField
                          sx={{ width: "220px" }}
                          id="student_name"
                         name="student_name"
                         value={registrationInfoForm.student_name}
                         onChange={handleChange}
                         inputProps={{
                          readOnly:true
                         }}
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
                            value={selectedDate}
                            onChange={handleDateChange}
                            maxDate={maxDate}
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
                          name="gender"
                          value={registrationInfoForm.gender}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                             label="Female"
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
                           
    
                          />
                          <FormControlLabel
                           value="male"
                           label="Male"
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
                            
                          />
                          <FormControlLabel
                           value="other"
                           label="Other"
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
                          name="category"
                          value={registrationInfoForm.category}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="general"
                            label="General"
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
                           
                          />
                          <FormControlLabel
                            value="obc"
                            label="OBC"
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
                            
                          />
                          <FormControlLabel
                            value="sc"
                            label="SC"
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
                            
                          />
                          <FormControlLabel
                            value="st"
                            label="ST"
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
                            
                          />
                          <FormControlLabel
                            value="ews"
                            label="EWS"
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
                            
                          />
                          <FormControlLabel
                            value="nt"
                            label="NT"
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
                          name="father_name"
                          value={registrationInfoForm.father_name}
                          onChange={handleChange}
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
                          name="father_occupation"
                          value={registrationInfoForm.father_occupation}
                          onChange={handleChange}
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
                          name="mother_name"
                          value={registrationInfoForm.mother_name}
                          onChange={handleChange}
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
                          name="mother_occupation"
                          value={registrationInfoForm.mother_occupation}
                          onChange={handleChange}
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
                          name="name"
                          value={registrationInfoForm.name}
                          onChange={handleChange}
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
                          name="designation"
                          value={registrationInfoForm.designation}
                          onChange={handleChange}
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
                          name="posting_unit"
                          value={registrationInfoForm.posting_unit}
                          onChange={handleChange}
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
                          name="relation"
                          value={registrationInfoForm.relation}
                          onChange={handleChange}
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
