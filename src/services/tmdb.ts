import { tauriFetch } from "./tauri";

const SEARCH_API_URL = "https://api.themoviedb.org/3/search/movie";

export const TMDB_GENRES = {
  [28]: "Action",
  [12]: "Adventure",
  [16]: "Animation",
  [35]: "Comedy",
  [80]: "Crime",
  [99]: "Documentary",
  [18]: "Drama",
  [10751]: "Family",
  [14]: "Fantasy",
  [36]: "History",
  [27]: "Horror",
  [10402]: "Music",
  [9648]: "Mystery",
  [10749]: "Romance",
  [878]: "Science Fiction",
  [10770]: "TV Movie",
  [53]: "Thriller",
  [10752]: "War",
  [37]: "Western",
} as const;

const mapPosterPathSize = {
  original: "original",
  medium: "w300_and_h450_bestv2",
  small: "w94_and_h141_bestv2",
} as const;

const getPosterPath = (
  suffix: string,
  size: "medium" | "small" | "original" = "medium",
) => `https://image.tmdb.org/t/p/${mapPosterPathSize[size]}${suffix}`;

interface MediaSearchResult {
  /** is it an adult media ? */
  adult: boolean;
  /** horizontal thumbnail */
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: string;
  poster_path: string;
  /** format YYYY-MM-dd */
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MediaSearchResponse {
  page: number;
  results: MediaSearchResult[];
  total_pages: number;
  total_results: number;
}

export const searchMedia = async (query: string, lang?: string) => {
  const requestUrl = new URL(SEARCH_API_URL);
  requestUrl.searchParams.set("query", query);
  if (lang) requestUrl.searchParams.set("language", lang);

  const response = await tauriFetch<MediaSearchResponse>(requestUrl, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  if (!response?.ok) {
    console.error(response);
    throw new Error("An error occured when fetching medias from TMDB");
  }
  return {
    ...response.data,
    results: response.data.results.map((result) => ({
      ...result,
      genres: result.genre_ids.map(
        (id) => TMDB_GENRES[id as keyof typeof TMDB_GENRES],
      ),
      poster_path: getPosterPath(result.poster_path),
    })),
  };
};
