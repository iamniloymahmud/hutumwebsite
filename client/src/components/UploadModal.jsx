import {
  Box,
  CircularProgress,
  Fade,
  LinearProgress,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const UploadModal = ({ progress }) => {
  const theme = useTheme();
  const [faded, setFaded] = useState(false);
  const processingTime = 1500;
  useEffect(() => {
    const interval = setInterval(() => {
      setFaded((prev) => !prev);
    }, [processingTime]);
    return () => clearInterval(interval);
  }, []);
  return (
    <Modal open={progress} onClose={(r, e) => console.log("hello")}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "320px",
            height: "200px",
            backgroundColor: theme.palette.background.alt,
            display: "flex",
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0.55rem",
          }}
        >
          {progress && progress != 100 && (
            <Box width={"90%"}>
              <LinearProgress
                variant="determinate"
                color="success"
                value={progress}
              />
            </Box>
          )}
          {progress && progress != 100 && (
            <Typography textAlign={"center"}>Uploading {progress}%</Typography>
          )}
          {progress == 100 && (<Box width={'90%'} justifyContent={'center'} display={'flex'}><CircularProgress color="success" disableShrink /></Box>)}
          {progress == 100 && (
            <Fade in={faded} timeout={processingTime}>
              <Typography
                variant="h5"
                textAlign={"center"}
                sx={{ fontWeight: "bold" }}
              >
                Processing Your Data
              </Typography>
            </Fade>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadModal;
