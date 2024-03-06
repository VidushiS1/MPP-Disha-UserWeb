import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import iconTowe from "../../assets/management.png";
import iconTow from "../../assets/Chat.png";
import iconOneLight from "../../assets/Further-Education.png";
import iconOneDark from "../../assets/learning.png";
import iconThree from "../../assets/degree.png";
import iconThreeLight from "../../assets/degree.png";
import iconThreeDark from "../../assets/degreeIcon.png";
import CareerAdviceLight from "../../assets/counselling.png";
import CareerAdviceDark from "../../assets/counsellingColor.png";
import iconFourLight from "../../assets/Employment-icon.png";
import iconFourDark from "../../assets/headhunting .png";
import iconFive from "../../assets/subscribe.png";
import iconSix from "../../assets/talent-search.png";
import BroadcastLight from "../../assets/video-call.png";
import BroadcastDark from "../../assets/video-call-color.png";
import iconeath from "../../assets/volunteer.png";
import translateIcon from "../../assets/translate.png";
import downArrowIcon from "../../assets/down-arrow.png";
import contentManagementIcon from "../../assets/content-management.png";
import instituteManagerIcon from "../../assets/institute-manager.png";
import disciplineManagerIcon from "../../assets/discipline-manager.png";
import controlerImg from "../../assets/arrow-right.png";
import MppDishLogoImg from "../../assets/mppdishalogo22.png";
import exitIcon from "../../assets/exit-color.png";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import iconviedoLight from "../../assets/video-production.png";
import iconviedoDark from "../../assets/video-production-dark.png";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";

