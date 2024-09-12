import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productsApi.js";
import { authApi } from "./api/autApi.js";
import { userApi } from "./api/userApi.js";
import userReducer from "./features/userSlice.js";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
    ]),
});
