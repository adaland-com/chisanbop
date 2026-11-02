import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import pl from "./locales/pl/translation.json";

const savedLanguage = localStorage.getItem("app-language");

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            pl: { translation: pl }
        },

        lng: savedLanguage || "en",
        fallbackLng: "en",

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;