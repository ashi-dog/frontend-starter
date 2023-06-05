import i18n from "@/locales/i18n";
import { RootState } from "@/services/store";
import { createSlice } from "@reduxjs/toolkit";

const defaultLang = i18n.language;

const initialState = {
    defaultLang,
};

const langSlice = createSlice({
    name: "lang",
    initialState,
    reducers: {
        setLang: (state, action) => {
            i18n.changeLanguage(action.payload);
            state.defaultLang = action.payload;
        },
    },
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;

export const selectLang = (state: RootState) => state.lang.defaultLang;
