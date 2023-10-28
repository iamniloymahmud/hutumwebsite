import React from "react";
import { Box, Grid, Typography } from "@mui/material";

const MovieHero = () => {
  return (
    <Grid item xs={0} md={3} lg={6}>
      <Box
        width={"100%"}
        height={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Typography textAlign={"center"} variant="h2" fontWeight={"bold"}>
          HUTUM 101 - A Complete Ecosystem for KUETians
        </Typography>
        <Typography textAlign={"center"} variant="h4">
          Ad-free Entertainment for all
        </Typography>
      </Box>
    </Grid>
  );
};

export default MovieHero;
