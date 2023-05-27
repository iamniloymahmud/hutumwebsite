import { configureStore } from "@reduxjs/toolkit";
import api from "../api/api";
import globalSlice from "../slice/globalSlice";
import movieSlice from "../slice/movieSlice";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [globalSlice.name]: globalSlice.reducer,
        [movieSlice.name]: movieSlice.reducer,
    },
    middleware: (getDefaultMiddlewares) => {
        return getDefaultMiddlewares().concat(api.middleware);
    },
    devTools: false,
});

export default store;