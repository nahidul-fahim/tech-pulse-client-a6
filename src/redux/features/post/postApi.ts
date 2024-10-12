/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";


const postApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // create new post
        createNewPost: builder.mutation({
            query: ({ token, postInfo }: { token: string, postInfo: Record<string, any> }) => ({
                url: '/post/create-new-post',
                method: 'POST',
                body: postInfo,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
        // get all posts
        getAllPosts: builder.query({
            query: () => ({
                url: `/post/get-posts`,
                method: 'GET',
            })
        }),

        // get single post
        getSinglePost: builder.query({
            query: (id: string) => ({
                url: `/post/get-post/${id}`,
                method: 'GET',
            })
        }),

        // update a post
        updatePost: builder.mutation({
            query: ({ token, id, postInfo }: { token: string, id: string, postInfo: Record<string, any> }) => ({
                url: `/post/update-post/${id}`,
                method: 'PUT',
                body: postInfo,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
    }),
})

export const {
    useCreateNewPostMutation,
    useGetAllPostsQuery,
    useGetSinglePostQuery,
    useUpdatePostMutation
} = postApi;