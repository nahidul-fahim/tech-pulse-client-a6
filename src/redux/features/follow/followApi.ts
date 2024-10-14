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
        // get user followers
        followingList: builder.query({
            query: ({ token, userId }: { token: string, userId: string }) => ({
                url: `/follow/user-following/${userId}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
    }),
})

export const {
    useFollowUserMutation,
    useUnfollowUserMutation,
    useFollowingListQuery
} = followApi;