import { Modal, Box, IconButton, Button, Typography } from "@mui/material";
import { Close, ArrowCircleRight, ArrowCircleLeft } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import FlexBetween from "./FlexBetween";
import CircularProgrssBar from "./CircularProgrssBar";
import { useSelector } from "react-redux";

const ImageFullScreen = ({
  open,
  handleClose,
  isOpen,
  index,
  sizeOfArray,
  setIndex,
  value,
  setValue
}) => {
  const states = useSelector(state => state.image);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(false);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [hide, setHide] = useState(true);
  // console.log(sizeOfArray);
  // swipte Distance
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0]);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0]);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setHide((prev) => !prev);
      return;
    }
    const distanceX = touchStart.clientX - touchEnd.clientX;
    const distanceY = touchStart.clientY - touchEnd.clientY;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;

    if (isRightSwipe && Math.abs(distanceX) > distanceY) {
      setIndex((prev) => {
        return Math.max(0, prev - 1);
      });
    }
    if (isLeftSwipe && distanceX > distanceY) {
      setIndex((prev) => {
        if((prev+1 === sizeOfArray) && !states[open.year]){
          setValue((prev) => {
            return {
              ...prev,
              page: prev.page+1,
            }
          })
        }
        return Math.min(sizeOfArray - 1, prev + 1);
      });
    }
  };

  // useEffect(() => {
  //   setIndex((prev) => {
  //     return Math.min(sizeOfArray - 1, prev + 1);
  //   });
  // }, [value]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, true);
  }, []);
  useEffect(() => {
    setLoading(false);
  }, [index]);
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
          backgroundColor: "rgba(0,0,0, 0.95)",
        },
      }}
    >
      {
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
          {(!loading || value) && <CircularProgrssBar />}
          <Box padding={0} sx={{ margin: 0, padding: 0, position: "relative" }}>
            {/* Image Show */}
            {!value && <Box
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onTouchMove={onTouchMove}
              component={"img"}
              maxWidth={window.innerWidth}
              maxHeight={window.innerHeight}
              onLoad={() => setLoading(true)}
              src={open?.link}
              sx={{
                padding: 0,
                display: loading ? "" : "none",
              }}
            />}

            {/* Full Details */}
            {hide && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  width: "100%",
                  paddingLeft: 2,
                  pb: 1,
                  borderBottomLeftRadius: "0.55rem",
                  borderBottomRightRadius: "0.55rem",
                }}
              >
                <Typography variant="h5">{open.place_tag}</Typography>
                <FlexBetween>
                  {open?.date && (
                    <Typography sx={{ fontSize: 14 }}>
                      {moment(new Date(open?.date)).format("DD MMMM, yyyy")}
                    </Typography>
                  )}
                  {!details && (
                    <Typography
                      onClick={() => setDetails(true)}
                      component={"div"}
                      sx={{ fontSize: 14, cursor: "pointer", pr: 1 }}
                    >
                      <u>See Details</u>
                    </Typography>
                  )}
                </FlexBetween>

                {/* Show Details of the photo */}

                {details && (
                  <Box>
                    <Typography sx={{ fontSize: 14, pt: 1 }}>
                      <u>Photographer:</u>
                    </Typography>
                    <Typography sx={{ fontSize: 14 }}>{`${open.author} (${
                      open.dept
                    } '${open.batch?.slice(-2)})`}</Typography>
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
            )}
          </Box>

          {/* Close Button */}

          {(
            <Box sx={{ position: "absolute", top: 2, right: 2 }}>
              <IconButton onClick={() => handleClose(false)}>
                <Close fontSize="large" sx={{ color: "white" }} />
              </IconButton>
            </Box>
          )}

          {/* Left Button */}
          {hide && (
            <Box
              sx={{
                position: "absolute",
                bottom: 2,
                left: 1,
                transform: "translate(0,-50%)",
              }}
            >
              <IconButton
                disabled={index === 0 || !loading}
                onClick={() =>
                  setIndex((prev) => {
                    return Math.max(0, prev - 1);
                  })
                }
              >
                <ArrowCircleLeft sx={{ color: "white" }} fontSize="large" />
              </IconButton>
            </Box>
          )}

          {/* Right Button */}

          <Box
            sx={{
              position: "absolute",
              bottom: 2,
              right: 1,
              transform: "translate(0,-50%)",
            }}
          >
            <IconButton
              disabled={index >= sizeOfArray - 1 || !loading}
              onClick={() =>
                setIndex((prev) => {
                  return Math.min(sizeOfArray - 1, prev + 1);
                })
              }
            >
              <ArrowCircleRight sx={{ color: "white" }} fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      }
    </Modal>
  );
};

export default ImageFullScreen;
