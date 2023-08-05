import api from "../../api/api";
import { setImage, clearImage } from "../../slice/imageSlice";

const imageApis = api.injectEndpoints({
    endpoints: (builder) => ({
        getYears: builder.query({
            query: () => {
                return '/images/years';
            },
        }),
        getImagesByYear: builder.mutation({
            query: (data) => {
                return {
                    method: 'POST',
                    url: '/images/all',
                    body: {
                        year: data.year,
                        page: data.page,
                    }
                }
            },
            async onQueryStarted(args, {dispatch,getState, queryFulfilled}){
                try{
                    const data = await queryFulfilled;
                    if(args.page === 1){
                        dispatch(clearImage(args.year));
                    }
                    dispatch(setImage({
                        data: data.data,
                        year: args.year,
                    }))
                }catch(error){
                    console.log(error.message);
                }
            }
        }),
        heroImages: builder.mutation({
            query: (data) => {
                return {
                    method: 'POST',
                    url: '/images/all',
                    body: {
                        year: data.year,
                        page: data.page,
                    }
                }
            },
        })
    }),
    overrideExisting: true,
});

export const {useGetYearsQuery, useGetImagesByYearMutation, useHeroImagesMutation} = imageApis;