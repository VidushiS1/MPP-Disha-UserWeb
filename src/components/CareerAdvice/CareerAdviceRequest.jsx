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
import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { styled, alpha } from "@mui/material/styles";
import CareerAdviceReqImg from "../../assets/personal-growth.png";
import { Tooltip, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { getCareerAdviceRequestList } from "../../../rtk/features/CareerAdvice/getCareerAdviceRequestListSlice";
import { useSelector, useDispatch } from "react-redux";
import ntdImg from "../../assets/No data.gif";
import { getCareerAdviceRequestById } from "../../../rtk/features/CareerAdvice/getCareerAdviceRequestByIdSlice";
import { ViewCareerAdviceSettingsDataList } from "../../../rtk/features/CareerAdvice/ViewCareerAdviceSettingsDataListSlice";
import { getSlotTimeDataList } from "../../../rtk/features/CareerAdvice/getSlotTimeDataListSlice";
import {getCareerAdviceListData} from "../../../rtk/features/CareerAdvice/getCareerAdviceListDataSlice"

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

const StyledMenu = styled((props) => (
  <Menu
    sx={{ textTransform: "capitalize" }}
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 105,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],

    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

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

const CareerAdviceRequest = () => {

   const nameStyle = {
     color: "#AC885A",
   };
     const calculateBorderWidth = (text) => {
       // Calculate the width based on the number of characters in the text
       return `${text.length * 11.5}px`; // You can adjust the multiplier as needed
     };

   const borderStyle = {
     borderBottom: "4px solid #e7ddcf",
     margin: "auto",
     marginBottom: "10px",
   };
  const dateTimeContentStyle = {
    fontSize: "17px",
    fontWeight: 700,
    color: "#2b2b2b",
  };

  const dateTimeContentSpanStyle = {
    fontSize: "17px",
    fontWeight: 500,
    color: "#555555",
  };

   const phoneContentStyle = {
     fontSize: "14px",
     fontWeight: 500,
     color: "#2b2b2b",
   };

   const phoneContentSpanStyle = {
     fontSize: "14px",
     fontWeight: 500,
     color: "#555555",
   };
    const emailContentSpanStyle = {
      fontSize: "14px",
      fontWeight: 400,
      color: "#555555",
      textDecoration: "underline",
    };

  const headingStyle = {
    fontSize: "19px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const queryContentStyle = {
    fontSize: "15px",
    marginBottom: "10px",
  };

  const optionStyle = {
    fontSize: "15px",
  };

  const dispatch = useDispatch();
  const [dialogBoxOpen, setDialogBoxOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [data, setFetchData] = useState([]);
  const [data2, setFetchData2] = useState([]);
  const customId = "custom-id-yes";
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const studentId = localStorage.getItem("student_id")

  const navigate = useNavigate();
  const [sortByAnchorEl, setSortByAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const sortByOpen = Boolean(sortByAnchorEl);

  useEffect(() => {
    setLoading(true);
    dispatch(getCareerAdviceListData(studentId))
      .then(() => {
        // This code will be executed after the API call is complete
        setLoading(false);
      })
      .catch((error) => {
        // Handle errors if needed
        setLoading(false);
        console.error("Error fetching listing data:", error);
      });
  }, []);

  const careerAdviceRequestList = useSelector(
    (state) => state.getCareerAdviceListData?.users?.data
  );

    const viewCareerAdviceRequest = useSelector(
      (state) => state.getCareerAdviceRequestById?.users?.data
    );

  useEffect(() => {
    setFetchData(careerAdviceRequestList || []);
    setFetchData2(viewCareerAdviceRequest || []);
  }, [careerAdviceRequestList, viewCareerAdviceRequest]);

  console.log("data", data);
  console.log("data2" , data2);

  const handleSortByClick = (event) => {
    setSortByAnchorEl(event.currentTarget);
  };
  const handleSortByClose = () => {
    setSortByAnchorEl(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const ViewCareerAdviceSettings = () => {
  //   navigate("/career-advice-settings");
  // };

   const ViewCareerAdviceSettings = async (id) => {
     await dispatch(ViewCareerAdviceSettingsDataList(id));
     await dispatch(getSlotTimeDataList(id));
     navigate("/career-advice-settings");
   };

  const HandleAddScholarship = () => {
    navigate("/add-scholarship");
  };

  // const handleOpenDialogBox = () => {
  //   setDialogBoxOpen(true);
  // };

const [careerAdviceId,setCareerAdviceId] = useState("")

   const handleOpenDialogBox = async (id) => {
    console.log("id-open karne par : ", id);
    setCareerAdviceId(id);
     await dispatch(
       getCareerAdviceRequestById(id)
     );
     setDialogBoxOpen(true);
   };
  const handleCloseDialogBox = () => {
    setDialogBoxOpen(false);
  };


  const handleEditCareerAdvice = async() => {
    await dispatch(getCareerAdviceRequestById(careerAdviceId));
    navigate("/edit-career-advice");
    setDialogBoxOpen(false);
  };


  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data?.slice(startIndex, endIndex);
  };

  console.log("careerAdviceRequestList", careerAdviceRequestList);

  useEffect(() => {
    let sortedData = [...data];
    if (sortBy === "latest") {
      sortedData?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      handleSortByClose();
    } else if (sortBy === "oldest") {
      sortedData?.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      handleSortByClose();
    }
    setFetchData(sortedData);
  }, [sortBy]); // Removed "data" dependency from the useEffect


  const formattedDates = data?.map((item) => {
    return item?.schedule_date
      ? new Date(item.schedule_date)
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-")
      : "";
  });

  console.log("formattedDates", formattedDates);

  const handleAddCareerAdvice = () => {
    navigate("/add-career-advice");
  }

  





  

  return (
    <>
      <ThemeProvider theme={themeColor}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">All Career Advice Request</h1>{" "}
          <div className="flex items-center">
            {" "}
            {/* Right Side */}
            <Tooltip title="Add Career Advice">
              <Button
                variant="contained"
                sx={{
                  minWidth: "40px",
                  padding: "6px",
                  marginRight: "10px",
                  backgroundColor: "#AC885A",
                  color: "#FFF",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#AC885A",
                    color: "#FFF",
                  },
                }}
                onClick={handleAddCareerAdvice}
              >
                <AddIcon sx={{ color: "#FFF" }} />
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={HandleAddScholarship}>
                <Typography textAlign="center">
                  <AddIcon
                    sx={{
                      color: "#6e6e6e",
                      padding: "2px",
                      marginRight: "5px",
                    }}
                  />
                  Scholarship
                </Typography>
              </MenuItem>
            </Menu>
            <Button
              sx={{
                textTransform: "capitalize",
                bgcolor: "#AC885A",
                "&:hover": {
                  bgcolor: "#AC885A",
                  color: "#FFF",
                },
              }}
              id="demo-customized-button"
              aria-controls={sortByOpen ? "sort-by-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={sortByOpen ? "true" : undefined}
              variant="contained"
              disableElevation
              onClick={handleSortByClick}
              endIcon={<KeyboardArrowDownIcon sx={{ color: "#FFF" }} />}
            >
              {sortBy ? `Sort by ${sortBy}` : "Sort by"}
            </Button>
            <StyledMenu
              id="sort-by-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={sortByAnchorEl}
              open={Boolean(sortByAnchorEl)}
              onClose={handleSortByClose}
            >
              <MenuItem onClick={() => setSortBy("latest")}>Latest</MenuItem>
              <MenuItem onClick={() => setSortBy("oldest")}>Oldest</MenuItem>
            </StyledMenu>
          </div>
        </div>
        <div className="relative " style={{ height: "65vh" }}>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-3 gap-4 mt-16 mb-16 ">
                {getCurrentPageItems()?.length === 0 ? (
                  <div className="commonfornodata col-span-full flex flex-col items-center justify-center text-center">
                    <img
                      src={ntdImg} // Replace with your vector image URL
                      alt="Nothing to Display"
                      style={{ width: "400px" }}
                    />
                    <h5 className="text-muted text-lg font-bold">
                      Nothing to Display...
                    </h5>
                  </div>
                ) : (
                  getCurrentPageItems().map((item) => (
                    <div
                      key={item.id}
                      className="max-w-sm   shadow-md rounded-md main-card-g-j p-4 mb-1 cursor-pointer"
                      onClick={() => {
                        handleOpenDialogBox(item?._id);
                      }}
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
                            <img src={CareerAdviceReqImg} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="left-side-contant-g-s w-full">
                        <div className="top-heading-area-g-j ">
                          <p>
                           
                                {item?.title?.length > 0 ? item?.title?.[0]?.substring(0,33) + "..." : "No Title" }
                          </p>
                        </div>
                        <div className="buttom-price-and-btn-area">
                          <div className="left-side-price-area-g-j">
                            <p>
                              {" "}
                              {item?.description
                                ? item?.description?.length > 40
                                  ? item?.description?.substring(0, 40) + "..."
                                  : item?.description
                                : "No Description"}
                            </p>
                          </div>
                        </div>
                        <div className="buttom-price-and-btn-area-car  ">
                          <div className="left-side-price-area-car ">
                            <CalendarMonthIcon
                              sx={{
                                padding: "3px 3px 3px 0",
                                color: "#AC885A",
                                marginRight: "3px",
                                marginLeft: "-4px",
                              }}
                            />{" "}
                            <p>{item?.schedule_date}</p>
                           
                          </div>
                          <div className="right-side-btn-area-car">
                            <ScheduleIcon
                              sx={{
                                padding: "3px",
                                color: "#AC885A",
                                marginRight: "5px",
                              }}
                            />{" "}
                            <p>{item?.schedule_from_time}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          <div className="absolute bottom-0 right-0 flex items-center justify-end pt-12">
            <ThemeProvider theme={theme}>
              <Pagination
                count={Math.ceil(data?.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{ color: "#ff8000" }}
                variant="outlined"
                shape="rounded"
              />
            </ThemeProvider>
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
            Upcoming Schedules Details
          </DialogTitle>
          {data2?.length === 0 ? (
            <DialogContent>
              <Box mt={4} sx={{ textAlign: "center" }}>
                <Typography variant="h4" style={headingStyle}>
                  Nothing to Display...
                </Typography>
              </Box>
            </DialogContent>
          ) : (
            data2?.map((dataItem, index) => (
              <DialogContent key={dataItem.id}>
                <div style={{ textAlign: "center" }}>
                  <Typography variant="h6" style={nameStyle}>
                    {dataItem?.studentName}
                  </Typography>
                  <div
                    style={{
                      width: `${(dataItem?.studentName || "").length * 10}px`,
                      ...borderStyle,
                    }}
                  ></div>
                  <Typography variant="body2" style={phoneContentStyle}>
                    Phone No :{" "}
                    <span style={phoneContentSpanStyle}>
                      (+91) {dataItem?.mobile_no}
                    </span>
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <a href={dataItem?.email} style={emailContentSpanStyle}>
                      {dataItem?.email}
                    </a>
                  </Typography>
                </div>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-evenly"
                  mt={4}
                >
                  <Typography variant="body1" style={dateTimeContentStyle}>
                    Schedule Date :{" "}
                    <span style={dateTimeContentSpanStyle}>
                      {" "}
                      {dataItem?.schedule_date
                        ? new Date(dataItem.schedule_date)
                            .toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                            .replace(/\//g, "-")
                        : ""}
                    </span>
                  </Typography>
                  <Typography
                    variant="body1"
                    style={dateTimeContentStyle}
                    sx={{ marginRight: "14px" }}
                  >
                    Schedule Time :{" "}
                    <span style={dateTimeContentSpanStyle}>
                      {dataItem?.schedule_from_time}
                    </span>
                  </Typography>
                </Box>
                <Box sx={{ marginLeft: "20px", width: "435px" }}>
                  {" "}
                  <Box mt={4}>
                    <Typography variant="h4" style={headingStyle}>
                      Your Query
                    </Typography>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="body1" style={queryContentStyle}>
                      {/* Dummy Query Content */}
                      {dataItem?.description
                        ? dataItem?.description
                        : "Description Not Defined"}
                    </Typography>
                  </Box>
                  {data2.map((dataItem, index) => (
                    <Box mt={2} key={dataItem.id}>
                      {dataItem.title.map((title, subIndex) => (
                        <Typography
                          variant="body1"
                          style={optionStyle}
                          key={subIndex}
                        >
                          {subIndex + 1}. {title}
                        </Typography>
                      ))}
                    </Box>
                  ))}
                </Box>
              </DialogContent>
            ))
          )}

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
              sx={{
                minWidth: "35px",
                padding: "6px 25px",
                marginRight: "10px",
                backgroundColor: "#AC885A",
                color: "#FFF",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#AC885A",
                  color: "#FFF",
                },
              }}
              onClick={handleCloseDialogBox}
            >
              Back
            </Button>
            <Button
              variant="contained"
              sx={{
                minWidth: "35px",
                padding: "6px 25px",
                marginRight: "10px",
                backgroundColor: "#AC885A",
                color: "#FFF",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#AC885A",
                  color: "#FFF",
                },
              }}
              onClick={handleEditCareerAdvice}
            >
              Edit
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CareerAdviceRequest;
