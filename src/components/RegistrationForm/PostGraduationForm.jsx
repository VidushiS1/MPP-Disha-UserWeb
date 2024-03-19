import React, { useState,useEffect } from "react";
import Logo from "../../assets/drwerdishaicon.png";
import StadyTree from "../../assets/under-graduation-tow.gif";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, CircularProgress, IconButton, TextField ,Checkbox} from "@mui/material";
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
import dayjs from "dayjs";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import {addPostGraduationData} from "../../../rtk/features/RegistrationForm/addPostGraduationDataSlice"
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
const PostGraduationForm = () => {
  const dispatch = useDispatch();
  const customId = "custom-id-yes";
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dateFormat = "YYYY";
  const [isFieldDisabled, setIsFieldDisabled] = useState(false);
  const maxDate = dayjs().subtract(0, "day");
  const [fileName, setFileName] = useState("");
  const [fileNameTwelfth, setFileNameTwelfth] = useState("");
  const [fileNameUgdp, setFileNameUgdp] = useState("");
  const [fileNamePg, setFileNamePg] = useState("");

  const [selectedDate, setSelectedDate] = useState(
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







  const [classUgdpInfoForm,setclassUgdpInfoForm] = useState({
    student_id:getTokenFromLocalStorage(),
    achivement_10th:"",
    education_mode_10th:"",
    parcentage_10th:"",
    passing_year_10th:"" ,
    education_medium_10th:"",
    school_name_10th:"",
    board_10th:"" ,
    achivement_12th:"" ,
    education_mode_12th:"" ,
    passing_year_12th:"" ,
    parcentage_12th:"" ,
    education_medium_12th:"" ,
    board_12th:"" ,
    school_name_12th:"" ,
    institute_ug:"",
    course_ug:"",
    education_medium_ug:"",
    achivement_ug:"",
    education_mode_ug:"",
    passing_year_ug:"",
    parcentage_ug:"",
    achivement_pg:"",
    education_mode_pg:"",
    pursuing_pg:"",
    passing_year_pg:"",
    parcentage_pg:"",
    education_medium_pg:"",
    course_pg:"",
    institute_pg:"",
  })


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "school_name_10th" || name === "school_name_12th" || name === "institute_ug" || name === "institute_pg") {
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
  
    if (name === "parcentage_10th" || name === "parcentage_12th" || name === "parcentage_ug" || name === "parcentage_pg") {
      let valueP = parseInt(value, 10);
            if (!isNaN(valueP) && valueP >= 0 && valueP <= 100) {
        setclassUgdpInfoForm({
          ...classUgdpInfoForm,
          [name]: valueP.toString().padStart(2, "0")
        });
      }
    } else {
      setclassUgdpInfoForm({
        ...classUgdpInfoForm,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };




  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
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

 const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log("file",file);
    setFileName(file);
  };

  const handleTwelfthFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log("file1",file);
    setFileNameTwelfth(file);
  };

  const handleUgdpFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log("file2",file);
    setFileNameUgdp(file);
  };

  const handlePgFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log("file2",file);
    setFileNamePg(file);
  };


  useEffect(() => {
    setclassUgdpInfoForm((prevFormValue) => ({
      ...prevFormValue,
      passing_year_10th: selectedDate?.format(dateFormat),
      achivement_10th:fileName,
      passing_year_12th: selectedDateTwelfth?.format(dateFormat),
      achivement_12th:fileNameTwelfth,
      passing_year_ug: selectedDateUgdp?.format(dateFormat),
      achivement_ug:fileNameUgdp,
      passing_year_pg: selectedDatePg?.format(dateFormat),
      achivement_pg:fileNamePg,
    }));
  }, [selectedDate,fileName,selectedDateTwelfth,fileNameUgdp,fileNameUgdp,selectedDateUgdp,selectedDatePg,fileNamePg]);




  


  console.log("classUgdpInfoForm",classUgdpInfoForm);


  const handleRadioChange = () => {
    setIsFieldDisabled((prevState) => !prevState);
  };

useEffect(()=>{
  if(isFieldDisabled){
    setSelectedDatePg(null);
    setclassUgdpInfoForm({
      ...classUgdpInfoForm,
      passing_year_pg:"",
      parcentage_pg:"",
      pursuing_pg:isFieldDisabled
    })
  }
  else if(classUgdpInfoForm?.parcentage_pg || classUgdpInfoForm?.passing_year_pg ){
    setclassUgdpInfoForm({
      ...classUgdpInfoForm,
      pursuing_pg:false
    })
  }

},[isFieldDisabled,classUgdpInfoForm?.parcentage_pg,classUgdpInfoForm?.passing_year_pg])


