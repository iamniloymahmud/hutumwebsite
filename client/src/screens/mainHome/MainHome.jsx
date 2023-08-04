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
import {useNavigate} from 'react-router-dom';
const imageUrl =
  "https://bmeboss.files.wordpress.com/2023/08/hutum-removebg-preview-1-1.png";
const MainHome = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const screenSize =
    theme.breakpoints.customCol[
      theme.breakpoints.screenBreakPoint(useMediaQuery, theme)
    ];
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box m={"1.5rem 1rem"} pt={"2.8rem"}>
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
          src={imageUrl}
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
                fontSize: Math.max(50, 17 * screenSize),
                textAlign: "center",
              }}
            >
              HUTUM 101
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: Math.max(45, 17 * screenSize),
                color: "#FF1A1A",
                textAlign: "center",
              }}
            >
              <Typewriter
                words={["A Chatbot", "An Entermaint Server", "A Photo archive"]}
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
            justifyContent: "space-around",
            alignItems: "center",
            width: "90%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Link href="https://www.facebook.com/iamhutum" target="_blank" rel="noreferrer">
            <IconButton sx={{ py: 4, px: 2 }}>
              <Chat
                style={{
                  fontSize: "6rem",
                  color: "#FF1A1A",
                }}
              />
            </IconButton>
            </Link>
            <Typography variant="h1" fontWeight={"bold"} color={"#FF1A1A"}>
              Chatbot
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <IconButton onClick={() => navigate('/movies')} sx={{py: 4}}>
              <OndemandVideo
                style={{
                  fontSize: "6rem",
                  color: "#FF1A1A",
                }}
              />
            </IconButton>
            <Typography variant="h1" fontWeight={"bold"} color={"#FF1A1A"}>
              Movie Server
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <IconButton onClick={() => navigate('/beautiful_kuet')} sx={{ py: 4 }}>
              <LocalSee
                style={{
                  fontSize: "6rem",
                  color: "#FF1A1A",
                }}
              />
            </IconButton>
            <Typography variant="h1" fontWeight={"bold"} color={"#FF1A1A"}>
              Photo Archive
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainHome;
