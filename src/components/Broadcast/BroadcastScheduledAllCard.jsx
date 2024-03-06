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
import scheduleImg from "../../assets/schedule.png";
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
import { useSelector, useDispatch } from "react-redux";
import ntdImg from "../../assets/No data.gif";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {getZoomMeetingListData} from "../../../rtk/features/ZoomApi/getZoomMeetingListDataSlice";
import {getZoomMeetingDataById} from "../../../rtk/features/ZoomApi/getZoomMeetingDataByIdSlice";

import {getBroadcastListData} from "../../../rtk/features/Broadcast/getBroadcastListDataSlice"

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
              color: "#000",
            },
          },
        },
      },
    },
  },
});

const BroadcastScheduled = () => {
  const dateTimeContentStyle = {
    fontSize: "17px",
    fontWeight: 500,
    color: "#2b2b2b",
  };

  const dateTimeContentSpanStyle = {
    fontSize: "17px",
    fontWeight: 500,
    color: "#555555",
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

  const navigate = useNavigate();
  const [sortByAnchorEl, setSortByAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const sortByOpen = Boolean(sortByAnchorEl);

  useEffect(() => {
    setLoading(true);
    dispatch(getBroadcastListData())
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

  const getBroadcastListData2 = useSelector(
    (state) => state.getBroadcastListData?.users?.data
  );



  useEffect(() => {
    setFetchData(getBroadcastListData2 || []);
  }, [getBroadcastListData2]);

  console.log("data", data);

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

  const addBroadcastScheduled = () => {
    navigate("/add-broadcast-scheduled");
  };

  const HandleAddScholarship = () => {
    navigate("/add-scholarship");
  };



  const handleOpenDialogBox = async (id) => {
    try {
      setLoading(true);
      await dispatch(getZoomMeetingDataById(id));
      setLoading(false);
      navigate("/view-broadcast-scheduled");
    } catch (error) {
      console.log("error",error);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };

  const handleCloseDialogBox = () => {
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

  return (
    <>
      <ThemeProvider theme={themeColor}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">All Broadcast Scheduled</h1>{" "}
          <div className="flex items-center">
            {" "}
            {/* Right Side */}
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

        <div
          className="relative "
          style={{ height: "65vh", whiteSpace: "nowrap" }}
        >
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
                    className="max-w-sm   shadow-md rounded-md main-card-g-j p-4 mb-1 cursor-pointer w-full"
                    // onClick={() => {
                    //   handleOpenDialogBox(item?._id);
                    // }}
                  >
                    <div
                      className="right-side-icon-g-s"
                      style={{ paddingRight: "13px" }}
                    >
                      <div className="profile-wrapper">
                        <div
                          className="profile-image"
                          style={{ width: "40px" }}
                        >
                          <img src={scheduleImg} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="left-side-contant-g-s w-full">
                      <div className="top-heading-area-g-j ">
                        <p>
                          {item?.agenda?.length > 27
                            ? item?.agenda?.substring(0, 22) + "..."
                            : item?.agenda}
                        </p>
                      </div>
                      <div className="buttom-price-and-btn-area  ">
                        <div className="left-side-price-area-g-j my-1 ">
                          <p>
                            <a
                              href={item?.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#4d4dff" }}
                            >
                              {item?.link?.length > 33
                                ? item?.link?.substring(0, 33) + "..."
                                : item?.link}
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="buttom-price-and-btn-area-bs  ">
                        <div className="left-side-price-area-car ">
                          <CalendarMonthIcon
                            sx={{
                              padding: "0 6px 0 0",
                              color: "#AC885A",
                            }}
                          />{" "}
                          <p>{item?.date}</p>
                        </div>
                        <div className="right-side-btn-area-car">
                          <ScheduleIcon
                            sx={{
                              padding: "0 6px 0 0",
                              color: "#AC885A",
                            }}
                          />{" "}
                          <p>
                            {item?.start_time} - {item?.end_time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
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
    </>
  );
};

export default BroadcastScheduled;
