import { ChangeEvent, useEffect } from "react";

import { useAppSelector } from "@/hooks/reduxHooks";
import i18n from "@/locales/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { selectLang, setLang } from "../";

const langsOptions = [
    { value: "en-US", label: "LANGUAGE.ENUS" },
    { value: "zh-TW", label: "LANGUAGE.ZHTW" },
    { value: "zh-CN", label: "LANGUAGE.ZHCN" },
    { value: "ja-JP", label: "LANGUAGE.JAJP" },
];
const SelectLangs = () => {
    const { t } = useTranslation();

    const defaultLang = i18n.language;
    const selectedLang = useAppSelector(selectLang);

    const dispatch = useDispatch();

    const handleLangChange = (event: ChangeEvent<HTMLSelectElement>) => {
        dispatch(setLang(event.target.value));
    };

    useEffect(() => {
        dispatch(setLang(localStorage.getItem("lang") || defaultLang));
    }, [dispatch, defaultLang]);
    return (
        <div>
            <label htmlFor='langs'>Select langs</label>
            <select name='langs' id='langs' onChange={handleLangChange}>
                {langsOptions.map((lang) => (
                    <option value={lang.value} key={lang.value} selected={lang.value === selectedLang}>
                        {t(lang.label)}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default SelectLangs;
