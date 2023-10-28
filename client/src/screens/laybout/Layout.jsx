import React, { useState } from "react";
import { Box, useMediaQuery, Fab, Link } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Sidebar from "../../components/SideBar";
import { useTheme } from "@emotion/react";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      display={isNonMobile ? "flex" : "block"}
      width={"100%"}
      height={"100%"}
    >
      {<Sidebar
        isNonMobile={isNonMobile}
        drawerWidth={"300px"}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />}
      <Box flexGrow={1}>
        <NavBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
