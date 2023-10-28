import React from "react";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { TimerOutlined } from "@mui/icons-material";
import { Box, Typography, useMediaQuery, Rating, Grid, useTheme } from "@mui/material";
import Header from "./Header";
import moment from "moment";
import { setModal } from "../redux/slice/globalSlice";

const Hero = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.heroMovies);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const screen = theme.breakpoints.screenBreakPoint(useMediaQuery,theme);
  const heights = {
    xs: '200px',
    xsm: '250px',
    sm: '320px',
    xmd: '400px',
    md: '400px',
    lg: '400px',
    xl: '480px',
  }
  return (
    <Grid mt={'20px'} item xs={12} md={9} lg={6}>
      <Box>
        <Carousel
          interval={3000}
          duration={1000}
          animation="slide"
          indicators={true}
          height={`${heights[screen]}`}
          sx={{
            backgroundColor: "transparent",
            borderRadius: "0.55rem",
          }}
        >
          {movies &&
            movies
              ?.filter((data) => data?.backdrop_path)
              ?.map((data) => {
                return (
                  <Box
                    component={"div"}
                    onClick={() => dispatch(setModal(data))}
                    key={data?._id}
                    width={"100%"}
                    padding={0}
                    height={"100%"}
                    position={"relative"}
                  >
                    <Box
                      component={"img"}
                      alt="hutum-kuet movie hutum kuet"
                      loading="lazy"
                      src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
                      width={"100%"}
                      height={"100%"}
                      borderRadius={"0.55rem"}
                      sx={{
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                    <Box
                      width={"100%"}
                      height={"100%"}
                      borderRadius={"0.55rem"}
                      sx={{
                        bgcolor: "black",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        opacity: 0.35,
                      }}
                    />
                    <Box
                      position={"absolute"}
                      bottom={"35%"}
                      maxWidth={"350px"}
                      left={"5%"}
                      sx={{ transform: "translate(0, 50%)" }}
                    >
                      <Typography
                        fontWeight={"bold"}
                        variant={isMobile ? "h5" : "h2"}
                        color={"white"}
                      >
                        {data?.title}
                      </Typography>
                      <Typography
                        alignItems={"center"}
                        gap={"5px"}
                        display={"flex"}
                        mt={"6px"}
                        variant={isMobile ? "h6" : "h4"}
                        color={"white"}
                      >
                        <TimerOutlined fontSize="25px" />
                        {data?.runtime} Min
                      </Typography>
                      <Box>
                        <Rating
                          size="small"
                          value={(data?.vote_average?.toFixed(1) / 10) * 5}
                          readOnly
                          precision={0.1}
                          sx={{
                            "& .MuiRating-icon": {
                              color: "white",
                            },
                            "& .MuiRating-iconFilled": {
                              color: "orange",
                            },
                          }}
                        />
                        <Typography
                          variant={isMobile ? "h6" : "h4"}
                          color={"white"}
                        >
                          {moment(data?.release_date).format("DD MMMM, YYYY")}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
        </Carousel>
      </Box>
    </Grid>
  );
};

export default Hero;
