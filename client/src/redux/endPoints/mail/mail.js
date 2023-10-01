import api from "../../api/api";

const mailApi = api.injectEndpoints({
    endpoints: (builder) => ({
        sendEmail: builder.mutation({
            query: (email) => {
                return {
                    method: "POST",
                    url: "/addMail",
                    body: {
                        email,
                    }
                }
            }
        })
    }),
    overrideExisting: true,
});

export const {useSendEmailMutation} = mailApi;
