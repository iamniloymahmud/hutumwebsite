import React from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";


const CircularProgrssBar = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <CircularProgress
        sx={{
          color: theme.palette.primary[200],
        }}
      />
    </Box>
  );
};

export default CircularProgrssBar;
