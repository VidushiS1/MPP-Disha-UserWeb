import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  Menu,
  MenuItem,
  Pagination,
  Select,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { styled, alpha } from "@mui/material/styles";
import ScholarshipImg from "../../assets/degree-two.png";
import { Tooltip, Typography } from "@mui/material";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import { getNationalScholarshipListData } from "../../../rtk/features/Scholarship/getNationalScholarshipListDataSlice";
import {getStateScholarshipListData} from "../../../rtk/features/Scholarship/getStateScholarshipListDataSlice";
import { getScholarshipDataById } from "../../../rtk/features/Scholarship/getScholarshipDataByIdSlice";
import {getCategoryList} from "../../../rtk/features/Scholarship/getCategoryListSlice";
import { useSelector, useDispatch } from "react-redux";
import ntdImg from "../../assets/No data.gif";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";


import Drawer from "@mui/material/Drawer";





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




const ScholarshipAllCard = () => {

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

   

  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("");
  const [sortByPvt, setSortByPvt] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemId2, setSelectedItemId2] = useState(null);
  const [NationalScholarshipListData,setNationalScholarshipListData] = useState([]);
  const [StateScholarshipListData,setStateScholarshipListData] = useState([])
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
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCat,setSelectedCat] = useState("");
  const [selectedValue,setSelectedValue] = useState("");
  const [selectedCatState,setSelectedCatState] = useState("");
  const [selectedValueState,setSelectedValueState] = useState("");



  useEffect(() => {
    dispatch(getCategoryList());
    }, []);


    const getCategoryList2 = useSelector(
      (state) => state.getCategoryList?.users?.data
    );

    console.log("getCategoryList2",getCategoryList2);

    const allCategoryIds = getCategoryList2?.map((item)=> item?._id)
    console.log("allCategoryIds",allCategoryIds);

    useEffect(() => {
      setLoading(true);
      dispatch(getNationalScholarshipListData({selectedValue,selectedCat})).then(()=>{
        setLoading(false);
      }).catch((error)=>{
        setLoading(false);
        console.error("Error fetching national scholarship data:", error);
      })
    }, [selectedValue,selectedCat]);
    

    useEffect(() => {
      setIsLoading(true);
      dispatch(getStateScholarshipListData({selectedValueState,selectedCatState})).then(()=>{
        setIsLoading(false);
      }).catch((error)=>{
        setIsLoading(false);
        console.error("Error fetching state scholarship data:", error);
      })
    }, [selectedValueState,selectedCatState]);



   const getNationalScholarshipListData2 = useSelector(
      (state) => state.getNationalScholarshipListData?.users?.data
    );

    const filterNationalData = getNationalScholarshipListData2?.filter((item)=>item?.level === "National");

