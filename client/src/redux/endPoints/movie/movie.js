import api from "../../api/api";
import {
  setHeroMovies,
  setAllMovies,
  setPopularMovies,
  clearAllMovies
} from "../../slice/movieSlice";

const movieApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHeroMovies: builder.query({
      query: () => {
        return `/movies/hero`;
      },
      providesTags: ["Hero"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setHeroMovies(data));
        } catch (error) {}
      },
    }),
    getAllMovies: builder.mutation({
      query: (data) => {
        return {
          url: "movies/all",
          method: "POST",
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if(args?.pageNumber === 1){
            dispatch(clearAllMovies());
          }
          dispatch(setAllMovies(data));
        } catch (error) {}
      },
    }),
    getSearch: builder.mutation({
      query: (search) => {
        return {
          url: "movies/search",
          method: "POST",
          body: {
            search,
          },
        };
      },
    }),
    getPopluarMovies: builder.query({
      query: () => {
        return "/movies/popular";
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {data} = await queryFulfilled;
          dispatch(setPopularMovies(data));
        } catch (error) {}
      },
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetHeroMoviesQuery,
  useGetPopluarMoviesQuery,
  useGetAllMoviesMutation,
  useGetSearchMutation,
} = movieApi;
