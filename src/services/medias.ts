import { getDb } from "./db";

export interface Media {
  id: string;
  title: string;
  posterPath: string;
  url: string;
  releaseDate: Date;
}

export const getMedias = async (): Promise<Media[]> => {
  const db = await getDb();
  return db.getAll("medias");
};
