import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "white", // or any color that fits your theme
        zIndex: 9999,
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="h5" sx={{ mt: 3 }}>
        Loading Joyland School...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
