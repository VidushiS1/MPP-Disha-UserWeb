import React, { useEffect, useRef, useState } from "react";
import { blue } from "@mui/material/colors";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getCourseListData} from "../../../rtk/features/FurtherEducation/getCourseListDataSlice";
import { DisciplineManagerListData } from "../../../rtk/features/FurtherEducation/getDisciplineManagerListDataSlice";
import { getSubjectDataList } from "../../../rtk/features/FurtherEducation/getSubjectDataListSlice";
import { getCourseTypeData } from "../../../rtk/features/FurtherEducation/getCourseTypeDataSlice";
import { GetCityList } from "../../../rtk/features/FurtherEducation/GetCityListSlice";
import { InstituteManagerListData } from "../../../rtk/features/FurtherEducation/getInstituteManagerListDataSlice";
import filterResult from "../../assets/Site Stats-rafiki.png";
import {getFilterResultData} from "../../../rtk/features/FurtherEducation/getFilterResultDataSlice"
import CareerAdviceReqImg from "../../assets/personal-growth.png";
import ViewInstituitionImg from "../../assets/newmppimages/filterresult.png"
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,Typography,IconButton
  } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import {resetFilterResultState} from "../../../rtk/features/FurtherEducation/getFilterResultDataSlice"

import ReactSelect from 'react-select'
import {
    Box,
    Button,
    CircularProgress,
    Menu,
    MenuItem,
    Pagination,
    ThemeProvider,
    createTheme,
  } from "@mui/material";



  const themeColor = createTheme({
    palette: {
      primary: {
        light: blue[300],
        main: blue[500],
        dark: blue[700],
        darker: blue[900],
      },
    },
  });


  const theme = createTheme({
    components: {
      MuiPagination: {
        styleOverrides: {
          root: {
            "& .MuiPaginationItem-root": {
              color: "#FFF", // Default color
              backgroundColor: "#AC885A", // Disabled color
              "&.Mui-selected": {
                backgroundColor: "#AC885A", // Selected color
              },
              "&.MuiPaginationItem-icon": {
                color: "#FFF", // Previous and next button color
                "&:hover": {
                  backgroundColor: "#AC885A", // Hover color
                },
              },
              "&:not(.Mui-selected)": {
                backgroundColor: "#f6f3ee",
                color:"#000"
              },
            },
          },
        },
      },
    },
  });
  


  const nameStyle = {
    color: "#264796",
  };


  const borderStyle = {
    borderBottom: "4px solid #AC885A",
    margin: "auto",
    marginBottom: "10px", 
  };


 const dateTimeContentSpanStyle = {
   fontSize: "17px",
   fontWeight: 500,
   color: "#000000",
 };



  const phoneContentSpanStyle = {
    fontSize: "15px",
    fontWeight: 500,
    color: "#555555",
  };


 const headingStyle = {
   fontSize: "19px",
   fontWeight: "bold",
   marginBottom: "10px",
 };



const StudentProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const customId = "custom-id-yes";
    const itemsPerPage = 6;
    const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [disciplineList,setDisciplineList] = useState([])
    const [instituteName,setInstituteName] = useState("");
    const [disciplineName,setDisciplineName] = useState("");
    const [subjectData,setSubjectData] = useState([]);
    const [courseData,setCourseData] = useState([]);
    const [courseTypeData,setCourseTypeData] = useState([]);
    const [newSelecteItem,setNewSelectedItem] = useState("")
    const [filterData,setFilterData] = useState([]);
    const [cityNewList ,setCityNewList] = useState([]);
    const [getInstituteDataById,setInstituteDataById] = useState("")
    const [programLevel,setProgramLevel] = useState("");
    const [subjectName,setSubjectName] = useState("");
    const [courseName,setCourseName] = useState("");

    const handleOpenDialogBox = async (id) => {
        setInstituteDataById(id);
         setDialogBoxOpen(true);
       };
      const handleCloseDialogBox = () => {
        setDialogBoxOpen(false);
      };

    const [addSubjectDataForm,setAddSubjectDataForm] = useState({
      "institute_type":"",
      "discipline_name":"",
      "subject_name":"",
      "course_name":"",
      "program_lavel":"",
      "city":"",
    })



  useEffect(() => {
     dispatch(InstituteManagerListData());
     dispatch(DisciplineManagerListData());
     return ()=>{
      dispatch(resetFilterResultState());
     }
  }, [dispatch])

