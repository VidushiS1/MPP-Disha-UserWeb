import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AddIcon from "@mui/icons-material/Add";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import preImg from "../../assets/residential-two.png";
import govImg from "../../assets/government-two.png";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { blue } from "@mui/material/colors";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { Tooltip, Typography,CircularProgress, IconButton, TextField, FormControl, InputLabel, Select } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {getGovJobsListData} from "../../../rtk/features/JobManager/getGovJobsListDataSlice"
import {getPrivateJobsListData} from "../../../rtk/features/JobManager/getPrivateJobsListDataSlice"
import {getGovJobsListDataById} from "../../../rtk/features/JobManager/getGovJobsListDataByIdSlice"
import {getPrivateJobsListDataById} from "../../../rtk/features/JobManager/getPrivateJobsListDataByIdSlice"
import {getGovSectorList} from "../../../rtk/features/JobManager/getGovSectorListSlice"
import {getPrivateSectorList} from "../../../rtk/features/JobManager/getPrivateSectorListSlice"
import ntdImg from "../../assets/No data.gif";
import Drawer from "@mui/material/Drawer";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import OutlinedInput from "@mui/material/OutlinedInput";
import {getCategoryList} from "../../../rtk/features/Scholarship/getCategoryListSlice"
import {getGovAgencyListData} from "../../../rtk/features/JobManager/getGovAgencyListDataSlice";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const JobManagerAllCardSection = () => {

  const [sectorName, setSectorName] = React.useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [govtSectorName, setGovtSectorName] = React.useState([]);
  const [govtSelectAll, setGovtSelectAll] = useState(false);
  console.log("govtSectorName",govtSectorName);

  const [agencyName,setAgencyName] = React.useState([]);
  const [agencySelectAll, setAgencySelectAll] = useState(false);

  const [personName, setPersonName] = React.useState([]);

   const [state, setState] = React.useState({
     right: false,
   });
   const [stateTow, setStateTow] = React.useState({
     right: false,
   });

   const toggleDrawer = (anchor, open) => (event) => {
     if (
       event.type === "keydown" &&
       (event.key === "Tab" || event.key === "Shift")
     ) {
       return;
     }

     setState({ ...state, [anchor]: open });
   };

   const toggleDrawerTow = (anchor, open) => (event) => {
     if (
       event.type === "keydown" &&
       (event.key === "Tab" || event.key === "Shift")
     ) {
       return;
     }

     setStateTow({ ...stateTow, [anchor]: open });
   };
  const [sortBy, setSortBy] = useState("");
  const [sortByPvt, setSortByPvt] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  



  useEffect(() => {
    dispatch(getGovSectorList());
    dispatch(getPrivateSectorList());
    dispatch(getCategoryList());
    dispatch(getGovAgencyListData());
    }, []);


    const getPrivateSectorList2 = useSelector(
      (state) => state.getPrivateSectorList?.users?.data
    );

      const getGovSectorList2 = useSelector(
        (state) => state.getGovSectorList?.users?.data
      );



      const getGovAgencyListData2 = useSelector(
        (state) => state.getGovAgencyListData?.users?.data
      );

 
      



      let getPvtSectorIds = getPrivateSectorList2?.map((item)=> item?._id);
      let getAgnecyIds = getGovAgencyListData2?.map((item)=> item?._id)

      console.log("getPvtSectorIds",getPvtSectorIds);

      console.log("getGovSectorList2",getGovSectorList2);
      console.log("getPrivateSectorList2",getPrivateSectorList2);


      // useEffect(() => {
      //   setLoading(true);
      //   if (getGovtSectorIds?.length) {
      //     dispatch(getGovJobsListData({getGovtSectorIds,getAgnecyIds})).then(()=>{
      //       setLoading(false);
      //     }).catch((error)=>{
      //       setLoading(false);
      //       console.error("Error fetching national scholarship data:", error);
      //     })
      //   }
      // }, []);

      let getGovtSectorIds = getGovSectorList2?.map((item)=> item?._id)
      console.log("getGovtSectorIds",getGovtSectorIds);
      
      useEffect(() => {
        if (getGovtSectorIds || getAgnecyIds) {
          setLoading(true);
          dispatch(getGovJobsListData({ getGovtSectorIds, getAgnecyIds }))
            .then(() => {
              setLoading(false);
            })
            .catch((error) => {
              setLoading(false);
              console.error("Error fetching national scholarship data:", error);
            });
        }
      }, []);
      
   
      






    
      useEffect(() => {
        setIsLoading(true);
        if (getPvtSectorIds?.length > 0) {
        dispatch(getPrivateJobsListData(getPvtSectorIds)).then(()=>{
          setIsLoading(false);
        }).catch((error)=>{
          setIsLoading(false);
          console.error("Error fetching state scholarship data:", error);
        })
      }
      }, []);


  const [govtJobsData,setGovtJobsData] = useState([]);
  const [privateJobsData,setPrivateJobsData] = useState([]);
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();
  const itemsPerPage2 = 9;
  const [currentPage2, setCurrentPage2] = useState(1);
  const [value, setValue] = useState("1");
  const navigate = useNavigate();
  const [sortByAnchorEl, setSortByAnchorEl] = React.useState(null);
  const sortByOpen = Boolean(sortByAnchorEl);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElGovSector, setAnchorElUserGovSector] = React.useState(null);
     const [anchorElPrevSector, setAnchorElUserPrevSector] = React.useState(null);



    const getGovJobsListData2 = useSelector(
      (state) => state.getGovJobsListData?.users?.data
    );

    const getPrivateJobsListData2 = useSelector(
      (state) => state.getPrivateJobsListData?.users?.data
    );

    console.log("getGovJobsListData2",getGovJobsListData2);
    console.log("getPrivateJobsListData2",getPrivateJobsListData2);


    useEffect(() => {
      setGovtJobsData(getGovJobsListData2 || []);
      setPrivateJobsData(getPrivateJobsListData2 || []);
  }, [getGovJobsListData2,getPrivateJobsListData2]);


  useEffect(() => {
    let sortedData = [...govtJobsData];
    if (sortBy === "latest") {
      sortedData?.sort(
        (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
      );
      handleSortByClose();
    } else if (sortBy === "oldest") {
      sortedData?.sort(
        (a, b) => new Date(a?.createdAt) - new Date(b?.createdAt)
      );
      handleSortByClose();
    }
    setGovtJobsData(sortedData);
  }, [sortBy]); 


  useEffect(() => {
    let sortedData = [...privateJobsData];
    if (sortByPvt === "latest") {
      sortedData?.sort(
        (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
      );
      handleSortByClose();
    } else if (sortByPvt === "oldest") {
      sortedData?.sort(
        (a, b) => new Date(a?.createdAt) - new Date(b?.createdAt)
      );
      handleSortByClose();
    }
    setPrivateJobsData(sortedData);
  }, [sortByPvt]); 





  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


     const handleOpenUserMenu = (event) => {
       setAnchorElUser(event.currentTarget);
     };

      const handleOpenGovSectorMenu = (event) => {
        setAnchorElUserGovSector(event.currentTarget);
      };

        const handleOpenPrevSectorMenu = (event) => {
          setAnchorElUserPrevSector(event.currentTarget);
        };



     const handleCloseUserMenu = () => {
       setAnchorElUser(null);
     };
     const handleCloseGovSectorMenu = () => {
       setAnchorElUserGovSector(null);
     };
     const handleClosePrevSectorMenu = () => {
       setAnchorElUserPrevSector(null);
     };


   const handleSortByClick = (event) => {
     setSortByAnchorEl(event.currentTarget);
   };
   const handleSortByClose = () => {
     setSortByAnchorEl(null);
   };


   const handleClickOutside = (event) => {
     if (menuRef.current && !menuRef.current.contains(event.target)) {
       setIsMenuOpen(false);
     }
   };

   useEffect(() => {
     document.addEventListener("mousedown", handleClickOutside);
     return () => {
       document.removeEventListener("mousedown", handleClickOutside);
     };
   }, []);

     const ViewGovJobProfileDataById = async(id) => {
      try {
        setLoading(true);
        await dispatch(getGovJobsListDataById(id))
         navigate("/view-job-details");
         setLoading(false);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
     };


     const ViewPreJobProfileDataById = async(id) => {
      try {
        setIsLoading(true);
        await dispatch(getPrivateJobsListDataById(id))
        setIsLoading(false);
        navigate("/view-private-job-details");
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }finally{
        setIsLoading(false);
      }
     };

      const AddGovJob = () => {
        navigate("/add-government-job");
      };
      const AddPreJob = () => {
        navigate("/add-private-job");
      };
    
      
    
 useEffect(() => {
  if(sectorName?.length || getPvtSectorIds?.length){
    dispatch(getPrivateJobsListData(sectorName || getPvtSectorIds))
  }
 }, [sectorName])


 useEffect(() => {
  if(govtSectorName?.length || agencyName?.length ){
    setIsLoading(true);
    dispatch(getGovJobsListData({getGovtSectorIds:govtSectorName,getAgnecyIds:agencyName}))
  }setIsLoading(false);
 }, [agencyName,govtSectorName])
 


      

      const handlePageChange = (event, page) => {
        setCurrentPage(page);
      };
    
      const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return govtJobsData?.slice(startIndex, endIndex);
      };

      const handlePageChange2 = (event, page) => {
        setCurrentPage2(page);
      };
    
      const getCurrentPageItems2 = () => {
        const startIndex = (currentPage2 - 1) * itemsPerPage2;
        const endIndex = startIndex + itemsPerPage2;
        return privateJobsData?.slice(startIndex, endIndex);
      };



 const handleChangeValueSector = (event) => {
  const {
    target: { value },
  } = event;

  if (value.includes("Select All")) {
    if (!selectAll) {
      const allIds = getPrivateSectorList2?.map((item) => item._id);
      console.log("allIds",allIds);
      setSectorName(allIds);
    } else {
      setSectorName();
    }
    setSelectAll(!selectAll);
  } else {
    setSelectAll(false); 
    setSectorName(value);
  }
};


const handleChangeGovtSector = (event) => {
  const {
    target: { value },
  } = event;

  if (value.includes("Select All")) {
    if (!govtSelectAll) {
      const allIds = getGovSectorList2?.map((item) => item._id);
      console.log("allIds",allIds);
      setGovtSectorName(allIds);
    } else {
      setGovtSectorName([]);
    }
    setGovtSelectAll(!govtSelectAll);
  } else {
    setGovtSelectAll(false); 
    setGovtSectorName(value);
  }
};


const handleChangeAgency = (event) => {
  const {
    target: { value },
  } = event;

  if (value.includes("Select All")) {
    if (!agencySelectAll) {
      const allIds = getGovAgencyListData2?.map((item) => item._id);
      console.log("allIds",allIds);
      setAgencyName(allIds);
    } else {
      setAgencyName([]);
    }
    setAgencySelectAll(!agencySelectAll);
  } else {
    setAgencySelectAll(false); 
    setAgencyName(value);
  }
};




const ClearPvtSectorFilter =()=>{
setSectorName(getPvtSectorIds);
}
const ClearGovtSectorFilter =()=>{
setGovtSectorName([]);
setAgencyName([]);
}

   

  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold">Employment</h1>{" "}
            {/* Left Side */}
            <div className="flex-grow flex justify-center items-center">
              {" "}
              {/* Center */}
              <Box >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab label="Government Sector" value="1" />
                  <Tab label="Private Sector" value="2" />
                </Tabs>
              </Box>
            </div>
            <div className="flex items-center">
              {" "}
              {/* Right Side */}
              {value === "1" && (
                <>
                  {/* <Tooltip title="Select Sector">
                    <Button
                      variant="contained"
                      sx={{
                        minWidth: "40px",
                        padding: "6px 12px 6px 10px",
                        marginRight: "10px",
                        backgroundColor: "#AC885A",
                        color: "#FFF",
                        textTransform: "capitalize",
                        "&:hover": {
                          backgroundColor: "#AC885A",
                          color: "#FFF",
                        },
                      }}
                      onClick={handleOpenGovSectorMenu}
                    >
                      <Typography
                        textAlign="center"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <FilterAltTwoToneIcon
                          sx={{
                            color: "#FFF",
                            marginRight: "5px",
                          }}
                        />
                        Gov. Sector
                      </Typography>
                    </Button>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px", height: "350px" }}
                    id="menu-appbar"
                    anchorEl={anchorElGovSector}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElGovSector)}
                    onClose={handleCloseGovSectorMenu}
                  >
                    {getGovSectorList2?.map((item) => (
                      <MenuItem
                        key={item?._id}
                        onClick={handleMenuItemClick(
                          item?._id,
                          item?.job_sector
                        )}
                      >
                        <Checkbox checked={selectedCheckboxes[item?._id]} />
                        <ListItemText primary={item?.job_sector} />
                      </MenuItem>
                    ))}
                  </Menu> */}

                  <div>
                    {["right"].map((anchor) => (
                      <React.Fragment key={anchor}>
                        <Tooltip title="Select Sector">
                          <Button
                            variant="contained"
                            sx={{
                              minWidth: "40px",
                              padding: "6px 12px 6px 10px",
                              marginRight: "10px",
                              backgroundColor: "#AC885A",
                              color: "#FFF",
                              textTransform: "capitalize",
                              "&:hover": {
                                backgroundColor: "#AC885A",
                                color: "#FFF",
                              },
                            }}
                            onClick={toggleDrawer(anchor, true)}
                          >
                            <Typography
                              textAlign="center"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <FilterAltTwoToneIcon
                                sx={{
                                  color: "#FFF",
                                  marginRight: "5px",
                                }}
                              />
                              Filter
                            </Typography>
                          </Button>
                        </Tooltip>

                        <Drawer
                          anchor={anchor}
                          open={state[anchor]}
                          // onClose={toggleDrawer(anchor, false)}
                          sx={{
                            "& .MuiDrawer-paper": {
                              height: 350,
                              borderTopLeftRadius: 15,
                              borderBottomLeftRadius: 15,
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width:
                                anchor === "top" || anchor === "bottom"
                                  ? "auto"
                                  : 300,
                            }}
                            role="presentation"
                            onKeyDown={toggleDrawer(anchor, false)}
                          >
                            <div className="flex items-center justify-between space-x-4 p-2 ps-4 mb-3 mt-5">
                              <Typography variant="h6">
                                Government Filter
                              </Typography>
                              <IconButton onClick={toggleDrawer(anchor, false)}>
                                <CancelOutlinedIcon />
                              </IconButton>
                            </div>
                            <div className="p-4">
                              <label
                                htmlFor="about"
                                className="block text-sm font-medium leading-6 text-gray-900 text-start	"
                              >
                                Agency
                              </label>
                              <Select
                                fullWidth
                                multiple
                                value={agencyName}
                                onChange={handleChangeAgency}
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                  const selectedNames = getGovAgencyListData2
                                    ?.filter((item) =>
                                      selected.includes(item?._id)
                                    )
                                    .map((item) => item?.job_agency);
                                  return selectedNames.join(", ");
                                }}
                                MenuProps={MenuProps}
                                // disabled={govtSectorName?.length > 0}
                              >
                             

<MenuItem value="Select All">
                                <Checkbox checked={agencySelectAll} />
                                <ListItemText primary="Select All" />
                              </MenuItem>

                              {getGovAgencyListData2?.map((name, i) => (
                                <MenuItem key={i} value={name?._id}>
                                  <Checkbox
                                    checked={agencyName?.indexOf(name?._id) > -1}
                                  />
                                  <ListItemText primary={name?.job_agency} />
                                </MenuItem>
                              ))}

                              </Select>
                            </div>

                            <div className="px-4 pb-4">
                              <label
                                htmlFor="about"
                                className="block text-sm font-medium leading-6 text-gray-900 text-start	"
                              >
                                Sector
                              </label>
                              <Select
                                fullWidth
                                multiple
                                value={govtSectorName}
                                onChange={handleChangeGovtSector}
                                input={<OutlinedInput />}
                                renderValue={(selected) => {
                                  const selectedNames = getGovSectorList2
                                    ?.filter((item) =>
                                      selected.includes(item?._id)
                                    )
                                    .map((item) => item?.job_sector);
                                  return selectedNames.join(", ");
                                }}
                                MenuProps={MenuProps}
                                // disabled={agencyName?.length > 0}
                              >
                             

<MenuItem value="Select All">
                                <Checkbox checked={govtSelectAll} />
                                <ListItemText primary="Select All" />
                              </MenuItem>

                              {getGovSectorList2?.map((name, i) => (
                                <MenuItem key={i} value={name?._id}>
                                  <Checkbox
                                    checked={govtSectorName?.indexOf(name?._id) > -1}
                                  />
                                  <ListItemText primary={name?.job_sector} />
                                </MenuItem>
                              ))}







                              </Select>
                            </div>

                            <div className="flex items-center justify-center p-4 ">
                            <Button
                                variant="contained"
                                sx={{
                                  minWidth: "50px",
                                  padding: "6px 12px 6px 10px",
                                  backgroundColor: "#264796",
                                  color: "#FFF",
                                  marginRight:"1rem",
                                  textTransform: "capitalize",
                                  "&:hover": {
                                    backgroundColor: "#264796",
                                    color: "#FFF",
                                  },
                                }}
                                onClick={toggleDrawer(anchor, false)}
                              >
                                Save
                              </Button>
                           
                              <Button
                                variant="contained"
                                sx={{
                                  minWidth: "50px",
                                  padding: "6px 12px 6px 10px",
                                  backgroundColor: "#264796",
                                  color: "#FFF",
                                  textTransform: "capitalize",
                                  "&:hover": {
                                    backgroundColor: "#264796",
                                    color: "#FFF",
                                  },
                                }}
                                disabled={agencyName?.length === 0 && govtSectorName?.length === 0 }
                                onClick={ClearGovtSectorFilter}
                              >
                                Clear Filter
                              </Button>
                            </div>
                          </Box>
                        </Drawer>
                      </React.Fragment>
                    ))}
                  </div>
                </>
              )}
              {value === "2" && (
                <>
                  {/* <Tooltip title="Select Sector">
                    <Button
                      variant="contained"
                      sx={{
                        minWidth: "40px",
                        padding: "6px 12px 6px 10px",
                        marginRight: "10px",
                        backgroundColor: "#AC885A",
                        color: "#FFF",
                        textTransform: "capitalize",
                        "&:hover": {
                          backgroundColor: "#AC885A",
                          color: "#FFF",
                        },
                      }}
                      onClick={handleOpenPrevSectorMenu}
                    >
                      <Typography
                        textAlign="center"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-evenly",
                        }}
                      >
                        <FilterAltTwoToneIcon
                          sx={{
                            color: "#FFF",
                            marginRight: "5px",
                          }}
                        />
                        Pvt. Sector
                      </Typography>
                    </Button>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px", height: "350px" }}
                    id="menu-appbar"
                    anchorEl={anchorElPrevSector}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElPrevSector)}
                    onClose={handleClosePrevSectorMenu}
                  >
                    {getPrivateSectorList2?.map((item) => (
                      <MenuItem
                        key={item?._id}
                        onClick={handleMenuItemClick2(
                          item?._id,
                          item?.job_sector
                        )}
                      >
                        <Checkbox checked={selectedCheckboxes2[item?._id]} />
                        <ListItemText primary={item?.job_sector} />
                      </MenuItem>
                    ))}
                  </Menu> */}
                  <div>
                    {["right"].map((anchor) => (
                      <React.Fragment key={anchor}>
                        <Tooltip title="Select Sector">
                          <Button
                            variant="contained"
                            sx={{
                              minWidth: "40px",
                              padding: "6px 12px 6px 10px",
                              marginRight: "10px",
                              backgroundColor: "#AC885A",
                              color: "#FFF",
                              textTransform: "capitalize",
                              "&:hover": {
                                backgroundColor: "#AC885A",
                                color: "#FFF",
                              },
                            }}
                            onClick={toggleDrawerTow(anchor, true)}
                          >
                            <Typography
                              textAlign="center"
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-evenly",
                              }}
                            >
                              <FilterAltTwoToneIcon
                                sx={{
                                  color: "#FFF",
                                  marginRight: "5px",
                                }}
                              />
                              Filter
                            </Typography>
                          </Button>
                        </Tooltip>

                        <Drawer
                          anchor={anchor}
                          open={stateTow[anchor]}
                          // onClose={toggleDrawer(anchor, false)}
                          sx={{
                            "& .MuiDrawer-paper": {
                              height: 300,
                              borderTopLeftRadius: 15,
                              borderBottomLeftRadius: 15,
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width:
                                anchor === "top" || anchor === "bottom"
                                  ? "auto"
                                  : 300,
                            }}
                            role="presentation"
                            onKeyDown={toggleDrawerTow(anchor, false)}
                          >
                            <div className="flex items-center justify-between space-x-4 p-2 ps-4 mb-5 mt-8">
                              <Typography variant="h6">
                                Previte Filter
                              </Typography>
                              <IconButton
                                onClick={toggleDrawerTow(anchor, false)}
                              >
                                <CancelOutlinedIcon />
                              </IconButton>
                            </div>
                            {/* <div className="p-4">
                              <label
                                htmlFor="about"
                                className="block text-sm font-medium leading-6 text-gray-900 text-start	"
                              >
                                Agency
                              </label>
                              <Select
                                fullWidth
                                multiple
                                value={personName}
                                onChange={handleChangeValue}
                                input={<OutlinedInput />}
                                renderValue={(selected) => selected.join(", ")}
                                MenuProps={MenuProps}
                              >
                                {names.map((name) => (
                                  <MenuItem key={name} value={name}>
                                    <Checkbox
                                      checked={personName.indexOf(name) > -1}
                                    />
                                    <ListItemText primary={name} />
                                  </MenuItem>
                                ))}
                              </Select>
                            </div> */}

                            <div className="px-4 pb-8">
                              <label
                                htmlFor="about"
                                className="block text-sm font-medium leading-6 text-gray-900 text-start	"
                              >
                                Sector
                              </label>
                              <Select
                                fullWidth
                                multiple
                                value={sectorName}
                                onChange={handleChangeValueSector}
                                input={<OutlinedInput />}
                                // renderValue={(selected) => selected.join(", ")}
                                renderValue={(selected) => {
                                  const selectedNames = getPrivateSectorList2
                                    ?.filter((item) =>
                                      selected.includes(item?._id)
                                    )
                                    .map((item) => item?.job_sector);
                                  return selectedNames.join(", ");
                                }}
                                MenuProps={MenuProps}
                              >
                                 <MenuItem value="Select All">
                                <Checkbox checked={selectAll} />
                                <ListItemText primary="Select All" />
                              </MenuItem>
                              

{getPrivateSectorList2?.map((name, i) => (
                                <MenuItem key={i} value={name?._id}>
                                  <Checkbox
                                    checked={sectorName?.indexOf(name?._id) > -1}
                                  />
                                  <ListItemText primary={name?.job_sector} />
                                </MenuItem>
                              ))}
                              </Select>
                            </div>

                            <div className="flex items-center justify-center p-4 ">
                            <Button
                                variant="contained"
                                sx={{
                                  minWidth: "50px",
                                  padding: "6px 12px 6px 10px",
                                  backgroundColor: "#264796",
                                  color: "#FFF",
                                  textTransform: "capitalize",
                                  marginRight:"1rem",
                                  "&:hover": {
                                    backgroundColor: "#264796",
                                    color: "#FFF",
                                  },
                                }}
                                onClick={toggleDrawerTow(anchor, false)}
                              >
                               Save
                              </Button>
                              <Button
                                variant="contained"
                                sx={{
                                  minWidth: "50px",
                                  padding: "6px 12px 6px 10px",
                                  backgroundColor: "#264796",
                                  color: "#FFF",
                                  textTransform: "capitalize",
                                  "&:hover": {
                                    backgroundColor: "#264796",
                                    color: "#FFF",
                                  },
                                }}
                                onClick={ClearPvtSectorFilter}
                                disabled={sectorName?.length === 0  }

                              >
                                Clear Filter
                              </Button>
                            </div>
                          </Box>
                        </Drawer>
                      </React.Fragment>
                    ))}
                  </div>
                </>
              )}
              {value === "2" && (
                <ThemeProvider theme={themeColor}>
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
                    {sortByPvt ? `Sort by ${sortByPvt}` : "Sort by"}
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
                    <MenuItem onClick={() => setSortByPvt("latest")}>
                      Latest
                    </MenuItem>
                    <MenuItem onClick={() => setSortByPvt("oldest")}>
                      Oldest
                    </MenuItem>
                  </StyledMenu>
                </ThemeProvider>
              )}
              {value === "1" && (
                <ThemeProvider theme={themeColor}>
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
                    <MenuItem onClick={() => setSortBy("latest")}>
                      Latest
                    </MenuItem>
                    <MenuItem onClick={() => setSortBy("oldest")}>
                      Oldest
                    </MenuItem>
                  </StyledMenu>
                </ThemeProvider>
              )}
            </div>
          </div>

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
            <TabPanel
              value="1"
              sx={{ padding: "0", marginTop: "58px", height: "67vh" }}
              className="relative "
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-3 gap-4">
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
                            <img src={govImg} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="left-side-contant-g-s">
                        <div className="top-heading-area-g-j">
                          <p>
                            {item?.job_title?.length > 27
                              ? item?.job_title?.substring(0, 22) + "..."
                              : item?.job_title}
                          </p>
                        </div>
                        <div className="buttom-price-and-btn-area">
                          <div className="left-side-price-area-g-j">
                            <p>
                              {item?.salary?.length > 35
                                ? item?.salary?.substring(0, 35) + "..."
                                : item?.salary}
                            </p>
                          </div>
                          <div className="right-side-btn-area-g-j">
                            <a
                              href="#"
                              className="details-link"
                              onClick={() =>
                                ViewGovJobProfileDataById(item?._id)
                              }
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

              <div className="absolute bottom-0 right-0 flex items-center justify-end pt-10">
                <ThemeProvider theme={theme}>
                  <Pagination
                    count={Math.ceil(govtJobsData?.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    sx={{ color: "#ff8000" }}
                    variant="outlined"
                    shape="rounded"
                  />
                </ThemeProvider>
              </div>
            </TabPanel>
          )}

          {isLoading ? (
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
            <TabPanel
              value="2"
              sx={{ padding: "0", marginTop: "70px", height: "65vh" }}
              className="relative "
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-3 gap-4">
                {getCurrentPageItems2()?.length === 0 ? (
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
                  getCurrentPageItems2()?.map((item) => (
                    <div className="max-w-sm   shadow-md rounded-md main-card-g-j p-4 mb-1">
                      <div
                        className="right-side-icon-g-s"
                        style={{ paddingRight: "23px" }}
                      >
                        <div className="profile-wrapper">
                          <div
                            className="profile-image"
                            style={{ width: "40px" }}
                          >
                            <img src={preImg} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="left-side-contant-g-s">
                        <div className="top-heading-area-g-j ">
                          <p>
                            {item?.job_title?.length > 27
                              ? item?.job_title?.substring(0, 22) + "..."
                              : item?.job_title}
                          </p>
                        </div>
                        <div className="buttom-price-and-btn-area  ">
                          <div className="left-side-price-area-g-j ">
                            <p>
                              {item?.salary?.length > 35
                                ? item?.salary?.substring(0, 35) + "..."
                                : item?.salary}
                            </p>
                          </div>
                          <div className="right-side-btn-area-g-j">
                            <a
                              href="#"
                              className="details-link"
                              onClick={() =>
                                ViewPreJobProfileDataById(item?._id)
                              }
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
              <div className="absolute bottom-0 right-0 flex items-center justify-end pt-12">
                <ThemeProvider theme={theme}>
                  <Pagination
                    count={Math.ceil(privateJobsData?.length / itemsPerPage2)}
                    page={currentPage2}
                    onChange={handlePageChange2}
                    sx={{ color: "#ff8000" }}
                    variant="outlined"
                    shape="rounded"
                  />
                </ThemeProvider>
              </div>
            </TabPanel>
          )}
        </TabContext>
      </Box>
    </>
  );
};

export default JobManagerAllCardSection;
