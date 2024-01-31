import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import vi from "../locales/vi.json";
const resources = { en, vi };

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  debug: true,
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  resources,
});

export default i18n;
