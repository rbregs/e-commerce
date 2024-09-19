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

    myOrders: builder.query({
      query: () => `/me/orders`,
    }),

    orderDetails: builder.query({
      query: (id) => `/orders/${id}`,
    }),

    getDashboardSales: builder.query({
      query: ({startDate,endDate}) => `/admin/get_sales?startDate=${startDate}&endDate=${endDate}`,
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

export const { useCreatNewOrderMutation, 
               useStripeCheckoutSessionMutation, 
               useMyOrdersQuery, 
               useOrderDetailsQuery,
              useLazyGetDashboardSalesQuery } = orderApi;
