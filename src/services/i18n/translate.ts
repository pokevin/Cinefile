import * as i18n from "@solid-primitives/i18n";
import { createMemo, createSignal } from "solid-js";

import { getLocale } from "../tauri";
import en from "./locales/en-US.json";
import fr from "./locales/fr-FR.json";

export type Locale = "en-US" | "fr-FR";
export type RawDictionary = typeof en;
export type Dictionary = i18n.Flatten<RawDictionary>;

const dictionaries = {
  "en-US": en,
  "fr-FR": fr,
};

const [locale, setLocale] = createSignal<Locale>("en-US");

getLocale().then((sysLocale) => sysLocale && setLocale(sysLocale as Locale));

export const useTranslation = () => {
  const dict = createMemo(() => i18n.flatten(dictionaries[locale()]));

  const t = i18n.translator(dict);

  return { locale, setLocale, t };
};
