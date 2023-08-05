import { Box, useMediaQuery, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { useHeroImagesMutation } from "../../redux/endPoints/image/image";
import CircularProgrssBar from "../CircularProgrssBar";

const Photo = ({ h }) => {
  const theme = useTheme();
  const [heroImages, { data, isLoading, isError }] = useHeroImagesMutation();
  useEffect(() => {
    heroImages({
      year: 2023,
      page: 1,
    });
  }, []);
  return data ? (
    <Carousel
      interval={3500}
      duration={1000}
      animation="slide"
      indicators={false}
      height={`${h * 0.5}px`}
      sx={{
        backgroundColor: "transparent",
        borderRadius: "0.55rem",
      }}
    >
      {data?.map((image) => {
        return (
          <Box height={"100%"} position={"relative"}>
            <Box
              component={"img"}
              src={`${image.link}?w=550`}
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
                {image?.place_tag},<br /> KUET.
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

export default Photo;
