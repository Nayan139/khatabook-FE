import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Box, Divider, Popover, Typography } from "@mui/material";
import Logo from "../../assets/logo.jpg";
import { FiSettings } from "react-icons/fi";
import { GoThreeBars } from "react-icons/go";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "./Header.css";

const Header = ({ open, onOpen, onClose }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { profileState, loading } = useSelector((state) => state.profile);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    !loading && (
      <Box className="header-main">
        <Box className="header-logo">
          <img src={Logo} alt="logo" className="logo" />
          {open ? (
            <ChevronLeftIcon onClick={onClose} />
          ) : (
            <GoThreeBars onClick={onOpen} />
          )}
        </Box>
        <Box className="header-right">
          <Typography variant="h6">Hey, {profileState.fullName} </Typography>
          <Box className="header-setting">
            <Box className="header-setting-icon">
              <FiSettings aria-describedby={id} onClick={handleClick} />
              <Popover
                id={id}
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography
                  className="pop-item"
                  sx={{ p: 2 }}
                  onClick={() => navigate(`/profile/:${profileState?._id}`)}
                >
                  Profile
                </Typography>
                <Divider />
                <Typography className="pop-item" sx={{ p: 2 }}>
                  Logout
                </Typography>
              </Popover>
            </Box>
          </Box>
        </Box>
      </Box>
    )
  );
};

export default Header;
