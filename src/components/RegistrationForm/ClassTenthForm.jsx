import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/drwerdishaicon.png";
import StadyTree from "../../assets/ClassTenthForm.gif";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, Checkbox, CircularProgress, IconButton, TextField } from "@mui/material";
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
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Link, useNavigate } from "react-router-dom";
import {addTenthData} from "../../../rtk/features/RegistrationForm/addTenthDataSlice"

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
const handleClassTenth = () => {
  const dispatch = useDispatch();
  const customId = "custom-id-yes";
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dateFormat = "YYYY";
  const [isFieldDisabled, setIsFieldDisabled] = useState(false);
  const maxDate = dayjs().subtract(0, "day");
  const [fileName, setFileName] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs( dateFormat)
  );

  const getTokenFromLocalStorage = () => {
    const student_id = localStorage.getItem("student_id");
    return student_id || "";
  };

  const [classTenthInfoForm,setclassTenthInfoForm] = useState({
    student_id:getTokenFromLocalStorage(),
    achivement_10th:"",
    education_mode_10th:"",
    parcentage_10th:"",
    passing_year_10th:"" ,
    education_medium_10th:"",
    school_name_10th:"",
    board_10th:"" ,
  })



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setclassTenthInfoForm({
      ...classTenthInfoForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue);
  };

 const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFileName(file);
  };

  useEffect(() => {
    setclassTenthInfoForm((prevFormValue) => ({
      ...prevFormValue,
      passing_year_10th: selectedDate?.format(dateFormat),
      achivement_10th:fileName
    }));
  }, [selectedDate,fileName]);

  const handleBack = () => {
    Navigate("/student-select-qualification");
  }



  const requiredField = ["student_id","education_mode_10th","education_medium_10th","board_10th","school_name_10th",];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
  
     
  
      const hasEmptyFields = requiredField.some(
        (fields) => !classTenthInfoForm[fields]
      );
      if (hasEmptyFields) {
        toast.error("Please fill all the required fields", {
          toastId: customId,
        });
        return;
      }
  
      if (classTenthInfoForm?.pursuing_10th === false && classTenthInfoForm?.passing_year_10th === "Invalid Date") {
        toast.error("Please Select the year of Passing.", {
          toastId: customId,
        });
        return;
      }
  
      if (classTenthInfoForm?.pursuing_10th === false && classTenthInfoForm?.parcentage_10th === "") {
        toast.error("Please fill the percentage 10th field", {
          toastId: customId,
        });
        return;
      }

      const formData = new FormData();
  
      // Append each key-value pair from classTenthInfoForm to formData
      for (const key in classTenthInfoForm) {
        formData.append(key, classTenthInfoForm[key]);
      }
  
      const actionResult = await dispatch(addTenthData(formData));
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
  


  console.log("classTenthInfoForm",classTenthInfoForm);


  const handleRadioChange = () => {
    setIsFieldDisabled((prevState) => !prevState);
  };

useEffect(()=>{
  if(isFieldDisabled){
    setSelectedDate(null)
    setclassTenthInfoForm({
      ...classTenthInfoForm,
      passing_year_10th:"",
      parcentage_10th:"",
      pursuing_10th:isFieldDisabled
    })
  }
  else if(classTenthInfoForm?.parcentage_10th || classTenthInfoForm?.passing_year_10th ){
    setclassTenthInfoForm({
      ...classTenthInfoForm,
      pursuing_10th:false
    })
  }

},[isFieldDisabled,classTenthInfoForm?.parcentage_10th,classTenthInfoForm?.passing_year_10th])




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
                    Class 10th
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
                          School Name
                        </label>
                        <TextField
                          sx={{ width: "228px" }}
                          name="school_name_10th"
                          value={classTenthInfoForm.school_name_10th}
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
                          value={classTenthInfoForm.board_10th}
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
                          value={classTenthInfoForm.education_medium_10th}
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
                            value={selectedDate}
                            onChange={handleDateChange}
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
                          name="parcentage_10th"
                          value={classTenthInfoForm.parcentage_10th}
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
                          name="education_mode_10th"
                          value={classTenthInfoForm.education_mode_10th}
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

export default handleClassTenth;
