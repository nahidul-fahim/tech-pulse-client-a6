import { baseApi } from "@/redux/api/baseApi";


const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // sign up user
        signUp: builder.mutation({
            query: (signUpInfo) => ({
                url: '/auth/signup',
                method: 'POST',
                body: signUpInfo
            })
        }),

        // sign in user
        signin: builder.mutation({
            query: (signinInfo) => ({
                url: '/auth/signin',
                method: 'POST',
                body: signinInfo
            })
        }),

        // forget password
        forgetPassword: builder.mutation({
            query: (emailInfo) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: emailInfo
            })
        }),

        // reset password
        resetPassword: builder.mutation({
            query: (resetInfo) => ({
                url: `/auth/reset-password`,
                method: 'POST',
                body: resetInfo
            })
        })
    }),
})

export const {
    useSignUpMutation,
    useSigninMutation,
    useForgetPasswordMutation,
    useResetPasswordMutation
} = authApi;