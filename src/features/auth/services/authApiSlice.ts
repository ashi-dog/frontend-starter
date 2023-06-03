import { apiSlice } from "../../../services/api/apiSlice";
import { ILoginRes, ISocialSignUpReq, IUserStatusRes } from "../types/interfaces";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        googleSignUp: builder.mutation<ILoginRes, ISocialSignUpReq>({
            query: (credential) => ({
                url: "/google_signup",
                method: "POST",
                body: { ...credential },
            }),
            invalidatesTags: ["Auth"],
        }),
        checkUserStatus: builder.mutation<IUserStatusRes, void>({
            query: () => ({
                url: "/check_user_status",
                method: "POST",
            }),
            invalidatesTags: ["Auth"],
        }),
    }),
});

export const { useGoogleSignUpMutation, useCheckUserStatusMutation } = authApiSlice;
