import type { Getter, Setter } from "jotai";
import { atom, useAtom } from "solid-jotai";
import type { Media } from "./medias";

const CONFIG_KEY = "config";

export interface Config {
  mediaDirectoryPath: string;
  sortBy: Extract<keyof Media, "title" | "releaseDate" | "updatedAt">;
  order: "asc" | "desc";
}

const defaultConfig = {
  mediaDirectoryPath: "",
  sortBy: "title",
  order: "asc",
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

export const useConfig = () => useAtom(derivedAtom);
