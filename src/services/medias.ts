import { getDb } from "./db";
import { TMDB_GENRES } from "./tmdb";

export const genresList = Object.values(TMDB_GENRES);
export type MediaGenre = (typeof genresList)[number];

export interface Media {
  id: string;
  title: string;
  posterPath: string;
  genres: MediaGenre[];
  url: string;
  releaseDate: Date;
  updatedAt: Date;
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
