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
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import hutumProfile from "../assets/hutum.png";
import hutumProfile1 from "../assets/hutum1.png";
import { setModal, setMode } from "../redux/slice/globalSlice";
import { useGetSearchMutation } from "../redux/endPoints/movie/movie";
import { useLocation, useNavigate } from "react-router-dom";

const NavBar = ({ isSideBarOpen, setIsSideBarOpen }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 500px)");
  const [getSearch, { data, isLoading, error }] = useGetSearchMutation();
  const navigate = useNavigate();
  const isNotMobile = useMediaQuery(theme.breakpoints.up("md"));
  let borderCol;
  if(theme.palette.mode == 'light'){
    borderCol = 'rgba(0,0,0,0.2)';
  }else{
    borderCol = 'rgba(255,255,255,0.2)';
  }
  useEffect(() => {
    if (search) {
      getSearch(search.trim());
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
        background: theme.palette.background.default,
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side */}
        <FlexBetween>
          <Typography
            variant={!isMobile ? "h2" : "h3"}
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
            }}
            component={"div"}
            onClick={() => navigate("/")}
          >
            HUTUM
          </Typography>
        </FlexBetween>

        {/* Middle Side */}
        {(pathname === "/series" || pathname === "/movies") && (
          <Box sx={{ maxWidth: "500px", flexGrow: 1, mx: 2, border: 1, borderColor: `${borderCol}`, borderRadius: '0.55rem' }}>
            <FlexBetween
              backgroundColor={theme.palette.background.alt}
              borderRadius="9px"
              p="0.1rem 1.5rem"
              width={"100%"}
            >
              <InputBase
                onChange={handleChange}
                fullWidth
                placeholder="Search"
              />
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
                    <Button
                      onClick={() => {
                        dispatch(setModal(mov));
                      }}
                      key={mov?._id}
                      fullWidth
                      sx={{ py: 2 }}
                    >
                      <Typography color={theme.palette.secondary[100]}>
                        {mov?.title}
                      </Typography>
                      <Divider />
                    </Button>
                  );
                })}
              </Box>
            ) : isLoading ? (
              <Box
                backgroundColor={theme.palette.background.alt}
                borderRadius={"0.55rem"}
              >
                <Button fullWidth>
                  <CircularProgress
                    size={25}
                    sx={{
                      color: theme.palette.primary[200],
                    }}
                  />
                </Button>
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
        )}

        {/* Right Side */}
        <FlexBetween gap={"0.55rem"}>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined fontSize={!isMobile ? "medium" : "small"} />
            ) : (
              <LightModeOutlined fontSize={!isMobile ? "medium" : "small"} />
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
