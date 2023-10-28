import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  modal: undefined,
  active: '',
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
    setModal: (state, action) => {
      if (state.modal) {
        state.modal = undefined;
      } else {
        state.modal = action.payload;
      }
    },
    setActive: (state, action) => {
      state.active = action.payload;
    }
  },
});

export default globalSlice;
export const { setMode, setModal, setActive } = globalSlice.actions;
