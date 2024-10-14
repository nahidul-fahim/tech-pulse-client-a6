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
        // get all users
        getAllUsers: builder.query({
            query: ({ token }: { token: string }) => ({
                url: `/users`,
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
        // manage user
        manageUser: builder.mutation({
            query: ({ id, manageData, token }: { id: string, manageData: Record<string, unknown>, token: string }) => ({
                url: `/manage-user/${id}`,
                method: 'PUT',
                body: manageData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),

        // admin dashboard data
        adminDashboardData: builder.query({
            query: ({ token }: { token: string }) => ({
                url: `/admin-dashboard-data`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
    }),
})

export const {
    useGetUserQuery,
    useGetAllUsersQuery,
    useUpdateUserMutation,
    useManageUserMutation,
    useAdminDashboardDataQuery
} = userApi;