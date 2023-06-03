import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

import { postLogin, postLogout } from "../../features/auth";
import { RootState } from "../store";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5005";
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, api) => {
        const { getState } = api;
        const isLogin = (getState() as RootState).auth.isLogin;
        const token = localStorage.getItem("accessToken") || null;
        if (isLogin && token) {
            headers.set("Authorization", "Bearer " + token);
        }
        return headers;
    },
});

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    // accessToken expired handling
    if (result?.error && result?.error?.status === 401) {
        // TODO
        console.log("accessToken expired");
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshToken = localStorage.getItem("refreshToken") || null;
                const refreshResult: any = await baseQuery(
                    {
                        url: "/token_refresh",
                        method: "POST",
                        body: { refresh_token: refreshToken },
                    },
                    api,
                    extraOptions
                );
                if (refreshResult?.data) {
                    api.dispatch(
                        postLogin({
                            accessToken: refreshResult.data?.access_token,
                            refreshToken: refreshResult.data?.refresh_token,
                        })
                    );
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    console.log("refresh failed");
                    api.dispatch(postLogout());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ["Auth"],
    endpoints: () => ({}),
});

export const rtkQueryErrorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    // TODO refresh token
    //console.log(action.payload);
    //const tokenExpired =
    //    action?.payload?.data?.message === "Token is expired";

    if (isRejectedWithValue(action)) {
        console.log("🐑 ~ fetch api error:", action?.payload?.data);
    }
    //if (isRejectedWithValue(action) && tokenExpired) {
    //  const message = "Please Login Again";
    //  //customToast.error(message);
    //  api.dispatch(postLogout());
    //}

    return next(action);
};
