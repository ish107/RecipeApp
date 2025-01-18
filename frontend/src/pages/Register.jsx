import React from "react";
import { Box ,Divider } from "@mui/material";

import LogIn from "../components/auth/login/logIn";
import SignUp from "../components/auth/signUp/signUp";

export const Register = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{  padding: 2 }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={4}
        width="80%"
        maxWidth="900px"
      >
        <LogIn />
        <Divider orientation="vertical" flexItem style={{ backgroundColor: "#3B2A2A", width: "2px" }} />
        <SignUp />
      </Box>
    </Box>
  );
};



