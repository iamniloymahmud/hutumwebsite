import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: {},
  progress: undefined,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImage: (state, action) => {
      if (state.images[action.payload.year]) {
        state.images[action.payload.year] = state.images[
          action.payload.year
        ].concat(action.payload.data);
      } else {
        state.images[action.payload.year] = action.payload.data;
      }
      if (action?.payload?.data?.length == 0) {
        state[action.payload.year] = true;
      }
      // state.images[action.payload.year] = action.payload.data;
    },
    clearImage: (state, action) => {
      if (state.images[action.payload]) state.images[action.payload] = [];
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    clearProgress: (state, action) => {
      state.progress = undefined;
    },
  },
});

export default imageSlice;
export const { setImage, clearImage, setProgress, clearProgress } =
  imageSlice.actions;
