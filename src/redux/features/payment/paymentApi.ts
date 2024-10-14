/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";


const paymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // create new payment
        makePayment: builder.mutation({
            query: ({ token, info }: { token: string, info: Record<string, any> }) => ({
                url: `/payment/make-payment`,
                method: 'POST',
                body: info,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
        // get all payments
        allPayments: builder.query({
            query: ({ token }: { token: string }) => ({
                url: `/payment/all-payments`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        }),
        // get user payments
        userPayments: builder.query({
            query: ({ id }: { id: string }) => ({
                url: `/payment/user-payments/${id}`,
                method: 'GET',
            })
        }),
    }),
})

export const {
    useMakePaymentMutation,
    useAllPaymentsQuery,
    useUserPaymentsQuery
} = paymentApi;