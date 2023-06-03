export interface ICurrentUser {
    username: string;
    email: string;
    photoUrl: string;
    accountId: string;
}

export interface IAuthState {
    currentUser: ICurrentUser | null;
    isLogin: boolean;
    isAuth: "loading" | boolean;
}

export interface ISocialSignUpReq {
    firebase_uid: string;
    access_token: string;
    email: string;
    username: string;
    photo_url?: string;
    phone_number?: string;
}

export interface IUserStatusRes {
    account_id: string;
}

export interface ILoginRes {
    access_token: string;
    refresh_token: string;
    account_id: string;
}
