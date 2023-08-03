import { configureStore } from "@reduxjs/toolkit";
import api from "../api/api";
import globalSlice from "../slice/globalSlice";
import movieSlice from "../slice/movieSlice";
import imageSlice from "../slice/imageSlice";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [globalSlice.name]: globalSlice.reducer,
        [movieSlice.name]: movieSlice.reducer,
        [imageSlice.name]: imageSlice.reducer,
    },
    middleware: (getDefaultMiddlewares) => {
        return getDefaultMiddlewares().concat(api.middleware);
    },
    devTools: !import.meta.env.PROD,
});

export default store;