const DisciplineManagerListData2 = useSelector(
  (state) => state.DisciplineManagerListData?.users?.data
);


useEffect(() => {
  setDisciplineList(DisciplineManagerListData2)
}, [DisciplineManagerListData2])

const formattedDisciplineList = disciplineList?.map(discipline => ({
  label:discipline?.discipline,
  value:discipline?.discipline
}))

console.log("disciplineName",disciplineName);
console.log("addSubjectDataForm",addSubjectDataForm);
useEffect(() => {
  if (addSubjectDataForm?.discipline_name) {
    dispatch(getSubjectDataList(addSubjectDataForm?.discipline_name));
  }
  
}, [addSubjectDataForm?.discipline_name])


useEffect(() => {
    if (addSubjectDataForm?.subject_name) {
        dispatch(getCourseListData(addSubjectDataForm?.subject_name));
    }
    
  }, [addSubjectDataForm?.subject_name])


  useEffect(() => {
    if (addSubjectDataForm?.course_name) {
        dispatch(getCourseTypeData(addSubjectDataForm?.course_name));
    }
    
  }, [addSubjectDataForm?.course_name])


  useEffect(() => {
    if (addSubjectDataForm?.course_name || addSubjectDataForm?.program_lavel) {
      dispatch(GetCityList({
        courseName: addSubjectDataForm?.course_name,
        programLevel: addSubjectDataForm?.program_lavel
      }));
    }
  }, [addSubjectDataForm?.course_name, addSubjectDataForm?.program_lavel]);

  


const cityList = useSelector((state) => state.GetCityList?.users?.data);
console.log("cityList", cityList);







const formattedCityList = cityNewList?.map((city) => ({
  value: city?.cities,
  label:  city?.cities,
}));
console.log("formattedCityList", formattedCityList);


const handleDisciplineChange = (option)=>{
  if(option){
    setDisciplineName(option);
    setAddSubjectDataForm({
      ...addSubjectDataForm,
      discipline_name:option?.value
    })
  }
}

  const InstituteManagerList = useSelector(
    (state) => state.InstituteManagerListData?.users?.data
  );

  console.log("InstituteManagerList",InstituteManagerList);

  const formattedInstituteManagerList = InstituteManagerList?.map(institute=>({
    label:institute?.institute_type,
    value:institute?.institute_type,
  }))

  const handleInstituteChange = (option)=>{
    if(option){
      setInstituteName(option);
      setAddSubjectDataForm({
        ...addSubjectDataForm,
        institute_type:option?.value
      })
    }
  }





  const getSubjectDataList2 = useSelector(
    (state) => state.getSubjectDataList?.users?.data
  );

  const getCourseListData2 = useSelector(
    (state) => state.getCourseListData?.users?.data?.courses
  );
  console.log("getCourseListData2",getCourseListData2);

  const getCourseTypeData2 = useSelector(
    (state) => state.getCourseTypeData?.users?.data
  );

console.log("getCourseTypeData2",getCourseTypeData2);
    




