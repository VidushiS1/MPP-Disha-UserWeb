import React, { useState,useEffect } from "react";
import Logo from "../../assets/drwerdishaicon.png";
import StadyTree from "../../assets/job-seeker.gif";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, CircularProgress, IconButton, TextField,Checkbox,Select,MenuItem } from "@mui/material";
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
import dayjs from "dayjs";
import {addJobSeekerData} from "../../../rtk/features/RegistrationForm/addJobSeekerDataSlice"


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
const JobSeekerForm = () => {
  const dispatch = useDispatch();
  const customId = "custom-id-yes";
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dateFormat = "YYYY";
  const [isFieldDisabled, setIsFieldDisabled] = useState(false);
  const maxDate = dayjs().subtract(0, "day");

  const [selectedDate, setSelectedDate] = useState(
    dayjs( dateFormat)
  );
  const [selectedDateTenth, setSelectedDateTenth] = useState(
    dayjs( dateFormat)
  );
  const [selectedDateTwelfth, setSelectedDateTwelfth] = useState(
    dayjs( dateFormat)
  );
  const [selectedDateUgdp, setSelectedDateUgdp] = useState(
    dayjs( dateFormat)
  );
  const [selectedDatePg, setSelectedDatePg] = useState(
    dayjs( dateFormat)
  );
  const getTokenFromLocalStorage = () => {
    const student_id = localStorage.getItem("student_id");
    return student_id || "";
  };




 const [jobSeekerForm,setjobSeekerForm] = useState({
    student_id:getTokenFromLocalStorage(),
    job_role:"",
    parcentage:"",
    passing_year:"" ,
    school_name:"",
    class_name:"" ,
    school_name_10th:"",
    board_10th:"" ,
    parcentage_10th:"",
    passing_year_10th:"" ,
    passing_year_12th:"" ,
    parcentage_12th:"" ,
    board_12th:"" ,
    school_name_12th:"" ,
    subject_12th:"",
    institute_ug:"",
    course_ug:"",
    passing_year_ug:"",
    parcentage_ug:"",
    passing_year_pg:"",
    parcentage_pg:"",
    course_pg:"",
    institute_pg:"",
  })




  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "school_name" || name === "school_name_10th" || name === "school_name_12th" || name === "institute_ug" || name === "institute_pg" || name === "subject_12th") {
      const alphanumericPattern = /^[A-Za-z0-9\s.,]*$/; 
      if (!alphanumericPattern.test(value)) {
          return;
      }
  }

  if (name === "board_10th" || name === "board_12th") {
    const alphabeticPattern = /^[A-Za-z\s]*$/;
    if (!alphabeticPattern.test(value)) {
        return;
    }
}


