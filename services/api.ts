import { MediaType, TrendingResult, MovieCredits,MovieVideoResult} from "@/interfaces/apiresults";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const getTrending = async (): Promise<TrendingResult> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${API_KEY}&page=7`
  );
  const json = await response.json();
  return json;
};

export const getSearchResults = async (query: string): Promise<TrendingResult> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?language=en-US&api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data;
};

export const getMovieDetails = async (id: number, type: MediaType): Promise<any> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}?language=en-US&api_key=${API_KEY}`
  );
  const movieDetails = await response.json();
 
  const creditsResponse = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US&api_key=${API_KEY}`
  );
  const creditsData = await creditsResponse.json();

  const movieWithCast = {
    ...movieDetails,
    cast: creditsData.cast,
  };

  return movieWithCast;
};

export const getMovieCredits = async (id: number, type: MediaType): Promise<MovieCredits> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/credits?language=en-US&api_key=${API_KEY}`
  );
  const data = await response.json();
  return data;
};
export const getMovieVideos = async (id: number, type: MediaType): Promise<MovieVideoResult> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US&api_key=${API_KEY}`
  );
  const videoResult = await response.json();
  return videoResult;
};
export const getTopMovies = async (): Promise<TrendingResult> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=${API_KEY}&page=1`
  );
  const json = await response.json();
  return json;
};