const requiredField = ["student_id","education_mode_10th","education_medium_10th","board_10th","school_name_10th","parcentage_10th","education_mode_12th","education_medium_12th","board_12th","parcentage_12th","school_name_12th","institute_ug","course_ug","education_medium_ug","education_mode_ug","education_mode_pg","parcentage_ug","education_medium_pg","course_pg","institute_pg"];

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setLoading(true);

    const hasEmptyFields = requiredField.some(
      (fields) => !classUgdpInfoForm[fields]
    );
    if (hasEmptyFields) {
      toast.error("Please fill all the required fields", {
        toastId: customId,
      });
      return;
    }

    if (classUgdpInfoForm?.parcentage_10th === "00" || classUgdpInfoForm?.parcentage_12th === "00" || classUgdpInfoForm?.parcentage_ug === "00" ) {
      toast.error("Please fill the percentage field for both 10th,12th class and graduation", {
        toastId: customId,
      });
      return;
    }

    if (classUgdpInfoForm?.passing_year_10th === "Invalid Date" || classUgdpInfoForm?.passing_year_12th === "Invalid Date" || classUgdpInfoForm?.passing_year_ug === "Invalid Date") {
      toast.error("Select year of passing for both 10th,12th and graduation", {
        toastId: customId,
      });
      return;
    }

    if (classUgdpInfoForm?.pursuing_pg === false && classUgdpInfoForm?.passing_year_pg === "Invalid Date") {
      toast.error("Select year of passing for post graduation", {
        toastId: customId,
      });
      return;
    }

    if (classUgdpInfoForm?.pursuing_pg === false && (classUgdpInfoForm?.parcentage_pg === "" || classUgdpInfoForm?.parcentage_pg === "00")) {
      toast.error("Please fill the percentage field for post graduation", {
        toastId: customId,
      });
      return;
    }


    const formData = new FormData();
      for (const key in classUgdpInfoForm) {
      formData.append(key, classUgdpInfoForm[key]);
    }

    const actionResult = await dispatch(addPostGraduationData(formData));
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




  const handleBack = () => {
    Navigate("/student-select-qualification");
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
                    Fill Form For Class 10th, 12th and Post Graduation
                  </h1>

                  <img src={Logo} alt="logo" className="h-20 " />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="buttom-loginform-area ">
                    <>
                      <div className="flex justify-center items-center mb-6 mt-6">
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
                            value={classUgdpInfoForm.school_name_10th}
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
                            value={classUgdpInfoForm.board_10th}
                            onChange={handleChange}
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
                            name="education_medium_10th"
                            value={classUgdpInfoForm.education_medium_10th}
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
                            name="parcentage_10th"
                            value={classUgdpInfoForm.parcentage_10th}
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
                            Mode of Education
                          </label>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="education_mode_10th"
                            value={classUgdpInfoForm.education_mode_10th}
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
                                    document
                                      .getElementById("fileInput")
                                      .click();
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
                            value={classUgdpInfoForm.school_name_12th}
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
                            value={classUgdpInfoForm.board_12th}
                            onChange={handleChange}
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
                            name="education_medium_12th"
                            value={classUgdpInfoForm.education_medium_12th}
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
                            value={classUgdpInfoForm.parcentage_12th}
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
                            Mode of Education
                          </label>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="education_mode_12th"
                            value={classUgdpInfoForm.education_mode_12th}
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
                                    document
                                      .getElementById("fileInput12th")
                                      .click();
                                  }}
                                />
                              ),
                            }}
                            value={fileNameTwelfth?.name}
                            disabled
                          />
                          <input
                            id="fileInput12th"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleTwelfthFileInputChange}
                          />
                        </div>
                      </div>
                    </>
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
                            value={classUgdpInfoForm.institute_ug}
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
                            value={classUgdpInfoForm.course_ug}
                            onChange={handleChange}
                            placeholder="Please Enter Course Name"
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
                            name="education_medium_ug"
                            value={classUgdpInfoForm.education_medium_ug}
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
                      {/* <div className="mb-3 w-full flex justify-between items-center">
                        <div className="flex flex-col">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                          >
                            Currently Pursuing
                          </label>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <FormControlLabel
                              value="Currently Pursuing"
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
                              label="Currently Pursuing"
                            />
                          </RadioGroup>
                        </div>
                      </div> */}
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
                            value={classUgdpInfoForm.parcentage_ug}
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
                            Mode of Education
                          </label>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="education_mode_ug"
                            value={classUgdpInfoForm.education_mode_ug}
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
                                    document
                                      .getElementById("fileInputUgdp")
                                      .click();
                                  }}
                                />
                              ),
                            }}
                            value={fileNameUgdp?.name}
                            disabled
                          />
                          <input
                            id="fileInputUgdp"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleUgdpFileInputChange}
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
                            value={classUgdpInfoForm.institute_pg}
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
                            value={classUgdpInfoForm.course_pg}
                            onChange={handleChange}
                            placeholder="Please Enter Course Name"
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
                            name="education_medium_pg"
                            value={classUgdpInfoForm.education_medium_pg}
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
                      <div className="mb-1 w-full flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="flex justify-start items-center">
                       <Checkbox
                                sx={{
                                  color: "#AC885A",
                                  marginLeft:"-0.7rem",
                                  "&.Mui-checked": {
                                    color: "#AC885A",
                                  },
                                }}
                                checked={isFieldDisabled}
                                onChange={handleRadioChange}
                              />
                               <label
                              htmlFor="name"
                              className="block text-sm font-medium leading-6 text-gray-900 mb-1"
                            >
                              Currently Pursuing 
                            </label>
                              </div>
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
                              value={selectedDatePg}
                              onChange={handleDateChangePg}
                              maxDate={maxDate}
                              disabled={isFieldDisabled}
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
                            value={classUgdpInfoForm.parcentage_pg}
                            onChange={handleChange}
                            placeholder="Please Enter Percentage %"
                            disabled={isFieldDisabled}
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
                            name="education_mode_pg"
                            value={classUgdpInfoForm.education_mode_pg}
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
                                    document
                                      .getElementById("fileInputPg")
                                      .click();
                                  }}
                                />
                              ),
                            }}
                            value={fileNamePg?.name}
                            disabled
                          />
                          <input
                            id="fileInputPg"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handlePgFileInputChange}
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

export default PostGraduationForm;
