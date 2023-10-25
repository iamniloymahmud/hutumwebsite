import api from "../../api/api";
import { setImage, clearImage, setProgress, clearProgress } from "../../slice/imageSlice";
import axios from 'axios';

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
        }),
        // sendPhoto: builder.mutation({
        //     query: (data) => {
        //         return {
        //             method: "POST",
        //             url: "/images/upload",
        //             body: data,
        //         }
        //     }
        // }),
        sendPhoto: builder.mutation({
            queryFn: async ({url,data}, api, extraOptions, baseQuery) => {
                try{
                    const res = await axios.post(`${url}/images/upload`,data, {
                        onUploadProgress: (upload) => {
                            let onUploadProgress = Math.round((100*upload.loaded)/upload.total);
                            api.dispatch(setProgress(onUploadProgress));
                        }
                    });
                    api.dispatch(clearProgress());
                    return {
                        data: res.data,
                    }
                }catch(Error){
                    // const Error = ax;
                    // console.log(Error);
                    api.dispatch(clearProgress());
                    return {
                        error: {
                            status: Error?.response?.status,
                            data: Error?.response?.data || Error?.message,
                        }
                    }
                }
            }
        })
    }),
    overrideExisting: true,
});

export const {useGetYearsQuery, useGetImagesByYearMutation, useHeroImagesMutation, useSendPhotoMutation} = imageApis;