import React, { useEffect, useState } from "react";
import {
  DarkModeOutlined,
  LightModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
  Height,
} from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween";
import {
  AppBar,
  IconButton,
  Typography,
  InputBase,
  Toolbar,
  useTheme,
  Box,
  Button,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
  Autocomplete,
  TextField,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import hutumProfile from "../assets/hutum.png";
import hutumProfile1 from "../assets/hutum1.png";
import { setModal, setMode } from "../redux/slice/globalSlice";
import { useGetSearchMutation } from "../redux/endPoints/movie/movie";

const NavBar = ({ isSideBarOpen, setIsSideBarOpen }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 500px)");
  const [getSearch, { data, isLoading, error }] = useGetSearchMutation();
  useEffect(() => {
    if (search) {
      getSearch(search.trim());
      // console.log(search);
    }
  }, [search]);
  const debounce = (fn, time) => {
    let setTimer;
    return (...args) => {
      if (setTimer) {
        clearTimeout(setTimer);
      }
      setTimer = setTimeout(() => {
        fn(...args);
      }, time);
    };
  };
  const doSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleChange = debounce(doSearch, 500);
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side */}
        <FlexBetween>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: isMobile ? "1.5rem" : "35px",
            }}
          >
            HUTUM
          </Typography>
        </FlexBetween>

        {/* Middle Side */}
        <Box sx={{ maxWidth: "500px", flexGrow: 1, mx: 2 }}>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            p="0.1rem 1.5rem"
            width={"100%"}
          >
            <InputBase onChange={handleChange} fullWidth placeholder="Search" />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
          {search && data?.length > 0 ? (
            <Box
              backgroundColor={theme.palette.background.alt}
              borderRadius={"0.55rem"}
            >
              {data?.map((mov) => {
                return (
                  <Button onClick={() => {
                    dispatch(setModal(mov));
                  }} key={mov?._id} fullWidth sx={{ py: 2 }}>
                    <Typography color={theme.palette.secondary[100]}>
                      {mov?.title}
                    </Typography>
                    <Divider />
                  </Button>
                );
              })}
            </Box>
          ) : (
            search && (
              <Box
                backgroundColor={theme.palette.background.alt}
                borderRadius={"0.55rem"}
              >
                <Button fullWidth sx={{ py: 2 }}>
                  <Typography color={theme.palette.secondary[100]}>
                    No Movie Found
                  </Typography>
                  <Divider />
                </Button>
              </Box>
            )
          )}
        </Box>

        {/* Right Side */}
        <FlexBetween gap={"0.55rem"}>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 1 }}
            onClick={() => setIsSideBarOpen((prevState) => !prevState)}
          >
            <MenuIcon />
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
