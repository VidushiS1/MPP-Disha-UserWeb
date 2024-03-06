import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Select,
  TextField,
  ThemeProvider,
  createTheme,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ntdImg from "../../assets/No data.gif";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { styled, alpha } from "@mui/material/styles";
import institutionImg from "../../assets/video-camera-dark.png";
import { Tooltip, Typography } from "@mui/material";
import { InstituteManagerListData } from "../../../rtk/features/InstituteManager/getInstituteManagerListDataSlice";
import { getInstituteManagerDataById } from "../../../rtk/features/InstituteManager/getInstituteManagerDataByIdSlice";
import { addInstituteManagerData } from "../../../rtk/features/InstituteManager/addInstituteManagerDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

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

const AllVideoSessionCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [sessionName, setSessionName] = useState("xyz");
  const [url, setUrl] = useState(
    "https://www.youtube.com/watch?v=dummyvideoid"
  );
  const [sessionNameEditMode, setSessionNameEditMode] = useState(false);
  const [urlEditMode, setUrlEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortByAnchorEl, setSortByAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const sortByOpen = Boolean(sortByAnchorEl);
  const [selectedOption, setSelectedOption] = useState("");
  const [adddialogBoxOpen, setAddDialogBoxOpen] = useState(false);
  const [viewdialogBoxOpen, setViewDialogBoxOpen] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [data, setFetchData] = useState([]);
  const customId = "custom-id-yes";
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [addInstituteForm, setAddInstituteForm] = useState({
    institute_name: "",
    place: "",
    institute_type: "",
    institute_url: "",
  });

  useEffect(() => {
    setLoading(true);
    dispatch(InstituteManagerListData())
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching listing data:", error);
      });
  }, []);

  useEffect(() => {
    // dispatch(GetCityList());
  }, []);

  const [newSelecteItem, setNewSelectedItem] = useState("");

  const handleCityChange = (selectedOption) => {
    setNewSelectedItem(selectedOption);
    if (selectedOption) {
      setAddInstituteForm({
        ...addInstituteForm,
        place: selectedOption.label,
      });
    }
  };

  // const cityList = useSelector((state) => state.GetCityList?.users?.data);
  // console.log("cityList", cityList);

  // const formattedCityList = cityList?.map((city) => ({
  //   value: city._id,
  //   label: `${city.city}`,
  // }));
  // console.log("formattedCityList", formattedCityList);

  const InstituteManagerList = useSelector(
    (state) => state.InstituteManagerListData?.users?.data
  );
  useEffect(() => {
    setFetchData(InstituteManagerList || []);
  }, [InstituteManagerList]);

  const handleSortByClick = (event) => {
    setSortByAnchorEl(event.currentTarget);
  };
  const handleSortByClose = () => {
    setSortByAnchorEl(null);
  };

  const handleOpenAddDialogBox = async () => {
    setAddDialogBoxOpen(true);
  };
  const handleCloseAddDialogBox = () => {
    setAddDialogBoxOpen(false);
  };

  const handleOpenViewDialogBox = async () => {
    setViewDialogBoxOpen(true);
  };
  const handleCloseViewDialogBox = () => {
    setViewDialogBoxOpen(false);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data?.slice(startIndex, endIndex);
  };

  console.log("InstituteManagerList", InstituteManagerList);

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
  }, [sortBy]);

  const inValidFields = [
    "institute_name",
    "place",
    "institute_type",
    "institute_url",
  ];

  const SaveAddInstitute = async () => {
    const hasEmptyFields = inValidFields?.some(
      (field) => !addInstituteForm[field]
    );

    if (hasEmptyFields) {
      toast.error("Please fill all the required fields", { toastId: customId });
      return;
    }

    try {
      setIsLoading(true);
      const actionResult = await dispatch(
        addInstituteManagerData(addInstituteForm)
      );
      console.log("actionResult", actionResult);
      if (actionResult?.payload?.message) {
        await dispatch(InstituteManagerListData());
        toast.success(actionResult?.payload?.message, {
          toastId: customId,
        });
        handleCloseAddDialogBox();
        setIsLoading(false);
        setAddInstituteForm({
          institute_name: "",
          place: "",
          institute_type: "",
          institute_url: "",
        });
      }
    } catch (error) {
      console.log("Error While Adding Institute", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddInstituteForm({
      ...addInstituteForm,
      [name]: value,
    });
  };

  const handleViewInstitute = async (id) => {
    try {
      setLoading(true);
      await dispatch(getInstituteManagerDataById(id));
      setLoading(false);
      navigate("/view-institute-manager");
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAddInstituteForm({
      ...addInstituteForm,
      place: selectedOption,
    });
  }, [selectedOption]);

  console.log("addInstituteForm", addInstituteForm);

  useEffect(() => {
    const filterData = InstituteManagerList?.filter((item) => {
      const nameMatch =
        item?.institute_name
          ?.toLowerCase()
          .includes(searchText?.toLowerCase()) ||
        item?.place?.toLowerCase().includes(searchText?.toLowerCase());
      return nameMatch;
    });
    setFetchData(filterData);
    setCurrentPage(1);
  }, [searchText, InstituteManagerList]);

   const handleEdit = () => {
     setIsEditMode(true);
     setSessionNameEditMode(true);
     setUrlEditMode(true);
   };

   const handleSessionNameChange = (e) => {
     setSessionName(e.target.value);
   };

   const handleUrlChange = (e) => {
     setUrl(e.target.value);
   };

  return (
    <>
      <ThemeProvider theme={themeColor}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">All Video Session</h1>{" "}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-3 gap-4 mt-16 mb-16">
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
                getCurrentPageItems()?.map((item) => (
                  <div
                    key={item.id}
                    className="max-w-sm   shadow-md rounded-md main-card-g-j p-4 mb-1"
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
                          <img src={institutionImg} alt="" />
                        </div>
                      </div>
                    </div>
                    <div className="left-side-contant-g-s">
                      <div className="top-heading-area-g-j ">
                        <p>
                          {" "}
                          {item?.institute_name
                            ? item.institute_name?.length > 28
                              ? item?.institute_name?.substring(0, 28) + "..."
                              : item?.institute_name
                            : "institute_name Not Defined"}
                        </p>
                      </div>
                      <div className="buttom-price-and-btn-area  ">
                        <div className="left-side-price-area-g-j  ">
                          <p>
                            <a
                              href="https://www.youtube.com/watch?v=dummyvideoid"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#4d4dff" }}
                            >
                              https://www.youtube.com/watch?d...
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="buttom-price-and-btn-area  ">
                        <div className="right-side-btn-area-g-j">
                          <a
                            href="#"
                            class="details-link"
                            onClick={() => {
                              handleOpenViewDialogBox(item?._id);
                            }}
                          >
                            Click for details
                          </a>
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

      {/* add video session */}

      <Dialog
        open={adddialogBoxOpen}
        onClose={handleCloseAddDialogBox}
        PaperProps={{
          style: {
            width: "500px",
          },
        }}
      >
        <DialogContent sx={{ mt: 1 }}>
          <DialogTitle
            style={{
              fontWeight: "500",
              fontSize: "text-xs", // Tailwind equivalent for 0.875rem
              padding: "0px",
            }}
            sx={{ textAlign: "center" }}
          >
            Add Video Session
          </DialogTitle>

          <DialogContent sx={{ mt: 4 }}>
            <Box>
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900 text-start	"
              >
                Session Name
              </label>
              <TextField
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 "
                placeholder="Please Enter Session Name"
                name="institute_name"
                value={addInstituteForm.institute_name}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900 text-start	"
              >
                URL
              </label>
              <TextField
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 "
                placeholder="Past Your URL Link"
                value={addInstituteForm.institute_url}
                name="institute_url"
                onChange={handleChange}
              />
            </Box>
          </DialogContent>

          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="mt-5"
          >
            <Button
              variant="contained"
              sx={{
                minWidth: "35px",
                padding: "6px 25px",
                marginRight: "15px",
                backgroundColor: "#AC885A",
                color: "#FFF",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#AC885A",
                  color: "#FFF",
                },
              }}
              type="submit"
              onClick={handleCloseAddDialogBox}
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
              disabled={isLoading}
              onClick={SaveAddInstitute}
            >
              {isLoading ? <div className="text-white">Saving...</div> : "Save"}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {/* View video session */}

      <Dialog
        open={viewdialogBoxOpen}
        onClose={handleCloseViewDialogBox}
        PaperProps={{
          style: {
            width: "500px",
          },
        }}
      >
        <DialogContent sx={{ mt: 1 }}>
          <DialogTitle sx={{ padding: "0px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">View Video Session</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {" "}
              </Box>
            </Box>
          </DialogTitle>

          <DialogContent sx={{ mt: 4 }}>
            <Box>
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900 text-start	"
              >
                Session Name
              </label>
              <TextField
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 "
                placeholder="Please Enter Session Name"
                value={sessionName}
                onChange={handleSessionNameChange}
                readOnly={!sessionNameEditMode}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900 text-start	"
              >
                URL
              </label>
              <TextField
                className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-yellow-dark focus:ring-offset-2 "
                placeholder="Past Your URL Link"
                value={url}
                onChange={handleUrlChange}
                readOnly={!urlEditMode}
              />
            </Box>
          </DialogContent>

          {/* <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="mt-5"
          >
            <Button
              variant="contained"
              sx={{
                minWidth: "35px",
                padding: "6px 25px",
                marginRight: "15px",
                backgroundColor: "#AC885A",
                color: "#FFF",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#AC885A",
                  color: "#FFF",
                },
              }}
              type="submit"
              onClick={handleCloseAddDialogBox}
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
              disabled={isLoading}
              onClick={SaveAddInstitute}
            >
              {isLoading ? <div className="text-white">Saving...</div> : "Save"}
            </Button>
          </DialogActions> */}
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="mt-5"
          >
            <Button
              variant="contained"
              sx={{
                minWidth: "35px",
                padding: "6px 25px",
                marginRight: "15px",
                backgroundColor: "#AC885A",
                color: "#FFF",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#AC885A",
                  color: "#FFF",
                },
              }}
              type="submit"
              onClick={handleCloseViewDialogBox}
            >
              Back
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AllVideoSessionCard;