const SideNavber = () => {
  const Navigate = useNavigate();
  const customId = "custom-id-yes";
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubmenuOpen] = useState(true);
  const [activeLink, setActiveLink] = useState("");
  const [hoverActive, setHoverActive] = useState(null);
  // Get the current location using useLocation hook from react-router-dom
  const location = useLocation();
  // Update activeLink state based on the current location pathname
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

 

  const handleNavLinkMenuClick = (path) => {
    setActiveLink(path);
  };

  const handleNavLinkClick = (path, text) => {
    // Set active link regardless of the path
    setActiveLink(path);

    // Check if the clicked NavLink is the "Student Profile"
    if (text === "Content Manager") {
      // Toggle the submenu if clicking on the "Student Profile" NavLink
      setSubmenuOpen(!subMenuOpen);
    } else {
      // Close the submenu if clicking on any other NavLink
      setSubmenuOpen(true);
    }
  };

  const handleSubMenuOpen = (text) => {
    if (text === "Content Manager") {
      // Toggle the submenu if clicking on the "Student Profile" NavLink
      setSubmenuOpen(!subMenuOpen);
    } else {
      // Close the submenu if clicking on any other NavLink
      setSubmenuOpen(true);
    }
  };

  const [isVerificationDialogOpen1, setisVerificationDialogOpen1] =
    useState(false);
  const handleOpenVerificationDialog1 = () => {
    setisVerificationDialogOpen1(true);
  };
  const handleCloseVerificationDialog1 = () => {
    setisVerificationDialogOpen1(false);
  };

  const handleDeletePopup = () => {
    handleOpenVerificationDialog1();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    handleCloseVerificationDialog1();
    //  window.location.reload();
    Navigate("/login");
    toast.success("Logout Successfully", {
      toastId: customId,
    });
    console.log("logout");
  };

  return (
    <>
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-blue-lightest h-screen px-5 pb-5 pt-4  relative duration-300 app-container overflow-hidden shadow-md`}
        // style={{boxShadow:""}}
      >
        <img
          src={controlerImg}
          className={`absolute cursor-pointer -right-2 top-12 w-7 border-blue-lightest
           border-2 rounded-full  ${open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div
          className="flex gap-x-3 items-center"
          onClick={() => Navigate("/")}
        >
          <img
            src={MppDishLogoImg}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-yellow-dark origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            MPP DISHA
          </h1>
        </div>
        <div className="pt-9">
          {/* <NavLink
            to="/"
            onClick={() => handleNavLinkClick("/")}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-yellow-dark hover:text-gray-300 text-sm items-center gap-x-4 mt-5 mt-2 ${
              activeLink === "/"
                ? "bg-yellow-dark text-gray-300"
                : "bg-light-white  text-yellow-dark"
            }`}
          >
            <img src={iconOneLight} /> <img src={iconOneDark} />{" "}
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              Further Education
            </span>
          </NavLink> */}
          {/* <NavLink
            to="/"
            onClick={() => handleNavLinkClick("/")}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-yellow-dark hover:text-gray-300 text-sm items-center gap-x-4 mt-5 mt-2 ${
              activeLink === "/"
                ? "bg-yellow-dark text-gray-300"
                : "bg-light-white text-yellow-dark"
            }`}
          >
            {activeLink === "/" || hoverActive ? (
              <>
                <img src={iconOneLight} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Further Education
                </span>
              </>
            ) : (
              <>
                <img src={iconOneDark} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Further Education
                </span>
              </>
            )}
          </NavLink> */}
          <NavLink
            to="/"
            onClick={() => handleNavLinkClick("/")}
            onMouseEnter={() => setHoverActive("/")}
            onMouseLeave={() => setHoverActive(false)}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-yellow-dark hover:text-slate-100 text-sm items-center gap-x-4 mt-5 mt-2 ${
              activeLink === "/"
                ? "bg-yellow-dark text-slate-100"
                : "bg-light-bag text-yellow-dark"
            }`}
          >
            {hoverActive === "/" || activeLink === "/" ? (
              <>
                <img src={iconOneLight} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Further Education
                </span>
              </>
            ) : (
              <>
                <img src={iconOneDark} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Further Education
                </span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/job-manager"
            onClick={() => handleNavLinkClick("/job-manager")}
            onMouseEnter={() => setHoverActive("/job-manager")}
            onMouseLeave={() => setHoverActive(false)}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-yellow-dark hover:text-slate-100 text-sm items-center gap-x-4  mt-2 ${
              activeLink === "/job-manager"
                ? "bg-yellow-dark text-slate-100"
                : "bg-light-bag text-yellow-dark"
            }`}
          >
            {hoverActive === "/job-manager" || activeLink === "/job-manager" ? (
              <>
                <img src={iconFourLight} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Employment
                </span>
              </>
            ) : (
              <>
                <img src={iconFourDark} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Employment
                </span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/all-scholarship-cards"
            onClick={() => handleNavLinkClick("/all-scholarship-cards")}
            onMouseEnter={() => setHoverActive("/all-scholarship-cards")}
            onMouseLeave={() => setHoverActive(false)}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-yellow-dark hover:text-slate-100 text-sm items-center gap-x-4 mt-2 ${
              activeLink === "/all-scholarship-cards"
                ? "bg-yellow-dark text-slate-100"
                : "bg-light-bag text-yellow-dark"
            }`}
          >
            {hoverActive === "/all-scholarship-cards" ||
            activeLink === "/all-scholarship-cards" ? (
              <>
                <img src={iconThreeLight} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Scholarship
                </span>
              </>
            ) : (
              <>
                <img src={iconThreeDark} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Scholarship
                </span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/career-advice-request"
            onClick={() => handleNavLinkClick("/career-advice-request")}
            onMouseEnter={() => setHoverActive("/career-advice-request")}
            onMouseLeave={() => setHoverActive(false)}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-yellow-dark hover:text-slate-100 text-sm items-center gap-x-4 mt-2 ${
              activeLink === "/career-advice-request"
                ? "bg-yellow-dark text-slate-100"
                : "bg-light-bag text-yellow-dark"
            }`}
          >
            {hoverActive === "/career-advice-request" ||
            activeLink === "/career-advice-request" ? (
              <>
                <img src={CareerAdviceLight} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Career Advice
                </span>
              </>
            ) : (
              <>
                <img src={CareerAdviceDark} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Career Advice
                </span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/broadcast-scheduled-all-card"
            onClick={() => handleNavLinkClick("/broadcast-scheduled-all-card")}
            onMouseEnter={() => setHoverActive("/broadcast-scheduled-all-card")}
            onMouseLeave={() => setHoverActive(false)}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-yellow-dark hover:text-slate-100 text-sm items-center gap-x-4 mt-2 ${
              activeLink === "/broadcast-scheduled-all-card"
                ? "bg-yellow-dark text-slate-100"
                : "bg-light-bag text-yellow-dark"
            }`}
          >
            {hoverActive === "/broadcast-scheduled-all-card" ||
            activeLink === "/broadcast-scheduled-all-card" ? (
              <>
                <img src={BroadcastLight} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Broadcast
                </span>
              </>
            ) : (
              <>
                <img src={BroadcastDark} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Broadcast
                </span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/all-card-video-session"
            onClick={() => handleNavLinkClick("/all-card-video-session")}
            onMouseEnter={() => setHoverActive("/all-card-video-session")}
            onMouseLeave={() => setHoverActive(false)}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-yellow-dark hover:text-slate-100 text-sm items-center gap-x-4 mt-2 ${
              activeLink === "/all-card-video-session"
                ? "bg-yellow-dark text-slate-100"
                : "bg-light-bag text-yellow-dark"
            }`}
          >
            {hoverActive === "/all-card-video-session" ||
            activeLink === "/all-card-video-session" ? (
              <>
                <img src={iconviedoLight} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Video Session
                </span>
              </>
            ) : (
              <>
                <img src={iconviedoDark} />
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  Video Session
                </span>
              </>
            )}
          </NavLink>

          {/* <div className="flex justify-center items-center mt-9">
            <div className="flex items-center cursor-pointer">
              <span className={`${!open && "hidden"} text-gray-300 text-base`}>
                Translate
              </span>
              <img
                src={translateIcon}
                alt="Google Translate"
                className="w-5 h-5 ms-2"
              />
            </div>
          </div> */}
          <div className="flex justify-center items-center mt-44">
            <div
              className="flex items-center cursor-pointer"
              onClick={handleDeletePopup}
            >
              <span
                className={`${
                  !open && "hidden"
                } text-yellow-dark text-base mr-2`}
              >
                Exit
              </span>
              <img src={exitIcon} alt="Exit" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={isVerificationDialogOpen1}
        onClose={handleCloseVerificationDialog1}
        className="custom-dialog"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "600px",
          height: "90vh",
          marginLeft: "30%",
          marginTop: "2rem",
          borderRadius: "16px",
          overflowY: "hidden",
          padding: "5rem",
        }}
      >
        <DialogContent
          className="diacontent mt-5"
          style={{ paddingTop: "0px", overflowY: "hidden" }}
        >
          <DialogTitle
            className="my-1 ms-3"
            style={{
              textAlign: "left",
              fontWeight: "500",
              fontSize: "text-xs", // Tailwind equivalent for 0.875rem
              padding: "0px",
            }}
          >
            Are you sure you want to Logout?
          </DialogTitle>

          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="mt-10"
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
              type="submit"
              onClick={handleCloseVerificationDialog1}
            >
              No
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
              type="submit"
              onClick={handleLogout}
            >
              Yes
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SideNavber;
