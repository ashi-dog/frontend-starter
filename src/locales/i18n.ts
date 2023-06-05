import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enUS from "./en-US.json";
import jaJP from "./ja-JP.json";
import zhCN from "./zh-CN.json";
import zhTW from "./zh-TW.json";

let lng;
if (typeof window !== "undefined") {
    // Perform localStorage action
    lng = localStorage.getItem("i18nKey") || "en-US";
}

i18n.use(initReactI18next).init({
    // we init with resources
    resources: {
        "en-US": {
            translations: enUS,
        },
        "zh-TW": {
            translations: zhTW,
        },
        "zh-CN": {
            translations: zhCN,
        },
        "ja-JP": {
            translations: jaJP,
        },
    },
    lng,
    fallbackLng: "en-US",
    debug: false,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    // keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ",",
    },

    react: {
        useSuspense: true,
    },
});

export default i18n;
