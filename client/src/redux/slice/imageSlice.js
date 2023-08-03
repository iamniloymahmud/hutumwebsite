import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    images : {},
}

const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setImage: (state, action) => {
            if(state.images[action.payload.year]){
                state.images[action.payload.year] = state.images[action.payload.year].concat(action.payload.data );
            }else{
                state.images[action.payload.year] = action.payload.data;
            }
            // state.images[action.payload.year] = action.payload.data;
        },
        clearImage: (state,action) => {
            if(state.images[action.payload])state.images[action.payload] = [];
        }
    }
});

export default imageSlice;
export const {setImage, clearImage} = imageSlice.actions;