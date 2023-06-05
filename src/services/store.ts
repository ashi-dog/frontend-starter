import { authReducer, tokenMiddleware } from "@/features/auth";
import { langReducer } from "@/features/langs";
import { configureStore } from "@reduxjs/toolkit";

import { apiSlice, rtkQueryErrorMiddleware } from "./api/apiSlice";
import { listenerMiddleware } from "./middlewares/listenerMidderwares";

console.log("current NODE_ENV", import.meta.env.MODE);

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        lang: langReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            apiSlice.middleware,
            tokenMiddleware,
            rtkQueryErrorMiddleware,
            listenerMiddleware.middleware
        ),
    devTools: import.meta.env.PROD,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
