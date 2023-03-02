import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory,Link } from "react-router-dom";

const Header = ({ children, hasHiddenAuthButtons }) => {
  let history=useHistory()
  let token =localStorage.getItem("token");
  let balance=localStorage.getItem("balance");
  let username =localStorage.getItem("username");

  let handleLogout=()=>{
    //Redirect to same -/products
    history.push("/");
    //Refresh the page
    history.go();
    //Remove all items
    localStorage.clear();
  };
  return (
    <Box className="header">
      <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {hasHiddenAuthButtons ? (
      <Button
        className="explore-button"
        startIcon={<ArrowBackIcon />}
        variant="text"
        onClick={() => history.push("/")}
      >
        Back to explore
      </Button>
    ) : !username ? (
      <>
        <Box width="30vw">{children && children}</Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button
            onClick={() => {
              history.push("/login");
            }}
          >
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              history.push("/register");
            }}
          >
            Register
          </Button>
        </Stack>
      </>
    ) : (
      <>
        <Box width="30vw">{children && children}</Box>
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar alt={username} src="../../public/avatar.png" />
          <p>{username}</p>
          <Button  onClick={handleLogout}>Logout</Button>
        </Stack>
      </>
    )}
    </Box>
  );
};


export default Header;
 