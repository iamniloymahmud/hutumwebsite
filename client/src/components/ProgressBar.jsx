import React from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";


const ProgrssBar = () => {
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
          color: 'white',
        }}
      />
    </Box>
  );
};

export default ProgrssBar;
