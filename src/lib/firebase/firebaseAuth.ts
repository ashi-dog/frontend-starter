import { SocialLoginType } from "@/features/auth";
import { FirebaseError } from "firebase/app";
import {
    AuthErrorCodes,
    FacebookAuthProvider,
    fetchSignInMethodsForEmail,
    getAuth,
    GoogleAuthProvider,
    linkWithCredential,
    OAuthCredential,
    signInWithPopup,
} from "firebase/auth";

import firebaseApp from "./config";

export const auth = getAuth(firebaseApp);

export const checkSocialProvider = (socialType: string) => {
    let provider;
    switch (socialType) {
        case SocialLoginType.google:
            provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: "select_account" });
            break;
        case SocialLoginType.fb:
            provider = new FacebookAuthProvider();
            break;

        default:
            throw new Error("Unknown social login type");
    }
    return provider;
};

export const socialLoginHandler = async (socialType: string) => {
    const provider = checkSocialProvider(socialType);
    if (!provider) {
        return;
    }

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const accessToken = await user.getIdToken();
        //const isNewUser = getAdditionalUserInfo(result)?.isNewUser;

        return { ...user, accessToken };
    } catch (err) {
        const error = err as FirebaseError;
        if (error?.code === AuthErrorCodes.NEED_CONFIRMATION) {
            const email = error?.customData?.email as string;
            if (email) {
                const methods = await fetchSignInMethodsForEmail(auth, email);
                const pendingCred = FacebookAuthProvider.credentialFromError(error) as OAuthCredential;
                if (methods[0] === "google.com") {
                    const provider = new GoogleAuthProvider();
                    provider.setCustomParameters({ login_hint: email });
                    const result = await signInWithPopup(auth, provider);
                    const linked = await linkWithCredential(result.user, pendingCred);
                    console.log(linked);
                }
                //throw new Error("Already signed up with other social login type.");
            }
        }
    }
};

export const signOut = async () => {
    try {
        await auth.signOut();
        console.log("logout");
    } catch (err) {
        console.log(err);
    }
};

//export async function signInWithMail(email: string, password: string) {
//    let result = null;
//    let error = null;
//    try {
//        result = await signInWithEmailAndPassword(auth, email, password);
//    } catch (e) {
//        error = e;
//    }

//    return { result, error };
//}
//export async function signUpWithMail(email: string, password: string) {
//    let result = null;
//    let error = null;
//    try {
//        result = await createUserWithEmailAndPassword(auth, email, password);
//    } catch (err) {
//        error = err;
//    }
//    return { result, error };
//}
