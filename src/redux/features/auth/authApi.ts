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
    }),
})

export const {
    useSignUpMutation,
    useSigninMutation
} = authApi;