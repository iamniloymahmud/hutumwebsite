import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const api = createApi({
    reducerPath: 'hutum-api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_APP_API,
    }),
    tagTypes: ["Hero"],
    endpoints: (builder) => ({})
});

export default api;