useEffect(()=>{
  setSubjectData(getSubjectDataList2 || []);
  setCourseData(getCourseListData2 || []);
  setCourseTypeData(getCourseTypeData2 || []);
  setCityNewList(cityList || [])
},[getSubjectDataList2,getCourseListData2,getCourseTypeData2,cityList])











    
    const handleSubjectChange = (option)=>{
      if(option){
        setSubjectName(option);
        setAddSubjectDataForm({
          ...addSubjectDataForm,
          subject_name:option?.label
        })
      }
    }
    


    const handleCourseChange = (option)=>{
      if(option){
        setCourseName(option);
        setAddSubjectDataForm({
          ...addSubjectDataForm,
          course_name:option?.label
        })
      }
    }

        const formattedCourseList = courseData?.map(course => ({
        label:course?.course,
        value:course?.course,
      
      }))



      const handleProgramLevelChange = (option)=>{
        if(option){
        setProgramLevel(option);
          setAddSubjectDataForm({
            ...addSubjectDataForm,
            program_lavel:option?.label
          })
        }
      }
  
          const formattedPrgramList = courseTypeData?.map(program_lavel => ({
          label:program_lavel?.program_lavel,
          value:program_lavel?.program_lavel,
        
        }))
      

      
      const formattedSubjectList = subjectData?.map(subject => ({
        label:subject?.subject,
        value:subject?.subject,
      
      }))





      const handleCityChange = (selectedOption) => {
        setNewSelectedItem(selectedOption)
        if (selectedOption) {
            setAddSubjectDataForm({
            ...addSubjectDataForm,
            city: selectedOption.label, 
          });
        }
      };




      const getFilterResultData2 = useSelector(
        (state) => state.getFilterResultData?.users?.data
      );

      useEffect(() => {
        setFilterData(getFilterResultData2 || [])
      }, [getFilterResultData2])
      


      const requiredField = ["discipline_name", "subject_name", "course_name"];

      const GetFilterData = async (e) => {
        e.preventDefault();
        try {
          setLoading(true);
          const hasEmptyFields = requiredField.some(
            (fields) => !addSubjectDataForm[fields]
          );
          if (hasEmptyFields) {
            toast.error("Please fill all the required fields", {
              toastId: customId,
            });
            return;
          }
    
          const actionResult = await dispatch(
            getFilterResultData(addSubjectDataForm)
          );
          if (actionResult?.payload?.message) {
            setLoading(false);
            toast.success(actionResult?.payload?.message, { toastId: customId });
          }
        } catch (error) {
          console.log("error while adding data", error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };     


      const handlePageChange = (event, page) => {
        setCurrentPage(page);
      };
    
      const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filterData?.slice(startIndex, endIndex);
      };


      console.log("filterData",filterData);

      const getInstituteDataByIdData = filterData?.find((item)=> item?._id === getInstituteDataById )

      console.log("getInstituteDataByIdData:",getInstituteDataByIdData);


  return (
<>
    <ThemeProvider theme={themeColor}>
<div className="flex items-center justify-between pb-12 ">
        <h1 className="text-2xl font-semibold">Student Profile</h1>
        <div className="relative"></div>
      </div>


    <div className="grid grid-cols-3">
  <div className="col-span-1">
  <div>
     <div className="px-12">
        <div className="job-details-main-container px-36 bg-blue-lightest">
          <form>
          <div className="col-span-full mb-5 mt-6">
              <label
                for="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Discipline
              </label>
              <div className="relative inline-block w-full">
                <ReactSelect
                  className="select-field block appearance-none w-full bg-white  text-sm font-medium text-gray-700 p-0 rounded-md leading-tight focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2"
                  classNamePrefix="Select Discipline"
                  options={formattedDisciplineList}
                  value={disciplineName}
                  onChange={handleDisciplineChange}
                  name="discipline_name"
                  placeholder="Select Discipline"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: "1px solid #d1d5db",
                      boxShadow: state.isFocused ? "#AC885A" : "", // For focused state
                      borderColor: state.isFocused ? "#AC885A" : "",
                      "&:hover": {
                        borderColor: state.isFocused ? "#AC885A" : "", // For hover state
                      },
                    }),

                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isFocused
                        ? "#f6f3ee"
                        : baseStyles.backgroundColor,
                      backgroundColor: state.isSelected ? "#d4c2aa" : "",
                      "&:hover": {
                        backgroundColor: "#f6f3ee",
                      },
                    }),
                  }}
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
              </div>
            </div>


            
          
            <div className="col-span-full mb-5 ">
              <label
                for="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Subject
              </label>
              <div className="flex items-center">
                <ReactSelect
                  className="select-field block appearance-none w-full bg-white  text-sm font-medium text-gray-700 p-0 rounded-md leading-tight focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2"
                  classNamePrefix="Select Subject"
                  options={formattedSubjectList}
                  value={subjectName}
                  onChange={handleSubjectChange}
                  name="subject_name"
                  isDisabled={disciplineName === ""}
                  placeholder="Select Subject"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: "1px solid #d1d5db",
                      boxShadow: state.isFocused ? "#AC885A" : "", // For focused state
                      borderColor: state.isFocused ? "#AC885A" : "",
                      "&:hover": {
                        borderColor: state.isFocused ? "#AC885A" : "", // For hover state
                      },
                    }),

                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isFocused
                        ? "#f6f3ee"
                        : baseStyles.backgroundColor,
                      backgroundColor: state.isSelected ? "#d4c2aa" : "",
                      "&:hover": {
                        backgroundColor: "#f6f3ee",
                      },
                    }),
                  }}
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
                
              </div>
            </div>
            <div className="col-span-full mb-5 ">
              <label
                for="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Course
              </label>
              <div className="flex items-center">
                <ReactSelect
                  className="select-field block appearance-none w-full bg-white  text-sm font-medium text-gray-700 p-0 rounded-md leading-tight focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2"
                  classNamePrefix="Select Course"
                  options={formattedCourseList}
                  value={courseName}
                  isDisabled={addSubjectDataForm?.subject_name === ""}
                  onChange={handleCourseChange}
                  name="course_name"
                  placeholder="Select Course"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: "1px solid #d1d5db",
                      boxShadow: state.isFocused ? "#AC885A" : "", // For focused state
                      borderColor: state.isFocused ? "#AC885A" : "",
                      "&:hover": {
                        borderColor: state.isFocused ? "#AC885A" : "", // For hover state
                      },
                    }),

                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isFocused
                        ? "#f6f3ee"
                        : baseStyles.backgroundColor,
                      backgroundColor: state.isSelected ? "#d4c2aa" : "",
                      "&:hover": {
                        backgroundColor: "#f6f3ee",
                      },
                    }),
                  }}
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
               
              </div>
            </div>
            <div className="col-span-full mb-5 ">
              <label
                for="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Program Level
              </label>
              <div className="flex items-center">
                <ReactSelect
                  className="select-field block appearance-none w-full bg-white  text-sm font-medium text-gray-700 p-0 rounded-md leading-tight focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2"
                  classNamePrefix="Select Program Level"
                  options={formattedPrgramList}
                  value={programLevel}
                  isDisabled={addSubjectDataForm?.course_name === ""}
                  onChange={handleProgramLevelChange}
                  name="course_name"
                  placeholder="Select Program Level"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: "1px solid #d1d5db",
                      boxShadow: state.isFocused ? "#AC885A" : "", // For focused state
                      borderColor: state.isFocused ? "#AC885A" : "",
                      "&:hover": {
                        borderColor: state.isFocused ? "#AC885A" : "", // For hover state
                      },
                    }),

                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isFocused
                        ? "#f6f3ee"
                        : baseStyles.backgroundColor,
                      backgroundColor: state.isSelected ? "#d4c2aa" : "",
                      "&:hover": {
                        backgroundColor: "#f6f3ee",
                      },
                    }),
                  }}
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
               
              </div>
            </div>

            <div className="col-span-full mb-5 mt-5">
              <label
                for="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Institute
              </label>
              <div className="relative inline-block w-full">
                <ReactSelect
                  className="select-field block appearance-none w-full bg-white  text-sm font-medium text-gray-700 p-0 rounded-md leading-tight focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2"
                  classNamePrefix="Select Institute"
                  options={formattedInstituteManagerList}
                  value={instituteName}
                  onChange={handleInstituteChange}
                  name="institute_type"
                  placeholder="Select Institute"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: "1px solid #d1d5db",
                      boxShadow: state.isFocused ? "#AC885A" : "", // For focused state
                      borderColor: state.isFocused ? "#AC885A" : "",
                      "&:hover": {
                        borderColor: state.isFocused ? "#AC885A" : "", // For hover state
                      },
                    }),

                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isFocused
                        ? "#f6f3ee"
                        : baseStyles.backgroundColor,
                      backgroundColor: state.isSelected ? "#d4c2aa" : "",
                      "&:hover": {
                        backgroundColor: "#f6f3ee",
                      },
                    }),
                  }}
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
              </div>
            </div>


            <div className="col-span-full mb-5 mt-5">
              <label
                for="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="relative inline-block w-full">
                <ReactSelect
                  className="select-field block appearance-none w-full bg-white  text-sm font-medium text-gray-700 p-0 rounded-md leading-tight focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2"
                  options={formattedCityList}
                  value={newSelecteItem}
                  onChange={handleCityChange}
                  isDisabled={addSubjectDataForm?.course_name === "" || addSubjectDataForm?.program_lavel === ""}
                  name="city"
                  placeholder="Select City"
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: "1px solid #d1d5db",
                      boxShadow: state.isFocused ? "#AC885A" : "", // For focused state
                      borderColor: state.isFocused ? "#AC885A" : "",
                      "&:hover": {
                        borderColor: state.isFocused ? "#AC885A" : "", // For hover state
                      },
                    }),

                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isFocused
                        ? "#f6f3ee"
                        : baseStyles.backgroundColor,
                      backgroundColor: state.isSelected ? "#d4c2aa" : "",
                      "&:hover": {
                        backgroundColor: "#f6f3ee",
                      },
                    }),
                  }}
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
              </div>
            </div>

          

            <div className="flex justify-center gap-4 mb-8">
             
              <button
                className="bg-yellow-dark hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded border border-yellow-dark"
                onClick={GetFilterData}
                disabled={loading}
                
              >
                {loading ? "Applying..." : "Apply"}
              </button>
            </div>
          </form>
        </div>
      </div></div>  
  </div>

    
  <div className="col-span-2">
  <div className="relative " style={{ height: "80vh" }}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress
                style={{
                  color: "orange",
                }}
              />
            </div>
          ) : (
            <>
            {getCurrentPageItems()?.length === 0 ? (
              <div className="px-12">
                <div className="job-details-main-container px-36 bg-blue-lightest">
                  <div className="commonfornodata vh70-important col-span-full flex flex-col items-center justify-center text-center">
                    <h4 className="text-gray-400 text-lg font-bold mb-3 text-center">
                      Please Apply Filter for Desired Output
                    </h4>
                    <img
                      className=""
                      src={filterResult}
                      alt="filter Result Not Found"
                      style={{ width: "400px" }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-16">
                {getCurrentPageItems().map((item) => (
                  <div
                    key={item.id}
                    className="max-w-sm shadow-md rounded-md main-card-g-j p-4 mb-1"
                  >
                    <div
                      className="right-side-icon-g-s"
                      style={{ paddingRight: "23px" }}
                    >
                      <div className="profile-wrapper">
                        <div
                          className="profile-image"
                          style={{ width: "40px" }}
                        >
                          <img src={CareerAdviceReqImg} alt="loading..." />
                        </div>
                      </div>
                    </div>
                    <div className="left-side-contant-g-s">
                      <div className="top-heading-area-g-j ">
                        <p>
                          {" "}
                          {item?.institute_name?.length > 32
                            ? item?.institute_name?.substring(0, 32) + "..."
                            : item?.institute_name}
                        </p>
                      </div>
                      <div className="buttom-price-and-btn-area  ">
                        <div className="left-side-price-area-g-j">
                          <p>
                            {" "}
                            {item?.place?.length > 32
                              ? item?.place?.substring(0, 32) +
                                "..."
                              : item?.place}
                          </p>
                        </div>
                        <div className="right-side-btn-area-g-j">
                          <a
                            href="#"
                            className="details-link"
                            onClick={() => {
                                handleOpenDialogBox(item?._id);
                              }}
                          >
                            Click for details
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 right-0 flex items-center justify-end pt-12">
              <ThemeProvider theme={theme}>
                <Pagination
                  count={Math.ceil(filterData?.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  sx={{ color: "#ff8000" }}
                  variant="outlined"
                  shape="rounded"
                />
              </ThemeProvider>
            </div>
            </>
            )}
          </>
          
        )}




        </div>
        </div>
     
      </div>  
      </ThemeProvider>


      <Dialog
        open={dialogBoxOpen}
        onClose={handleCloseDialogBox}
        PaperProps={{
          style: {
            width: "650px",
          },
        }}
      >
        <IconButton
    aria-label="close"
    sx={{
      position:"absolute",
      right:"8px",
      top:"8px",
      backgroundColor:"rgba(0,0,0,0.09)"
    }}

    onClick={handleCloseDialogBox}
  >
    <CloseIcon />
  </IconButton>
        <DialogContent>
          <DialogTitle
            sx={{
              fontWeight: "500",
              fontSize: "text-xs",
              padding: "0px",
              textAlign: "center",
              mb: 3,
              mt: 2,
              textTransform: "upperCase",
            }}
          >
            About Institution
          </DialogTitle>
     
              <DialogContent >
                <div style={{ textAlign: "center" }}>
                 
               <div className="flex justify-center items-center mb-10">
                <div className="profile-wrapper-dialog flex justify-center items-center">
                        <div
                          className="profile-image-dialog"
                          style={{ width: "80px" }}
                        >
                          <img src={ViewInstituitionImg} alt="loading..." />
                        </div>
                      </div>
                      </div>
                
                 
                </div>
                
                <Box sx={{marginLeft:"20px" , width:"435px" }}>
                  {" "}
               
                  <Box mt={1}>
                    <Typography variant="body1" style={dateTimeContentSpanStyle}  sx={{ marginRight: "14px" }}>
                    Name :{" "}
                    <span style={phoneContentSpanStyle}>
                      {getInstituteDataByIdData?.institute_name}
                    </span>
                    </Typography>
                  </Box>

                  <Box mt={1}>
                    <Typography variant="body1" style={dateTimeContentSpanStyle}  sx={{ marginRight: "14px" }}>
                    Location :{" "}
                    <span style={phoneContentSpanStyle}>
                      {getInstituteDataByIdData?.place}
                    </span>
                    </Typography>
                  </Box>

                  <Box mt={1}>
                    <Typography variant="body1" style={dateTimeContentSpanStyle}  sx={{ marginRight: "14px" }}>
                   Course Name :{" "}
                    <span style={phoneContentSpanStyle}>
                      {getInstituteDataByIdData?.course_name}
                    </span>
                    </Typography>
                  </Box>
                
                </Box>
              </DialogContent>
           

          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "20px",
            }}
            mt={2}
          >
            <Button
              variant="contained"
              class="bg-yellow-dark hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded border border-yellow-dark"
             
            >
            <a
                      href={
                        getInstituteDataByIdData?.institute_url?.includes("://")
                          ? getInstituteDataByIdData?.institute_url
                          : `https://${getInstituteDataByIdData?.institute_url}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    
                    >
                      Institute Website
                    </a>   
            </Button>
            <Button
              variant="contained"
              class="bg-yellow-dark hover:bg-yellow-700 text-white font-bold py-1 px-4 rounded border border-yellow-dark"
            
            >
                    <a
                      href={
                        getInstituteDataByIdData?.course_url?.includes("://")
                          ? getInstituteDataByIdData?.course_url
                          : `https://${getInstituteDataByIdData?.course_url}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    
                    >
                     Course Website
                    </a>   
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      </>
  );
};

export default StudentProfile