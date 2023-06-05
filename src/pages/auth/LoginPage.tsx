import { postLogin, setCurrentUser, SocialLoginType, useGoogleSignUpMutation } from "@/features/auth";
import { ISocialSignUpReq } from "@/features/auth/types/interfaces";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { socialLoginHandler } from "@/lib/firebase/firebaseAuth";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
                navigate("/");
            }
        } catch (err) {
            //console.log(err);
        }
    };
    return (
        <div>
            {/*<button onClick={() => handleSocialLogin(SocialLoginType.google)}>Click to Test rtkQuery : </button>*/}
            <Button variant='primary' onClick={() => handleSocialLogin(SocialLoginType.google)}>
                Login
            </Button>
        </div>
    );
};
export default LoginPage;
