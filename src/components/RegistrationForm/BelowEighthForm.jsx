import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/drwerdishaicon.png";
import StadyTree from "../../assets/BelowEighthForm.gif";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, CircularProgress, IconButton, TextField,Select,MenuItem } from "@mui/material";
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
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import {addBelowEightData} from "../../../rtk/features/RegistrationForm/addBelowEightDataSlice"

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
  const [loading, setLoading] = useState(false);
  const dateFormat = "YYYY";
  const [selectedDate, setSelectedDate] = useState(
    dayjs( dateFormat)
  );

  const getTokenFromLocalStorage = () => {
    const student_id = localStorage.getItem("student_id");
    return student_id || "";
  };

  const [belowEightInfoForm,setBelowEightInfoForm] = useState({
    student_id:getTokenFromLocalStorage(),
    below_8th_achivement:"",
    below_8th_education_mode:"",
    below_8th_parcentage:"",
    below_8th_passing_year:"" ,
    below_8th_education_medium:"",
    below_8th_school_name:"",
    below_8th_class_name:"" ,
  })



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "below_8th_school_name") {
      const alphanumericPattern = /^[A-Za-z0-9\s.,]*$/; 
      if (!alphanumericPattern.test(value)) {
          return;
      }
  }
  
  
  
  if (name === "below_8th_parcentage") {
    let valueP = parseInt(value, 10);
          if (!isNaN(valueP) && valueP >= 0 && valueP <= 100) {
      setBelowEightInfoForm({
        ...belowEightInfoForm,
        [name]: valueP.toString().padStart(2, "0")
      });
    }
  } else {
      setBelowEightInfoForm({
        ...belowEightInfoForm,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };
  





 



  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };
  const maxDate = dayjs().subtract(0, "day");

  const [fileName, setFileName] = useState("");

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFileName(file);
  };

  useEffect(() => {
    setBelowEightInfoForm((prevFormValue) => ({
      ...prevFormValue,
      below_8th_passing_year: selectedDate?.format(dateFormat),
      below_8th_achivement:fileName
    }));
  }, [selectedDate,fileName]);

  const handleBack = () => {
    Navigate("/student-select-qualification");
  }



  const requiredField = ["student_id","below_8th_education_mode","below_8th_parcentage","below_8th_passing_year","below_8th_education_medium","below_8th_class_name","below_8th_school_name",];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
  
      const formData = new FormData();
  
      // Append each key-value pair from belowEightInfoForm to formData
      for (const key in belowEightInfoForm) {
        formData.append(key, belowEightInfoForm[key]);
      }
  
      const hasEmptyFields = requiredField.some(
        (fields) => !belowEightInfoForm[fields]
      );
      if (hasEmptyFields) {
        toast.error("Please fill all the required fields", {
          toastId: customId,
        });
        return;
      }
  
      if (belowEightInfoForm?.below_8th_passing_year === "Invalid Date") {
        toast.error("Please Select the year of Passing.", {
          toastId: customId,
        });
        return;
      }

      if (belowEightInfoForm?.below_8th_parcentage === "00") {
        toast.error("Please enter the valid percentage", {
          toastId: customId,
        });
        return;
      }
  
      const actionResult = await dispatch(addBelowEightData(formData));
      if (actionResult?.payload?.message) {
        setLoading(false);
        toast.success(actionResult?.payload?.message, { toastId: customId });
        Navigate("/student-hobbies");
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  


  console.log("belowEightInfoForm",belowEightInfoForm);

  const ClassOptions = [{value:"Class 1st"},{value:"Class 2nd"},{value:"Class 3rd"},{value:"Class 4th"},{value:"Class 5th"},{value:"Class 6th"},{value:"Class 7th"}]

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
                        {/* <TextField
                          sx={{ width: "228px" }}
                          name="below_8th_class_name"
                          value={belowEightInfoForm.below_8th_class_name}
                          onChange={handleChange}
                          placeholder="Please Enter Class Name"
                        /> */}
                         <Select
        labelId="below-8th-class-name-label"
        id="below-8th-class-name"
        name="below_8th_class_name"
        value={belowEightInfoForm.below_8th_class_name}
        onChange={handleChange}
        placeholder="Please Select Class Name"
        sx={{ width: "252px" }}
      >
        <MenuItem value="">Select Class Name</MenuItem>
        {
          ClassOptions.map((item)=>(
            <MenuItem value={item.value}>{item.value}</MenuItem>
          ))
        }
       
      </Select>
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
                          name="below_8th_school_name"
                          value={belowEightInfoForm.below_8th_school_name}
                          onChange={handleChange}
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
                          name="below_8th_education_medium"
                          value={belowEightInfoForm.below_8th_education_medium}
                          onChange={handleChange}
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
                            value={selectedDate}
                            onChange={handleDateChange}
                            maxDate={maxDate}
                             
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
                          name="below_8th_parcentage"
                          value={belowEightInfoForm.below_8th_parcentage}
                          onChange={handleChange}
                          placeholder="Please Enter Percentage %"
                          inputProps={{ min: "0", max: "100" }}
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
                          name="below_8th_education_mode"
                          value={belowEightInfoForm.below_8th_education_mode}
                          onChange={handleChange}
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
                          value={fileName?.name}
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
