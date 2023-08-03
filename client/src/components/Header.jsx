import React from "react";
import { Typography, Box, useMediaQuery, useTheme } from "@mui/material";


const Header = ({ title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    noSsr: true,
  });
  return (
    <Box>
      <Typography
        fontSize={!isMobile ? "1.8rem" : "20px"}
        fontWeight={"bold"}
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
