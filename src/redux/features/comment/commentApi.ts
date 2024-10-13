/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";


const commentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // create new comment
        createNewComment: builder.mutation({
            query: ({ token, postId, commentInfo }: { token: string, postId: string, commentInfo: Record<string, any> }) => ({
                url: `/comment/create-comment/${postId}`,
                method: 'POST',
                body: commentInfo,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
        // get all comments of a post
        singlePostComments: builder.query({
            query: ({ postId }: { postId: string }) => ({
                url: `/comment/get-comments/${postId}`,
                method: 'GET',
            })
        }),
        // delete a comment
        deleteComment: builder.mutation({
            query: ({ token, commentId }: { token: string, commentId: string }) => ({
                url: `/comment/delete-comment/${commentId}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
        // update a comment
        updateComment: builder.mutation({
            query: ({ token, commentId, commentInfo }: { token: string, commentId: string, commentInfo: Record<string, any> }) => ({
                url: `/comment/edit-comment/${commentId}`,
                method: 'PATCH',
                body: commentInfo,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
    }),
})

export const {
    useCreateNewCommentMutation,
    useSinglePostCommentsQuery,
    useDeleteCommentMutation,
    useUpdateCommentMutation
} = commentApi;