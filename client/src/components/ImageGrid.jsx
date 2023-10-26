import React, { useState } from "react";
import {
  ImageList,
  useTheme,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  ListSubheader,
  useMediaQuery,
  Box,
} from "@mui/material";
import { Info as InfoIcon, Fullscreen } from "@mui/icons-material";
import ImageFullScreen from "./ImageFullScreen";
import { useSelector } from "react-redux";
import CircularProgrssBar from "./CircularProgrssBar";


const ImageGrid = ({ year, value, setValue }) => {
  const theme = useTheme();
  const images = useSelector((state) => state?.image?.images);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(null);
  const screenName = theme.breakpoints.screenBreakPoint(useMediaQuery, theme);
  const sizeOfArray = images?.[year]?.length;
  return (
    <Box position={'relative'}>
      {images?.[year] ? (
        <ImageList
          cols={theme.breakpoints.customCol[screenName]}
          gap={theme.breakpoints.customCol[screenName] * 3}
          sx={{ py: 2 }}
        >
          {/* <ImageListItem
          key="Subheader"
          cols={theme.breakpoints.customCol[screenName]}
        >
          <ListSubheader component="div">December</ListSubheader>
        </ImageListItem> */}
          {images?.[year]?.map((item, idx) => (
            <ImageListItem
              component={"div"}
              onClick={() => {setData(item); setModal(true); setIndex(idx)}}
              sx={{ borderRadius: "0.55rem", cursor: "pointer" }}
              key={item.link}
            >
              <img
                src={`${item.link}?w=550`}
                alt={`${item.place_tag} in KUET Campus`}
                loading="lazy"
                style={{ objectFit: "cover", borderRadius: "0.55rem" }}
              />
              <ImageListItemBar
                title={item.place_tag}
                subtitle={`Capture: ${item.author} (${
                  item.dept
                } '${item.batch.slice(-2)})`}
                sx={{
                  borderBottomLeftRadius: "0.55rem",
                  borderBottomRightRadius: "0.55rem",
                  "& .MuiImageListItemBar-title": { fontSize: Math.max(theme.breakpoints.customCol[screenName] * 6, 17), pb: 0.5, }, //styles for title
                  "& .MuiImageListItemBar-subtitle": { fontSize: Math.max(theme.breakpoints.customCol[screenName] * 4, 14), }, //styles for subtitle
                  fontSize: 40,
                }}
                actionIcon={
                  <IconButton
                    sx={{ color: "white" }}
                    aria-label={`khulna university of engineering and technology (kuet) info about ${item.caption}`}
                    onClick={() => {setData(item); setModal(true); setIndex(idx)}}
                  >
                    <Fullscreen />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Box width={"100%"} height={"90vh"}>
          <CircularProgrssBar />
        </Box>
      )}
      {modal && <ImageFullScreen handleClose={setModal} open={images[year][index]} isOpen={modal} value={value} setValue={setValue} setIndex={setIndex} index={index} sizeOfArray={sizeOfArray} />}
    </Box>
  );
};

export default ImageGrid;
