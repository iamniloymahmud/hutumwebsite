import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroMovies: undefined,
    allMovies: [],
    popularMovies: undefined,
};

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setHeroMovies: (state, action) => {
            state.heroMovies = action.payload;
        },
        setAllMovies: (state, action) => {
            state.allMovies = state.allMovies.concat(action.payload);
        },
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        }
    },
});

export default movieSlice;
export const {setHeroMovies, setAllMovies, setPopularMovies} = movieSlice.actions;