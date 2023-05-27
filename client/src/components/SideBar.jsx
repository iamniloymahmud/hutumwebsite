import React, { useState, useEffect } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import {
  InfoOutlined,
  LocalMoviesOutlined,
  LiveTvOutlined,
  ChevronLeft,
  ChevronRightOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";

const navItems = [
  {
    text: "Movies",
    icon: <LocalMoviesOutlined />,
  },
  // {
  //   text: "Series",
  //   icon: <LiveTvOutlined />,
  // },
];

const Sidebar = ({
  drawerWidth,
  isSideBarOpen,
  setIsSideBarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  return (
    <Box component="nav">
      {isSideBarOpen && (
        <Drawer
          open={isSideBarOpen}
          onClose={() => setIsSideBarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display={"flex"} alignItems={"center"} gap={"0.5rem"}>
                  <Typography
                    variant="h4"
                    fontWeight={"bold"}
                    sx={{
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    User's Panel
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();
                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
          {/* <Box position={"absolute"} pt={"1rem"} bottom={"1rem"} width={"100%"}>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(`/about`);
                  setActive('about');
                }}
                sx={{
                  backgroundColor:
                    active === 'about'
                      ? theme.palette.secondary[300]
                      : "transparent",
                  color:
                    active === 'about'
                      ? theme.palette.primary[600]
                      : theme.palette.secondary[100],
                }}
              >
                <ListItemIcon
                  sx={{
                    ml: "2rem",
                    color:
                      active === 'about'
                        ? theme.palette.primary[600]
                        : theme.palette.secondary[200],
                  }}
                >
                  <InfoOutlined />
                </ListItemIcon>
                <ListItemText primary='About Us' />
                {active === 'about' && (
                  <ChevronRightOutlined sx={{ ml: "auto" }} />
                )}
              </ListItemButton>
            </ListItem>
          </Box> */}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
