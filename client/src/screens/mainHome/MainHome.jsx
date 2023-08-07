import React from "react";
import {
  Box,
  IconButton,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Chat, LiveTv, LocalSee, OndemandVideo } from "@mui/icons-material";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom";
import Chatbot from "../../components/HomeCarosel/Chatbot";
import Movie from "../../components/HomeCarosel/Movie";
import Photo from "../../components/HomeCarosel/Photo";
import { Helmet } from "react-helmet-async";
const imageUrl =
  "https://bmeboss.files.wordpress.com/2023/08/hutum-removebg-preview-1-1.png";

const ss = 0.25;

const MainHome = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const screenSize =
    theme.breakpoints.customCol[
      theme.breakpoints.screenBreakPoint(useMediaQuery, theme)
    ];
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(theme.palette);
  return (
    <Box m={"1.5rem 1rem"} py={"2.8rem"}>
      <Helmet>
        <title>Home | HUTUM</title>
        <meta
          name="description"
          content="HUTUM is an organization that cater the needs of notes, books and movies of the students of KUET. It also has a vast number of photo collection of KUET Campus. "
        />
        <link rel="canonical" href="/#/home" />
      </Helmet>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component={"img"}
          alt="HUTUM KUET Logo"
          src={imageUrl}
          loading="lazy"
          width={252 * 0.7}
          height={460 * 0.7}
          sx={{
            borderBottom: 20,
            borderColor: "black",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: Math.max(50, 15 * screenSize),
                textAlign: "center",
              }}
            >
              HUTUM 101
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: Math.max(40, 15 * screenSize),
                color: "#FF1A1A",
                textAlign: "center",
              }}
            >
              <Typewriter
                words={[
                  "A Chatbot",
                  "A Note Source",
                  "A Movie Server",
                  "A Photo Archive",
                ]}
                loop={false}
                cursor
                cursorStyle="_"
                typeSpeed={150}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 4,
            pt: 5,
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {/* Bottom Hero */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: !isMobile
                ? window.innerWidth * ss
                : window.innerWidth * 0.7,
              overflow: "hidden",
            }}
          >
            <Link
              href="https://www.facebook.com/iamhutum"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Chatbot
                h={!isMobile ? window.innerWidth * ss : window.innerWidth * 0.7}
              />
              <Typography
                variant="h1"
                fontWeight={"bold"}
                color={theme.palette.text.primary}
                textAlign={"center"}
              >
                Chatbot
              </Typography>
            </Link>
          </Box>
          <Box
            component={"div"}
            onClick={() => navigate("/movies")}
            sx={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              width: !isMobile
                ? window.innerWidth * ss
                : window.innerWidth * 0.7,
            }}
          >
            <Movie
              h={!isMobile ? window.innerWidth * ss : window.innerWidth * 0.7}
            />
            <Typography
              variant="h1"
              fontWeight={"bold"}
              // color={"#FF1A1A"}
              textAlign={"center"}
            >
              Movie Server
            </Typography>
          </Box>
          <Box
            component={"div"}
            onClick={() => navigate("/beautiful_kuet")}
            sx={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              width: !isMobile
                ? window.innerWidth * ss
                : window.innerWidth * 0.7,
            }}
          >
            <Photo
              h={!isMobile ? window.innerWidth * ss : window.innerWidth * 0.7}
            />
            <Typography
              variant="h1"
              fontWeight={"bold"}
              // color={"#FF1A1A"}
              textAlign={"center"}
            >
              Photo Archive
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainHome;
