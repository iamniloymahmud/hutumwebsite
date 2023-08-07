import React, { useState, useEffect } from "react";
import {
  Box,
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
  LocalMoviesOutlined,
  LiveTvOutlined,
  Park,
  ArrowCircleUp,
  HouseSiding,
  UploadFile
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";

const navItems = [
  {
    text: "Home",
    icon: <HouseSiding />
  },
  {
    text: "Movies",
    icon: <LocalMoviesOutlined />,
  },
  // {
  //   text: "Series",
  //   icon: <LiveTvOutlined />,
  // },
  {
    text: "Beautiful_KUET",
    icon: <Park />,
  },
  {
    text: "Upload_Photo",
    icon: <UploadFile />,
  },
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

  const toggleDrawer = (state) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsSideBarOpen(state);
  };

  return (
    <div>
      <React.Fragment key={"tab"}>
        <Drawer
          anchor={"top"}
          open={isSideBarOpen}
          onClose={toggleDrawer(false)}
          transitionDuration={500}
        >
          <Box
            sx={{
              width: "auto",
              minHeight: '300px',
              backgroundColor: theme.palette.background.default,
              paddingTop: '1rem',
              position: 'relative',
            }}
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
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
                  <ListItem key={text} disablePadding sx={{
                    py:'0.25rem',
                  }}>
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
                      <ListItemText primary={text.split("_").join(" ")} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <IconButton sx={{
              position: 'absolute',
              bottom: 2,
              left: '50%',
              transform: 'translate(-50%,0)',
            }}>
                <ArrowCircleUp fontSize={'large'} />
            </IconButton>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default Sidebar;
