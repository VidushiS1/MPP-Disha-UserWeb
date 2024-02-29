import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Logo from "../../assets/mppdishalogo2.png";
import "../LoginFrom/LoginFrom";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfileData } from "../../../rtk/features/Profile/getProfileDataSlice";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function TopNavbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const getProfileMainData = async () => {
    try {
      await dispatch(getProfileData());
    } catch (error) {
      console.log("error", error);
    }
  };

  const getProfileData2 = useSelector(
    (state) => state.getProfileData?.users?.data
  );
  console.log("getProfileData", getProfileData2);

  return (
    <AppBar
      position="static"
      sx={{
        background: "#FFF",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Box sx={{ flexGrow: 1 }}>
            <div
              className="logo-area-top-nav my-2"
              style={{ width: "50px", cursor: "pointer" }}
            >
              <img src={Logo} alt="logo" style={{ width: "100%" }} />
            </div>
          </Box> */}

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="loading..." src={getProfileData2?.profile} />
              </IconButton>
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
              <MenuItem
                onClick={() => {
                  handleEditProfile();
                  handleCloseUserMenu();
                }}
              >
                <Typography textAlign="center" onClick={getProfileMainData}>
                  Profile
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopNavbar;
