import React, { useEffect, useState } from "react";
import { Refresh } from "@mui/icons-material";
import {
  Box,
  Typography,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@emotion/react";
import { useGetAllMoviesMutation } from "../../redux/endPoints/movie/movie";
import { useSelector } from "react-redux";
import Hero from "../../components/Hero";
import EntertainmentBox from "../../components/EntertainmentBox";
import Header from "../../components/Header";
import MovieModal from "../../components/MovieModal";
const Home = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const isNonMediumScreen = useMediaQuery("(min-width: 900px)");
  const isMobile = useMediaQuery("(min-width: 900px)");
  const [getAllMovies, { data: allMovie, isLoading: allLoading }] =
    useGetAllMoviesMutation();

  useEffect(() => {
    console.log(page);
    getAllMovies({
      pageNumber: page,
    });
  }, [page]);

  const state = useSelector((state) => state?.movie || {});

  return state?.heroMovies && state?.allMovies && state?.popularMovies ? (
    <Box m={"1.5rem 1rem"}>
      <Box
        mt={"20px"}
        display={"grid"}
        gridTemplateColumns={"repeat(12, 1fr)"}
        gap={"23px"}
        sx={{
          "& > div": {
            gridColumn: isMobile ? undefined : "span 12",
          },
        }}
      >
        <Hero />
        {isMobile && (
          <Box
            gridColumn={"span 4"}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
            flexDirection={"column"}
            gridRow={"span 3"}
          >
            <Typography textAlign={"center"} variant="h2" fontWeight={"bold"}>
              HUTUM 101 - A chatbot for KUETians
            </Typography>
            <Typography textAlign={"center"} variant="h4">
              Ad-free Entertainment for all
            </Typography>
          </Box>
        )}
        <Box gridColumn={isMobile ? "span 12" : "span 6"} gridRow={"span 3"}>
          <Header title={"Most Viewed in HUTUM"} />
          <Box
            mt={"20px"}
            display={"grid"}
            gridTemplateColumns={"repeat(4, 1fr)"}
            justifyContent={"space-between"}
            rowGap={"20px"}
            columnGap={"1.33%"}
            sx={{
              "& > div": {
                gridColumn: isMobile ? undefined : "span 4",
              },
            }}
          >
            {state?.popularMovies &&
              state?.popularMovies?.map((movie) => (
                <EntertainmentBox key={movie?._id} data={movie} />
              ))}
          </Box>
        </Box>
        <Box gridColumn={"span 12"} gridRow={"auto"}>
          <Header title={"All Movies in HUTUM"} />
          <Box
            mt={"20px"}
            display={"grid"}
            gridTemplateColumns={"repeat(4, minmax(0,1fr))"}
            justifyContent={"space-between"}
            rowGap={"20px"}
            columnGap={"1.33%"}
            sx={{
              "& > div": {
                gridColumn: isNonMediumScreen ? undefined : "span 4",
              },
            }}
          >
            {state?.allMovies?.length > 0 &&
              state?.allMovies?.map((movie) => (
                <EntertainmentBox key={movie?._id} data={movie} />
              ))}
          </Box>
        </Box>
      </Box>
      <Box width={'100%'} py={'1rem'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <LoadingButton
          onClick={() => setPage((prev) => prev+1)}
          size="large"
          startIcon={<Refresh />}
          loading={allLoading}
          variant="contained"
        >
          More
        </LoadingButton>
      </Box>
      <MovieModal />
    </Box>
  ) : (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <CircularProgress
        sx={{
          color: theme.palette.primary[200],
        }}
      />
    </Box>
  );
};

export default Home;
