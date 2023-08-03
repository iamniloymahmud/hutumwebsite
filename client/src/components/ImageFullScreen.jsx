import { Modal, Box, IconButton, Button, Typography } from "@mui/material";
import { Close, ArrowCircleRight, ArrowCircleLeft } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import moment from "moment";

const ImageFullScreen = ({
  open,
  handleClose,
  isOpen,
  index,
  sizeOfArray,
  setIndex,
}) => {
  // console.log(open);
  const [details, setDetails] = useState(false);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, true);
  }, []);

  const handleKeyDown = (e) => {
    // console.log(e.key);
    if (e.key === "ArrowLeft") {
      setIndex((prev) => {
        return Math.max(0, prev - 1);
      });
    }
    if (e.key === "ArrowRight") {
      setIndex((prev) => {
        return Math.min(sizeOfArray - 1, prev + 1);
      });
    }
  };
  return (
    <Modal
      open={isOpen}
      onClose={(event, reason) => {
        handleClose(false);
      }}
      sx={{
        "& .MuiModal-backdrop": {
          backgroundColor: "rgba(255,255,255, 0.8)",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box padding={0} sx={{ margin: 0, padding: 0, position: "relative" }}>
          <Box
            component={"img"}
            maxWidth={window.innerWidth*0.96}
            maxHeight={window.innerHeight * 0.98}
            padding={0}
            src={open?.link}
            sx={{
              borderRadius: "0.55rem",
              padding: 0,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 7,
              left: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              width: "100%",
              paddingLeft: 2,
              borderBottomLeftRadius: "0.55rem",
              borderBottomRightRadius: "0.55rem",
            }}
          >
            <Typography variant="h4">{open.place_tag}</Typography>
            {open?.date && (
              <Typography sx={{ fontSize: 14 }}>
                {moment(new Date(open?.date)).format("DD MMMM, yyyy")}
              </Typography>
            )}
            <Typography sx={{ fontSize: 14 }}>{`${open.author} (${
              open.dept
            } '${open.batch?.slice(-2)})`}</Typography>
            {!details && (
              <Typography
                onClick={() => setDetails(true)}
                component={"div"}
                sx={{ fontSize: 14, cursor: "pointer" }}
              >
                <u>See Details</u>
              </Typography>
            )}

            {/* Show Details of the photo */}

            {details && (
              <Box>
                <Typography sx={{ fontSize: 14, pt: 1 }}>
                  <u>Some Words from Photographer</u>
                </Typography>
                {open?.caption && (
                  <Typography sx={{ fontSize: 14 }}>
                    Caption: {open?.caption}
                  </Typography>
                )}
                {open?.description && (
                  <Typography sx={{ fontSize: 14 }}>
                    Description: {open?.description}
                  </Typography>
                )}
                <Typography
                  onClick={() => setDetails(false)}
                  component={"div"}
                  sx={{ fontSize: 14, cursor: "pointer" }}
                >
                  <u>Hide Details</u>
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ position: "absolute", top: 2, right: 2 }}>
          <IconButton  onClick={() => handleClose(false)}>
            <Close fontSize="large" sx={{color: 'black'}} />
          </IconButton>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 2,
            left: 1,
            transform: "translate(0,-50%)",
          }}
        >
          <IconButton
            disabled={index === 0}
            onClick={() =>
              setIndex((prev) => {
                return Math.max(0, prev - 1);
              })
            }
          >
            <ArrowCircleLeft sx={{color: 'black'}} fontSize="large" />
          </IconButton>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 2,
            right: 1,
            transform: "translate(0,-50%)",
          }}
        >
          <IconButton
            disabled={index >= sizeOfArray - 1}
            onClick={() =>
              setIndex((prev) => {
                return Math.min(sizeOfArray - 1, prev + 1);
              })
            }
          >
            <ArrowCircleRight sx={{color: 'black'}} fontSize="large" />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default ImageFullScreen;
