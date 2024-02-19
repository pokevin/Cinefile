import { tauriFetch } from "./tauri";

const SEARCH_API_URL = "https://api.themoviedb.org/3/search/movie";

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

export const searchMedia = async (
  query: string,
  lang?: string,
): Promise<MediaSearchResponse> => {
  const requestUrl = new URL(SEARCH_API_URL);
  requestUrl.searchParams.set("query", query);
  if (lang) requestUrl.searchParams.set("language", lang);

  const response = await tauriFetch<MediaSearchResponse>(requestUrl, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });

  if (!response?.ok) {
    console.log(response);
    throw new Error("An error occured when fetching medias from TMDB");
  }
  return {
    ...response.data,
    results: response.data.results.map((result) => ({
      ...result,
      poster_path: getPosterPath(result.poster_path),
    })),
  };
};
