import React, { useState } from "react";
import {
  useTheme,
  Card,
  CardContent,
  Typography,
  Rating,
  CardActions,
  Button,
  Collapse,
  useMediaQuery,
  Box,
  Pagination
} from "@mui/material";
import Flexbetween from "../components/FlexBetween";
import ISO6391 from "iso-639-1";
import { TimerOutlined,CloseOutlined, DownloadForOfflineRounded } from "@mui/icons-material";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setModal } from "../redux/slice/globalSlice";
import moviePic from '../assets/movie.png'

const MovieModalBox = ({data}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
        position: 'relative',
      }}
    >
      <CardContent>
        <Box
          component={"img"}
          alt="hutum-kuet"
          src={data?.backdrop_path ? `https://image.tmdb.org/t/p/original/${data?.backdrop_path}` : moviePic}
          width={"100%"}
          height={"100%"}
          borderRadius={"0.55rem"}
          sx={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <Typography variant="h4" fontWeight={"bold"} component={"div"}>
          {data?.title}
        </Typography>
        {data?.tagline && (
          <Typography variant="body2">{data?.tagline}</Typography>
        )}
        <Typography
          alignItems={"center"}
          gap={"5px"}
          display={"flex"}
          mt={"6px"}
          variant={isMobile ? "h6" : "h4"}
        >
          <TimerOutlined fontSize="25px" />
          {data?.runtime} Min
        </Typography>
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
      </CardContent>
      <CardActions>
        <Flexbetween width={"100%"}>
          <Button target="_blank" href={`https://telegram.dog/hutumkuetbot?start=${data?.imdb_id}_movie`} variant="contained" endIcon={<DownloadForOfflineRounded />}>
            Download
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Details
          </Button>
          <Button
            onClick={() => dispatch(setModal())}
            variant="contained"
            endIcon={<CloseOutlined />}
          >
            Close
          </Button>
        </Flexbetween>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout={"auto"}
        unmountOnExit
        sx={{
          color: theme.palette.neutral[500],
        }}
      >
        <CardContent>
          <Typography variant="h6">
            Relase Date: {moment(data?.release_date).format("DD MMMM, YYYY")}
          </Typography>
          <Typography variant="h6">
            Language:{" "}
            {data?.original_language
              ? ISO6391.getName(data?.original_language)
              : "Unknown"}
          </Typography>
          <Typography variant="h6">
            Genre:{" "}
            {data?.genres
              ? data?.genres?.map((gen) => gen.name).join(", ")
              : "Not Specified"}
          </Typography>
          <br />
          <Typography variant="h6" textAlign={'justify'}>
            Overview: <br />{data?.overview ? data?.overview : ""}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default MovieModalBox;
