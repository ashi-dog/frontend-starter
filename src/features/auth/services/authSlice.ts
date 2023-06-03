import { createSlice, Middleware } from "@reduxjs/toolkit";

import { RootState } from "../../../services/store";
import { IAuthState } from "../types/interfaces";

const initialState: IAuthState = {
    currentUser: null,
    isLogin: false,
    isAuth: "loading",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        postLogin: (state, action) => {
            state.isLogin = true;
            state.isAuth = true;
        },
        postLogout: (state) => {
            state.isLogin = false;
            state.currentUser = null;
            state.isAuth = false;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
    },
});

export const { postLogin, postLogout, setCurrentUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectIsLogin = (state: RootState) => state.auth.isLogin;
export const selectIsAuth = (state: RootState) => state.auth.isAuth;

export const tokenMiddleware: Middleware = (store) => (next) => (action) => {
    if (authSlice.actions.postLogin.type.match(action.type)) {
        const { accessToken, refreshToken } = action.payload;

        if (accessToken && refreshToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
        }
    }
    if (authSlice.actions.postLogout.type.match(action.type)) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
    return next(action);
};
