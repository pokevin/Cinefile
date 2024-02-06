export interface Media {
  id: string;
  title: string;
  posterPath: string;
  releaseDate: Date;
}

export const getMedias = async (): Promise<Media[]> => {
  const response = await fetch("https://jsonfakery.com/movies/simple-paginate");
  const results = (await response.json().then((res) => res.data)) as {
    id: string;
    original_title: string;
    poster_path: string;
    release_date: string;
  }[];
  return results.map((res) => ({
    id: res.id,
    title: res.original_title,
    posterPath: res.poster_path,
    releaseDate: new Date(res.release_date),
  }));
};
