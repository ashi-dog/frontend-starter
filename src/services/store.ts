import { authReducer, tokenMiddleware } from "@/features/auth";
import { configureStore } from "@reduxjs/toolkit";

import { apiSlice, rtkQueryErrorMiddleware } from "./api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware, tokenMiddleware, rtkQueryErrorMiddleware),
    devTools: import.meta.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