if (name === "course_ug" || name === "course_pg") {
  const alphabeticPattern = /^[A-Za-z\s.]*$/;
  if (!alphabeticPattern.test(value)) {
      return;
  }
}
  
    if (name === "parcentage" || name === "parcentage_10th" || name === "parcentage_12th" || name === "parcentage_ug" || name === "parcentage_pg") {
      let valueP = parseInt(value, 10);
            if (!isNaN(valueP) && valueP >= 0 && valueP <= 100) {
        setjobSeekerForm({
          ...jobSeekerForm,
          [name]: valueP.toString().padStart(2, "0")
        });
      }
    } else {
      setjobSeekerForm({
        ...jobSeekerForm,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };



  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

  
  const handleDateChangeTenth = (newValue) => {
    setSelectedDateTenth(newValue);
  };

  const handleDateChangeTwelfth = (newValue) => {
    setSelectedDateTwelfth(newValue);
  };

    const handleDateChangeUgdp = (newValue) => {
    setSelectedDateUgdp(newValue);
  };

  const handleDateChangePg = (newValue) => {
    setSelectedDatePg(newValue);
  };




  useEffect(() => {
    setjobSeekerForm((prevFormValue) => ({
      ...prevFormValue,
      passing_year: selectedDate?.format(dateFormat),
      passing_year_10th: selectedDateTenth?.format(dateFormat),
      passing_year_12th: selectedDateTwelfth?.format(dateFormat),
      passing_year_ug: selectedDateUgdp?.format(dateFormat),
      passing_year_pg: selectedDatePg?.format(dateFormat),
    }));
  }, [selectedDate,selectedDateTenth,selectedDateTwelfth,selectedDateUgdp,selectedDatePg]);


  const requiredField = ["student_id","job_role"];


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
  
      const hasEmptyFields = requiredField.some(
        (field) => !jobSeekerForm[field]
      );
      if (hasEmptyFields) {
        toast.error("Please select the job role", {
          toastId: customId,
        });
        return;
      }
  
      if (
        !(
          jobSeekerForm.parcentage &&
          jobSeekerForm.passing_year !== "Invalid Date" &&
          jobSeekerForm.school_name &&
          jobSeekerForm.class_name
        ) &&
        (
          !(
            jobSeekerForm.school_name_10th &&
            jobSeekerForm.board_10th &&
            jobSeekerForm.parcentage_10th &&
            jobSeekerForm.passing_year_10th !== "Invalid Date"
          ) &&
          !(
            jobSeekerForm.school_name_12th &&
            jobSeekerForm.board_12th &&
            jobSeekerForm.parcentage_12th &&
            jobSeekerForm.passing_year_12th !== "Invalid Date" &&
            jobSeekerForm.subject_12th
          ) &&
          !(
            jobSeekerForm.institute_ug &&
            jobSeekerForm.passing_year_ug !== "Invalid Date" &&
            jobSeekerForm.parcentage_ug &&
            jobSeekerForm.course_ug
          ) &&
          !(
            jobSeekerForm.institute_pg &&
            jobSeekerForm.passing_year_pg !== "Invalid Date" &&
            jobSeekerForm.parcentage_pg &&
            jobSeekerForm.course_pg
          )
        )
      ) {
        toast.error("Please fill at least any one complete graduation data", {
          toastId: customId,
        });
        return;
      }
      
      
  
      const actionResult = await dispatch(addJobSeekerData(jobSeekerForm));
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
  

console.log("jobSeekerForm",jobSeekerForm);



  const handleBack = () => {
    Navigate("/student-select-qualification");
  };

  const ClassOptions = [{value:"Class 1st"},{value:"Class 2nd"},{value:"Class 3rd"},{value:"Class 4th"},{value:"Class 5th"},{value:"Class 6th"},{value:"Class 7th"},{value:"Class 8th"},{value:"Class 9th"}]


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
            <div
              className="main-login-container  overflow-y-scroll scrollbar-hide main-right-side-section-main"
              style={{ height: "100vh" }}
            >
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
                    Job Seeker
                  </h1>

                  <img src={Logo} alt="logo" className="h-20 " />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="buttom-loginform-area ">
                    <>
                      <div className="flex justify-center items-center mb-6 mt-6">
                        <h1 className="text-center text-lg font-bold text-slate-600 ">
                          Please Select Any One
                        </h1>
                      </div>
                      <div className="mb-3 w-full flex justify-between items-center">
                        <div className="flex flex-col">
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="job_role"
                            value={jobSeekerForm.job_role}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              value="Gov. Job"
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
                              label="Gov. Job"
                            />
                            <FormControlLabel
                              value="Private Job"
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
                              label="Private Job"
                            />
                            <FormControlLabel
                              value="Self Employment"
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
                              label="Self Employment"
                            />
                          </RadioGroup>
                        </div>
                      </div>
                      <div className="flex justify-center items-center mb-6 mt-6">
                        <h1 className="text-center text-lg font-bold text-slate-600 ">
                          Below 10th
                        </h1>
                      </div>
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
                            name="class_name"
                          value={jobSeekerForm.class_name}
                          onChange={handleChange}
                            placeholder="Please Enter Class Name"
                          /> */}
                           <Select
        labelId="below-8th-class-name-label"
        id="below-8th-class-name"
        name="class_name"
        value={jobSeekerForm.class_name}
        onChange={handleChange}
        placeholder="Please Select Class Name"
        sx={{ width: "228px" }}
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
                            name="school_name"
                          value={jobSeekerForm.school_name}
                          onChange={handleChange}
                            placeholder="Please Enter School Name"
                          />
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
                                  width:"228px"
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
                            name="parcentage"
                            value={jobSeekerForm.parcentage}
                            onChange={handleChange}
                            placeholder="Please Enter Percentage %"
                          />
                        </div>
                      </div>
                    </>
                    <>
                      <div className="flex justify-center items-center mb-6 mt-8">
                        <h1 className="text-center text-lg font-bold text-slate-600 ">
                          Class 10th
                        </h1>
                      </div>
                      <div className="mb-3 w-full flex justify-between items-center">
                        <div className="flex flex-col">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                          >
                            School Name
                          </label>
                          <TextField
                            sx={{ width: "228px" }}
                            name="school_name_10th"
                            value={jobSeekerForm.school_name_10th}
                            onChange={handleChange}
                            placeholder="Please Enter School Name"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="dob"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                          >
                            Board
                          </label>
                          <TextField
                            sx={{ width: "228px" }}
                            name="board_10th"
                            value={jobSeekerForm.board_10th}
                            onChange={handleChange}
                            placeholder="Please Enter Board Name"
                          />
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
                                  width:"228px"
                                },
                                "& .MuiSvgIcon-root": {
                                  color: "#AC885A",
                                },
                              }}
                              value={selectedDateTenth}
                              onChange={handleDateChangeTenth}
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
                            name="parcentage_10th"
                          value={jobSeekerForm.parcentage_10th}
                          onChange={handleChange}
                          placeholder="Please Enter Percentage %"
                          />
                        </div>
                      </div>
                    </>
                    <>
                      <div className="flex justify-center items-center mb-6 mt-8">
                        <h1 className="text-center text-lg font-bold text-slate-600 ">
                          Class 12th
                        </h1>
                      </div>
                      <div className="mb-3 w-full flex justify-between items-center">
                        <div className="flex flex-col">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                          >
                            School Name
                          </label>
                          <TextField
                            sx={{ width: "228px" }}
                            name="school_name_12th"
                            value={jobSeekerForm.school_name_12th}
                            onChange={handleChange}
                            placeholder="Please Enter School Name"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="dob"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                          >
                            Board
                          </label>
                          <TextField
                            sx={{ width: "228px" }}
                            name="board_12th"
                          value={jobSeekerForm.board_12th}
                          onChange={handleChange}
                            placeholder="Please Enter Board Name"
                          />
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
                                  width:"228px"
                                },
                                "& .MuiSvgIcon-root": {
                                  color: "#AC885A",
                                },
                              }}
                              value={selectedDateTwelfth}
                              onChange={handleDateChangeTwelfth}
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
                            name="parcentage_12th"
                            value={jobSeekerForm.parcentage_12th}
                            onChange={handleChange}
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
                           Subject
                          </label>
                          <TextField
                            sx={{ width: "230px" }}
                            name="subject_12th"
                            value={jobSeekerForm.subject_12th}
                            onChange={handleChange}
                            placeholder="Please Enter Subject Name"
                          />
                        </div>
                        </div>
                    </>
                    {/* <>
                      <div className="flex justify-center items-center mb-6 mt-8">
                        <h1 className="text-center text-lg font-bold text-slate-600 ">
                          Class 12th
                        </h1>
                      </div>
                      <div className="mb-3 w-full flex justify-between items-center">
                        <div className="flex flex-col">
                          <label
                            htmlFor="name"
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
                        <div className="flex flex-col">
                          <label
                            htmlFor="dob"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                          >
                            Board
                          </label>
                          <TextField
                            sx={{ width: "228px" }}
                            id=""
                            placeholder="Please Enter Board Name"
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
                                    document
                                      .getElementById("fileInput")
                                      .click();
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
                    </> */}
                    <>
                      <div className="flex justify-center items-center mb-6 mt-8">
                        <h1 className="text-center text-lg font-bold text-slate-600 ">
                           Graduation
                        </h1>
                      </div>
                      <div className="mb-3 w-full flex justify-between items-center">
                        <div className="flex flex-col">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                          >
                            Institute Name
                          </label>
                          <TextField
                            sx={{ width: "228px" }}
                            name="institute_ug"
                            value={jobSeekerForm.institute_ug}
                            onChange={handleChange}
                            placeholder="Please Enter Institute Name"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="dob"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                          >
                            Course Name
                          </label>
                          <TextField
                            sx={{ width: "228px" }}
                            name="course_ug"
                            value={jobSeekerForm.course_ug}
                            onChange={handleChange}
                            placeholder="Please Enter Course Name"
                          />
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
                                  width:"228px"
                                },
                                "& .MuiSvgIcon-root": {
                                  color: "#AC885A",
                                },
                              }}
                              value={selectedDateUgdp}
                              onChange={handleDateChangeUgdp}
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
                            name="parcentage_ug"
                            value={jobSeekerForm.parcentage_ug}
                            onChange={handleChange}
                            placeholder="Please Enter Percentage %"
                          />
                        </div>
                      </div>
                    </>
                    <>
                      <div className="flex justify-center items-center mb-6 mt-8">
                        <h1 className="text-center text-lg font-bold text-slate-600 ">
                          Post Graduation
                        </h1>
                      </div>
                      <div className="mb-3 w-full flex justify-between items-center">
                        <div className="flex flex-col">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                          >
                            Institute Name
                          </label>
                          <TextField
                            sx={{ width: "228px" }}
                            name="institute_pg"
                            value={jobSeekerForm.institute_pg}
                            onChange={handleChange}
                            placeholder="Please Enter Institute Name"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label
                            htmlFor="dob"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                          >
                            Course Name
                          </label>
                          <TextField
                            sx={{ width: "228px" }}
                            name="course_pg"
                            value={jobSeekerForm.course_pg}
                            onChange={handleChange}
                            placeholder="Please Enter Course Name"
                          />
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
                                  width:"228px"
                                },
                                "& .MuiSvgIcon-root": {
                                  color: "#AC885A",
                                },
                              }}
                              value={selectedDatePg}
                              onChange={handleDateChangePg}
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
                            name="parcentage_pg"
                            value={jobSeekerForm.parcentage_pg}
                            onChange={handleChange}
                            placeholder="Please Enter Percentage %"
                          />
                        </div>
                      </div>
                    </>

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

export default JobSeekerForm;
