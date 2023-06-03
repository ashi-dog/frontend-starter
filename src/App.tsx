import "./App.css";

import { useState } from "react";

import viteLogo from "/vite.svg";

import reactLogo from "./assets/react.svg";
import { postLogin, setCurrentUser, SocialLoginType, useGoogleSignUpMutation } from "./features/auth";
import { ISocialSignUpReq } from "./features/auth/types/interfaces";
import { useAppDispatch } from "./hooks/reduxHooks";
import { socialLoginHandler } from "./lib/firebase/firebaseAuth";

function App() {
    const [count, setCount] = useState(0);
    const dispatch = useAppDispatch();

    const [fetchGoogleSignIn, { isLoading: googleLoading }] = useGoogleSignUpMutation();

    const handleFetchSignIn = (loginType: string, userInfo: ISocialSignUpReq) => {
        switch (loginType) {
            case SocialLoginType.google:
                return () => fetchGoogleSignIn({ ...userInfo });
            default:
                throw new Error("Unknown login type: " + loginType);
        }
    };
    const handleSocialLogin = async (loginType: string) => {
        try {
            const userResult = await socialLoginHandler(loginType);
            if (!userResult) return;
            const accessToken = userResult.accessToken;

            const userInfo = {
                firebase_uid: userResult.uid,
                email: userResult.email!,
                username: userResult.displayName!,
                photo_url: userResult.photoURL!,
            };
            console.log("🐑 ~ accessToken:", {
                ...userInfo,
                access_token: accessToken,
            });
            const res = await handleFetchSignIn(loginType, {
                ...userInfo,
                access_token: accessToken,
            })().unwrap();

            if (res) {
                dispatch(
                    setCurrentUser({
                        username: userInfo.username,
                        email: userInfo.email,
                        photoUrl: userInfo.photo_url,
                        accountId: res.account_id,
                    })
                );
                dispatch(
                    postLogin({
                        accessToken: res.access_token,
                        refreshToken: res.refresh_token,
                    })
                );
                //navigate("/");
                alert("Success Login");
            }
        } catch (err) {
            //console.log(err);
        }
    };
    return (
        <>
            <div>
                <a href='https://vitejs.dev' target='_blank'>
                    <img src={viteLogo} className='logo' alt='Vite logo' />
                </a>
                <a href='https://react.dev' target='_blank'>
                    <img src={reactLogo} className='logo react' alt='React logo' />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className='card'>
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
            <button onClick={() => handleSocialLogin(SocialLoginType.google)}>Click to Test rtkQuery : </button>
        </>
    );
}

export default App;
