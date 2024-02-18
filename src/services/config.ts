import type { Getter, Setter } from "jotai";
import { atom, useAtom } from "solid-jotai";
import { createEffect } from "solid-js";
import { getLocale } from "./tauri";

const CONFIG_KEY = "config";

interface Config {
  mediaDirectoryPath: string;
  locale: string | undefined;
}

const defaultConfig = {
  mediaDirectoryPath: "",
  locale: undefined,
} satisfies Config;

const getInitialValue = (): Config => {
  const initialConfig = localStorage.getItem(CONFIG_KEY);
  return initialConfig !== null ? JSON.parse(initialConfig) : defaultConfig;
};

const baseConfigAtom = atom(getInitialValue());
const derivedAtom = atom(
  (get) => get(baseConfigAtom),
  function setter<K extends keyof Config>(
    get: Getter,
    set: Setter,
    key: K,
    value: Config[K],
  ) {
    const nextValue = { ...get(baseConfigAtom), [key]: value };
    set(baseConfigAtom, nextValue);
    localStorage.setItem(CONFIG_KEY, JSON.stringify(nextValue));
  },
);

export const useConfig = () => {
  const [config, setConfig] = useAtom(derivedAtom);

  createEffect(() => {
    if (!config().locale) {
      getLocale().then((locale) => locale && setConfig("locale", locale));
    }
  });

  return [config, setConfig] as const;
};
