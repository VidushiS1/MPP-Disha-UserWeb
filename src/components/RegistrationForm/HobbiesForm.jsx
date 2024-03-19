import React, { useState } from "react";
import Logo from "../../assets/drwerdishaicon.png";
import StadyTree from "../../assets/student-hobbies.gif";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, CircularProgress, IconButton, TextField } from "@mui/material";
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
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import NatureOutlinedIcon from "@mui/icons-material/NatureOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import SubjectIcon from "@mui/icons-material/Subject";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import MovieCreationOutlinedIcon from "@mui/icons-material/MovieCreationOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import ThreeDRotationOutlinedIcon from "@mui/icons-material/ThreeDRotationOutlined";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import CasinoOutlinedIcon from "@mui/icons-material/CasinoOutlined";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import EmojiPeopleOutlinedIcon from "@mui/icons-material/EmojiPeopleOutlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import LocalFloristOutlinedIcon from "@mui/icons-material/LocalFloristOutlined";
import SchoolIcon from "@mui/icons-material/School";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import OutdoorGrillOutlinedIcon from "@mui/icons-material/OutdoorGrillOutlined";
import { Link, useNavigate } from "react-router-dom";
import {addHobiesData} from "../../../rtk/features/RegistrationForm/addHobiesDataSlice"

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
const HobbiesForm = () => {
  const [loading, setLoading] = useState(false);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const navigate = useNavigate();
  const customId = "custom-id-yes";
    const hobbies = [
      {
        name: "Academic Projects",
        icon: <SchoolOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Cooking",
        icon: <OutdoorGrillOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Environment & Nature",
        icon: <NatureOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Historical Books",
        icon: <HistoryOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Movies",
        icon: <LocalMoviesOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      { name: "Acting", icon: <FaceOutlinedIcon sx={{ color: "#AC885A" }} /> },
      { name: "Craft", icon: <BuildOutlinedIcon sx={{ color: "#AC885A" }} /> },
      {
        name: "Essay Writing",
        icon: <SubjectIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Planning Events",
        icon: <EventNoteOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Advising & Helping People",
        icon: <EmojiObjectsOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Creative Writing",
        icon: <CreateOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Film Making",
        icon: <MovieCreationOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Logical Mind Games",
        icon: <ExtensionOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Making 3D Models",
        icon: <ThreeDRotationOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Puzzles",
        icon: <CasinoOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Sports",
        icon: <SportsSoccerOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Dancing",
        icon: <InsertEmoticonOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Writing",
        icon: <CreateOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Reading",
        icon: <MenuBookOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Share Market",
        icon: <BarChartOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      { name: "Art", icon: <PaletteOutlinedIcon sx={{ color: "#AC885A" }} /> },
      {
        name: "Drawing",
        icon: <CreateOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Debating",
        icon: <ForumOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Gaming",
        icon: <SportsEsportsOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Music Vocal",
        icon: <MusicNoteOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Research",
        icon: <SearchOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Caring For Animals",
        icon: <PetsOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "UX/UI Design",
        icon: <DesignServicesOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Gardening",
        icon: <LocalFloristOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      { name: "NCC", icon: <SchoolIcon sx={{ color: "#AC885A" }} /> },
      {
        name: "Science Project",
        icon: <DescriptionOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Community Service",
        icon: <EmojiPeopleOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Teaching",
        icon: <MenuBookOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Graphics & Animation",
        icon: <LocalFloristOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Yoga & Meditation",
        icon: <LocalFloristOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Volunteering Services",
        icon: <EmojiPeopleOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Computer Project",
        icon: <ComputerOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Economics Project",
        icon: <BarChartOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Hiking",
        icon: <DirectionsWalkOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
      {
        name: "Journalism",
        icon: <InsertCommentOutlinedIcon sx={{ color: "#AC885A" }} />,
      },
    ];

  //   const handleHobbySelect = (hobbyName) => {
  //   if (selectedHobbies.includes(hobbyName)) {
  //     setSelectedHobbies(selectedHobbies.filter((hobby) => hobby !== hobbyName));
  //   } else {
  //     if (selectedHobbies.length < 3) {
  //       setSelectedHobbies([...selectedHobbies, hobbyName]);
  //     }
  //   }
  // };

console.log("selectedHobbies",selectedHobbies);



const handleHobbySelect = (hobbyName) => {
  if (selectedHobbies.includes(hobbyName)) {
    setSelectedHobbies(selectedHobbies.filter((hobby) => hobby !== hobbyName));
  } else {
    if (selectedHobbies.length < 3) {
      setSelectedHobbies([...selectedHobbies, hobbyName]);
    } else {
     
      toast.error("You can select only three hobbies.");
    }
  }
};
const dispatch = useDispatch();


const getTokenFromLocalStorage = () => {
  const student_id = localStorage.getItem("student_id");
  return student_id || "";
};

const hobbyObj = {
  student_id:getTokenFromLocalStorage(),
  hobbys:selectedHobbies
}


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (selectedHobbies?.length === 0) {
      toast.error("Please select at least one hobby",{toastId:customId});
      return;
    }
      try {
        setLoading(true);
        const actionResult = await dispatch(addHobiesData(hobbyObj));
        console.log("actionResult",actionResult);
        if(actionResult?.payload?.message){
          setLoading(false);
          toast.success("Sign up successful.",{toastId:customId});
          navigate("/");
        }
      } catch (error) {
        console.log("error while adding hobbies",error);
      }finally{
        setLoading(false);
      }
     
  
  
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
                    onClick={()=>navigate("/student-select-qualification")}
                  >
                    <KeyboardBackspaceIcon sx={{ color: "#FFF" }} />
                  </IconButton>

                  <h1
                    className="text-center text-xl font-bold text-blue-900 "
                    style={{ color: "#264796" }}
                  >
                    What are your interests?
                  </h1>

                  <img src={Logo} alt="logo" className="h-20 " />
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="buttom-loginform-area ">
                    <>
                      <div className="flex justify-center items-center mb-6 mt-3">
                        <h1 className="text-center text-lg font-bold text-slate-600 ml-[-2rem]">
                          Please select any three hobbies
                        </h1>
                      </div>
                    </>
                    <>
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        {hobbies.map((hobby, index) => (
                          <div
                            className="hobbies-button-area-layaout"
                            key={index}
                          >
                        <Button
  fullWidth
  variant={selectedHobbies.includes(hobby.name) ? "contained" : "outlined"}
  startIcon={React.cloneElement(hobby.icon, {
    sx: {
      color: selectedHobbies.includes(hobby.name) ? "#FFF" : "#AC885A",
    },
  })}
  sx={{
    padding: "5px 10px",
    height: "100%",
    textTransform: "capitalize",
    borderColor: "#AC885A",
    color: selectedHobbies.includes(hobby.name) ? "#FFF" : "#AC885A",
    backgroundColor: selectedHobbies.includes(hobby.name) ? "#AC885A" : "transparent",
    fontSize: "0.85rem",
    lineHeight: 1.3,
    "&:hover": {
      borderColor: "#AC885A",
      backgroundColor: "#AC885A",
      color: "#FFF",
    },
    "&:active": {
      borderColor: "#AC885A",
      backgroundColor: "#AC885A",
      color: "#FFF",
    },
  }}
  onClick={() => handleHobbySelect(hobby.name)}
>
  {hobby.name}
</Button>


                          </div>
                        ))}
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
                            Procesing...{" "}
                            <CircularProgress
                              style={{ color: "white", height: 15, width: 15 }}
                            />
                          </div>
                        ) : (
                          "Next"
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

export default HobbiesForm;
