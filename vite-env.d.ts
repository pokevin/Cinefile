/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IMDB_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
