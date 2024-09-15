// import { configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({

    creatNewOrder: builder.mutation({
      query(body) {
        return {
          url: '/orders/new',
          method: "POST",
          body,
        }
      }
    }),

    stripeCheckoutSession: builder.mutation({
      query(body) {
        return {
          url: '/payment/checkout_session',
          method: "POST",
          body,
        }
      }
    }),
  }),
});

export const { useCreatNewOrderMutation, useStripeCheckoutSessionMutation } = orderApi;
