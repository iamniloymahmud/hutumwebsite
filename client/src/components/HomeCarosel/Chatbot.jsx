import { Box, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";

const Chatbot = ({h}) => {
  const theme = useTheme();
  const screenSize = theme.breakpoints.customCol[theme.breakpoints.screenBreakPoint(useMediaQuery,theme)];
  return (
    <Carousel
      interval={2500}
      duration={1000}
      animation="slide"
      indicators={false}
      height={`${h*0.5}px`}
      sx={{
        backgroundColor: "transparent",
        borderRadius: "0.55rem",
      }}
    >
      {data?.map((image) => {
        return (
          <Box height={"100%"}>
            <Box
              component={"img"}
              alt="HUTUM KUET Chatbot"
              loading="lazy"
              src={image.url}
              width={"100%"}
              height={"100%"}
              sx={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Box>
        );
      })}
    </Carousel>
  );
};

const data = [
  {
    url: "https://bmeboss.files.wordpress.com/2023/08/untitled-5222-01.png?w=500",
  },
  {
    url: "https://bmeboss.files.wordpress.com/2023/08/final-cutie.png?w=550",
  },
];

export default Chatbot;
