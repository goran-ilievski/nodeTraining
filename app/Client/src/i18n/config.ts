import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const en = require("./locales/en.json");
const mk = require("./locales/mk.json");
const de = require("./locales/de.json");
const fr = require("./locales/fr.json");

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en,
      },
      mk: {
        translation: mk,
      },
      de: {
        translation: de,
      },
      fr: {
        translation: fr,
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
