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
            query: ({ searchTerm = "", category = "", isPremium = "all", page = 1, limit = 5 }) => {
                let queryString = `/post/get-posts?searchTerm=${searchTerm}&page=${page}&limit=${limit}`;
                if (category !== "all" && category !== "") {
                    queryString += `&category=${category}`;
                }
                if (isPremium && isPremium !== "all") {
                    const trueOrFalse = isPremium === "true" ? true : false;
                    queryString += `&isPremium=${trueOrFalse}`;
                }
                return {
                    url: queryString,
                    method: "GET"
                }
            }
        }),
        // get user all posts
        getUserAllPosts: builder.query({
            query: ({ token, searchTerm = "", category = "", isPremium = "all", page = 1, limit = 5 }) => {
                let queryString = `/post/get-user-posts?searchTerm=${searchTerm}&page=${page}&limit=${limit}`;
                if (category !== "all" && category !== "") {
                    queryString += `&category=${category}`;
                }
                if (isPremium && isPremium !== "all") {
                    const trueOrFalse = isPremium === "true" ? true : false;
                    queryString += `&isPremium=${trueOrFalse}`;
                }
                return {
                    url: queryString,
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            }
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

        // delete a post
        deletePost: builder.mutation({
            query: ({ token, id }: { token: string, id: string }) => ({
                url: `/post/delete-post/${id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),

        // vote a post
        votePost: builder.mutation({
            query: ({ token, id, voteType }: { token: string, id: string, voteType: Record<string, boolean> }) => ({
                url: `/post/vote-post/${id}`,
                method: 'PATCH',
                body: voteType,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        })
    }),
})

export const {
    useCreateNewPostMutation,
    useGetAllPostsQuery,
    useGetUserAllPostsQuery,
    useGetSinglePostQuery,
    useUpdatePostMutation,
    useDeletePostMutation,
    useVotePostMutation
} = postApi;