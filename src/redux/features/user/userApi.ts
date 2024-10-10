/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";


const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // get single user
        getUser: builder.query({
            query: ({ id, token }: { id: string, token: string }) => ({
                url: `/user/${id}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
        // update user
        updateUser: builder.mutation({
            query: ({ id, updatedInfo, token }: { id: string, updatedInfo: Record<string, any>, token: string }) => ({
                url: `/user/${id}`,
                method: 'PUT',
                body: updatedInfo,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
    }),
})

export const {
    useGetUserQuery,
    useUpdateUserMutation,
} = userApi;