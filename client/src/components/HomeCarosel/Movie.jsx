import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector } from "react-redux";
import CircularProgrssBar from "../CircularProgrssBar";
import moment from 'moment';

const Movie = ({ h }) => {
  const theme = useTheme();
  const images = useSelector((state) => state.movie.heroMovies);
  return images ? (
    <Carousel
      interval={3000}
      duration={1000}
      animation="slide"
      indicators={false}
      height={`${h * 0.5}px`}
      sx={{
        backgroundColor: "transparent",
        borderRadius: "0.55rem",
      }}
    >
      {images
        ?.filter((data) => data?.backdrop_path)
        ?.map((image) => {
          return (
            <Box height={"100%"} position={"relative"}>
              <Box
                component={"img"}
                alt="HUTUM KUET movie service server"
                loading="lazy"
                src={`https://image.tmdb.org/t/p/original/${image?.backdrop_path}`}
                width={"100%"}
                height={"100%"}
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
                bottom={"20%"}
                maxWidth={"350px"}
                left={"5%"}
                sx={{ transform: "translate(0, 50%)" }}
              >
                <Typography fontWeight={"bold"} variant={"h5"} color={"white"}>
                  {image?.title}
                </Typography>
                <Typography variant={"h5"} color={"white"}>
                  {moment(image?.release_date).format("DD MMMM, YYYY")}
                </Typography>
              </Box>
            </Box>
          );
        })}
    </Carousel>
  ) : (
    <CircularProgrssBar />
  );
};

export default Movie;
