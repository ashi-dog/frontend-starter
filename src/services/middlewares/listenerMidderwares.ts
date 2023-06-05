import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

import { setLang } from "../../features/langs";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    matcher: isAnyOf(setLang),
    effect: (action, listenerApi) => {
        localStorage.setItem("lang", action.payload);
    },
});