console.log("filterNationalData",filterNationalData);

    const getStateScholarshipListData2 = useSelector(
      (state) => state.getStateScholarshipListData?.users?.data
    );

    const filterStateData = getStateScholarshipListData2?.filter((item)=>item?.level === "State");

    console.log("filterStateData",filterStateData);


    useEffect(() => {
      setNationalScholarshipListData(filterNationalData || []);
      setStateScholarshipListData(filterStateData || []);
  }, [getStateScholarshipListData2,getNationalScholarshipListData2]);


  useEffect(() => {
    let sortedData = [...NationalScholarshipListData];
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
    setNationalScholarshipListData(sortedData);
  }, [sortBy]);
  


  useEffect(() => {
    let sortedData = [...StateScholarshipListData];
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
    setStateScholarshipListData(sortedData);
  }, [sortByPvt]); 

  const handleChange = (event, newValue) => {
    setValue(newValue);
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

   const handlePageChange = (event, page) => {
        setCurrentPage(page);
      };
    
      const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return NationalScholarshipListData?.slice(startIndex, endIndex);
      };

      const handlePageChange2 = (event, page) => {
        setCurrentPage2(page);
      };
    
      const getCurrentPageItems2 = () => {
        const startIndex = (currentPage2 - 1) * itemsPerPage2;
        const endIndex = startIndex + itemsPerPage2;
        return StateScholarshipListData?.slice(startIndex, endIndex);
      };



      const handleCheckboxClick = (itemId) => {
        if (selectedItemId === itemId) {
          setSelectedItemId(null); 
        } else {
          setSelectedItemId(itemId); 
        }
      };
    
      const handleCheckboxDoubleClick = (itemId) => {
        setSelectedItemId(itemId); 
      };

       console.log("selectedItemId",selectedItemId);

      useEffect(() => {
         dispatch(getNationalScholarshipListData(selectedItemId));
         console.log("goes inside useEffect");
       
     }, [selectedItemId])

     const handleCheckboxClick2 = (itemId) => {
      if (selectedItemId2 === itemId) {
        setSelectedItemId2(null); 
      } else {
        setSelectedItemId2(itemId); 
      }
    };
  
    const handleCheckboxDoubleClick2 = (itemId) => {
      setSelectedItemId2(itemId); 
    };

     console.log("selectedItemId",selectedItemId);

    useEffect(() => {
       dispatch(getStateScholarshipListData(selectedItemId2));
       console.log("goes inside useEffect");
     
   }, [selectedItemId2])




   const ViewScholarshipDetails = async (id) => {
    try {
      setLoading(true);
      await dispatch(getScholarshipDataById(id));
      setLoading(false);
      navigate("/view-scholarship");
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false); 
    }

 };


 const ViewStateScholarshipDetails = async (id) => {
  try {
    setIsLoading(true);
    await dispatch(getScholarshipDataById(id));
 setIsLoading(false);
    navigate("/view-scholarship");
  } catch (error) {
    console.log(error);
  }finally{
 setIsLoading(false); 
  }
};













  const handleTextFieldClick = () => {
    if(selectedValue === ""){
      setSelectedValue('mp_police');
      setSelectedCat('');
    }else{
      setSelectedValue("");
      setSelectedCat('');
    }
  };

  const handleChangeCategory = (e) => {
    setSelectedCat(e.target.value);
    setSelectedValue('');
  };



  const handleTextFieldClickState = () => {
    if(selectedValueState === ""){
      setSelectedValueState('mp_police');
      setSelectedCatState('');
    }else{
      setSelectedValueState("");
      setSelectedCatState('');
    }
  };

  const handleChangeCategoryState = (e) => {
    setSelectedCatState(e.target.value);
    setSelectedValueState('');
  };


  const clearNationalLevelFilter = () => {
    setSelectedValue("");
    setSelectedCat('');
  };

  const clearStateLevelFilter = () => {
    setSelectedValueState("");
    setSelectedCatState('');
  };



  console.log("selectedValue",selectedValue);
  console.log("selectedCat",selectedCat);


  return (
    <>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold">Scholarship</h1>{" "}
            {/* Left Side */}
            <div className="flex-grow flex justify-center items-center">
              {" "}
              {/* Center */}
              <Box>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab label="National Level" value="1" />
                  <Tab label="State Level" value="2" />
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
                        Category
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
                    {getCategoryList2?.map((item) => (
                      <MenuItem key={item?._id}>
                        <Checkbox
                          checked={selectedItemId === item?._id}
                          onClick={() => handleCheckboxClick(item?._id)}
                          onDoubleClick={() =>
                            handleCheckboxDoubleClick(item?._id)
                          }
                        />
                        <ListItemText primary={item?.name} />
                      </MenuItem>
                    ))}
                  </Menu> */}
                  <div>
                    {["right"].map((anchor) => (
                      <React.Fragment key={anchor}>
                        <Tooltip title="National Level Filter">
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
                            <div className="flex items-center justify-between space-x-4 p-2 ps-4 mb-5 mt-8">
                              <Typography variant="h6">
                                Scholarship Filter
                              </Typography>
                              <IconButton onClick={toggleDrawer(anchor, false)}>
                                <CancelOutlinedIcon />
                              </IconButton>
                            </div>
                            <div className="p-4">
                              <TextField
                            className={`p-4 ${selectedValue ? 'bg-[#f5eee4]' : ''}`}
                                fullWidth
                                variant="outlined"
                                defaultValue="MP Police"
                                InputProps={{
                                  readOnly: true,
                                  onClick: handleTextFieldClick 
                                }}
                                sx={{cursor:"pointer"}}
                              />
                            </div>

                            <div className="p-4">
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select  label="Category" value={selectedCat} onChange={handleChangeCategory} >
                                <MenuItem value="">Select Category</MenuItem>
                                  {
                                    getCategoryList2?.map((item)=>(
                                        <MenuItem value={item?._id}>{item?.name}</MenuItem>
                                    ))
                                  }
                                 
                                </Select>
                              </FormControl>
                            </div>

                            <div className="flex items-center justify-center p-4 ">
                            <Button
                                variant="contained"
                                sx={{
                                  minWidth: "50px",
                                  padding: "6px 12px 6px 10px",
                                  backgroundColor: "#AC885A",
                                  color: "#FFF",
                                  textTransform: "capitalize",
                                  marginRight:"1rem",
                                  "&:hover": {
                                    backgroundColor: "#AC885A",
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
                                  backgroundColor: "#AC885A",
                                  color: "#FFF",
                                  textTransform: "capitalize",
                                  "&:hover": {
                                    backgroundColor: "#AC885A",
                                    color: "#FFF",
                                  },
                                }}
                                disabled={selectedCat === "" && selectedValue=== ""}
                                onClick={clearNationalLevelFilter}
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
                        Category
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
                    {getCategoryList2?.map((item) => (
                      <MenuItem key={item?._id}>
                        <Checkbox
                          checked={selectedItemId2 === item?._id}
                          onClick={() => handleCheckboxClick2(item?._id)}
                          onDoubleClick={() =>
                            handleCheckboxDoubleClick2(item?._id)
                          }
                        />
                        <ListItemText primary={item?.name} />
                      </MenuItem>
                    ))}
                  </Menu> */}
                  <div>
                    {["right"].map((anchor) => (
                      <React.Fragment key={anchor}>
                        <Tooltip title="State Level Filter">
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
                            onKeyDown={toggleDrawerTow(anchor, false)}
                          >
                            <div className="flex items-center justify-between space-x-4 p-2 ps-4 mb-5 mt-8">
                              <Typography variant="h6">
                                Scholarship Filter
                              </Typography>
                              <IconButton
                                onClick={toggleDrawerTow(anchor, false)}
                              >
                                <CancelOutlinedIcon />
                              </IconButton>
                            </div>
                            <div className="p-4 cursor-pointer">
                            <TextField
                              className={`p-4 ${selectedValueState ? 'bg-[#f5eee4]' : ''} cursor-pointer`}
                                fullWidth
                                variant="outlined"
                                defaultValue="MP Police"
                                InputProps={{
                                  readOnly: true,
                                  onClick: handleTextFieldClickState 
                                }}
                                sx={{cursor:"pointer"}}
                              />
                            </div>

                            <div className="p-4">
                            <FormControl variant="outlined" fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select  label="Category" value={selectedCatState} onChange={handleChangeCategoryState} >
                                <MenuItem value="">Select Category</MenuItem>
                                  {
                                    getCategoryList2?.map((item)=>(
                                        <MenuItem value={item?._id}>{item?.name}</MenuItem>
                                    ))
                                  }
                                 
                                </Select>
                              </FormControl>
                            </div>

                            <div className="flex items-center justify-center p-4 ">
                            <Button
                                variant="contained"
                                sx={{
                                  minWidth: "50px",
                                  padding: "6px 12px 6px 10px",
                                  backgroundColor: "#AC885A",
                                  color: "#FFF",
                                  textTransform: "capitalize",
                                  marginRight:"1rem",
                                  "&:hover": {
                                    backgroundColor: "#AC885A",
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
                                  backgroundColor: "#AC885A",
                                  color: "#FFF",
                                  textTransform: "capitalize",
                                  "&:hover": {
                                    backgroundColor: "#AC885A",
                                    color: "#FFF",
                                  },
                                }}
                                disabled={selectedCatState === "" && selectedValueState === ""}
                                onClick={clearStateLevelFilter}
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
                  getCurrentPageItems()?.map((item) => (
                    <div
                      key={item.id}
                      className="max-w-sm shadow-md rounded-md main-card-g-j p-4 mb-1 relative"
                      //  className={item?.closing ? "max-w-sm shadow-md rounded-md main-card-g-j-closing p-4 mb-1" : "max-w-sm shadow-md rounded-md main-card-g-j p-4 mb-1" }
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
                            <img src={ScholarshipImg} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="left-side-contant-g-s">
                        <div className="top-heading-area-g-j">
                          <p>
                            {item?.scheme_name?.length > 27
                              ? item?.scheme_name?.substring(0, 22) + "..."
                              : item?.scheme_name}
                          </p>
                          {item?.closing === true && (
                            <h6 className="bg-white text-red-700 text-sm shadow-md p-1 rounded-md w-20 text-center font-bold absolute right-3 top-14">
                              Closed
                            </h6>
                          )}
                        </div>
                        <div className="buttom-price-and-btn-area">
                          <div className="left-side-price-area-g-j">
                            <p>
                              {item?.amount_of_scholership?.length > 33
                                ? item?.amount_of_scholership?.substring(
                                    0,
                                    33
                                  ) + "..."
                                : item?.amount_of_scholership}
                            </p>
                          </div>
                          <div className="right-side-btn-area-g-j">
                            <a
                              href="#"
                              class="details-link"
                              onClick={() => ViewScholarshipDetails(item?._id)}
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
                    count={Math.ceil(
                      NationalScholarshipListData?.length / itemsPerPage
                    )}
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
                    <div className="max-w-sm shadow-md rounded-md main-card-g-j p-4 mb-1 relative">
                      <div
                        className="right-side-icon-g-s"
                        style={{ paddingRight: "23px" }}
                      >
                        <div className="profile-wrapper">
                          <div
                            className="profile-image"
                            style={{ width: "40px" }}
                          >
                            <img src={ScholarshipImg} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="left-side-contant-g-s">
                        <div className="top-heading-area-g-j ">
                          <p>
                            {item?.scheme_name?.length > 27
                              ? item?.scheme_name?.substring(0, 22) + "..."
                              : item?.scheme_name}
                          </p>
                          {item?.closing === true && (
                            <h6 className="bg-white text-red-700 text-sm shadow-md p-1 rounded-md w-20 text-center font-bold absolute right-1 top-2">
                              Closed
                            </h6>
                          )}
                        </div>
                        <div className="buttom-price-and-btn-area  ">
                          <div className="left-side-price-area-g-j ">
                            <p>
                              {item?.amount_of_scholership?.length > 33
                                ? item?.amount_of_scholership?.substring(
                                    0,
                                    33
                                  ) + "..."
                                : item?.amount_of_scholership}
                            </p>
                          </div>
                          <div className="right-side-btn-area-g-j">
                            <a
                              href="#"
                              class="details-link"
                              onClick={() =>
                                ViewStateScholarshipDetails(item?._id)
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
                    count={Math.ceil(
                      StateScholarshipListData?.length / itemsPerPage2
                    )}
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

export default ScholarshipAllCard;
