import i18n, { type InitOptions } from "i18next";
import { createEffect } from "solid-js";
import { useConfig } from "../config";

import enLang from "./locales/en.json";
import frLang from "./locales/fr.json";

i18n.init({
  debug: import.meta.env.DEV,
  interpolation: { escapeValue: true },
  resources: {
    "en-US": {
      translation: enLang,
    },
    "fr-FR": {
      translation: frLang,
    },
  },
} satisfies InitOptions<unknown>);

export const useTranslation = () => {
  const [config] = useConfig();
  createEffect(() => {
    const lang = config().locale;
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  });
  return (key: keyof typeof enLang) => i18n.t(key);
};
