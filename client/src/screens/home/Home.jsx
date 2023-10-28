import React, { useEffect, useState } from "react";
import { Refresh, Edit } from "@mui/icons-material";
import {
  Box,
  Typography,
  useMediaQuery,
  CircularProgress,
  Fab,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTheme } from "@emotion/react";
import { useGetAllMoviesMutation } from "../../redux/endPoints/movie/movie";
import { useSelector } from "react-redux";
import Hero from "../../components/Hero";
import EntertainmentBox from "../../components/EntertainmentBox";
import Header from "../../components/Header";
import MovieModal from "../../components/MovieModal";
import { Helmet } from "react-helmet-async";
import MovieHero from "../../components/MovieHero";
const Home = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const isNonMediumScreen = useMediaQuery("(min-width: 900px)");
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [getAllMovies, { data: allMovie, isLoading: allLoading }] =
    useGetAllMoviesMutation();
  useEffect(() => {
    getAllMovies({
      pageNumber: page,
    });
  }, [page]);

  const state = useSelector((state) => state?.movie || {});

  return state?.heroMovies && state?.allMovies && state?.popularMovies ? (
    <Box m={"1.5rem 1rem"} pt={"2rem"}>
      <Helmet>
        <title>Movies | HUTUM</title>
        <meta
          name="description"
          content="HUTUM provides free movies without any ADs. This is only for sharing movie files internally. We don't make any money from this."
        />
        <link rel="canonical" href="/#/movies" />
      </Helmet>
      <Grid container>
        <Hero />
        {!isMobile && <MovieHero />}
      </Grid>
      <Header title={"Most Viewed in HUTUM"} />
      <Grid
        mb={"10px"}
        container
        spacing={"10px"}
        columns={{ sm: 12, md: 9, lg: 12 }}
      >
        {state?.popularMovies &&
          state?.popularMovies?.map((movie) => (
            <Grid item sm={6} md={3} lg={3}>
              <EntertainmentBox key={movie?._id} data={movie} />
            </Grid>
          ))}
      </Grid>
      <Header title={"All Movies in HUTUM"} />
      <Grid
        mb={"10px"}
        container
        spacing={"10px"}
        columns={{ sm: 12, md: 9, lg: 12 }}
      >
        {state?.allMovies?.length > 0 &&
          state?.allMovies?.map((movie) => (
            <Grid item sm={6} md={3} lg={3}>
              <EntertainmentBox key={movie?._id} data={movie} />
            </Grid>
          ))}
      </Grid>
      <Box
        width={"100%"}
        py={"1rem"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <LoadingButton
          onClick={() => setPage((prev) => prev + 1)}
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
