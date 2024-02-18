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

export const insertMedias = async (medias: Media[]) => {
  const db = await getDb();
  await db.insertMany("medias", medias);
  return medias;
};

export const updateMedia = async (media: Media) => {
  const db = await getDb();
  await db.update("medias", media);
  return media;
};
