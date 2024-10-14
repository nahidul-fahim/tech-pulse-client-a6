/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";


const followApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // follow user
        followUser: builder.mutation({
            query: ({ token, followInfo }: { token: string, followInfo: Record<string, unknown> }) => ({
                url: `/follow/follow-user`,
                method: 'POST',
                body: followInfo,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
        // unfollow user
        unfollowUser: builder.mutation({
            query: ({ token, followInfo }: { token: string, followInfo: Record<string, unknown> }) => ({
                url: `/follow/unfollow-user`,
                method: 'POST',
                body: followInfo,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
        // get user payments
        // userPayments: builder.query({
        //     query: ({ id }: { id: string }) => ({
        //         url: `/payment/user-payments/${id}`,
        //         method: 'GET',
        //     })
        // }),
    }),
})

export const {
    useFollowUserMutation,
    useUnfollowUserMutation,
} = followApi;