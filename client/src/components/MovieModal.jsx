import React from "react";
import { Box, Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../redux/slice/globalSlice";
import MovieModalBox from "./MovieModalBox";

const MovieModal = () => {
  const data = useSelector((state) => state.global.modal);
  const dispatch = useDispatch();
  return (
    <Modal
      open={data ? true : false}
      onClose={() => dispatch(setModal())}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box width={'320px'}>
        <MovieModalBox data={data} />
      </Box>
    </Modal>
  );
};

export default MovieModal;
