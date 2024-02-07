import { type Database, initDb } from "../utils/initDb";
import type { Media } from "./medias";

interface CinefileDB extends Database {
  medias: {
    key: string;
    value: Media;
  };
}

let db: Awaited<ReturnType<typeof initDb<CinefileDB>>> | undefined = undefined;

export async function getDb() {
  if (db === undefined) {
    db = await initDb<CinefileDB>("cinefile", ["medias"]);
  }
  return db;
}
