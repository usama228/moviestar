export interface TrendingResult {
  page: number;
  results: ResultItem[];
  total_pages: number;
  total_results: number;
}

export interface MediaResult {
  page: number;
  results: ResultItem[];
  total_pages: number;
  total_results: number;
}
export interface Video {
  id:string;
  key: string;
  name: string;
  type: string;
 
}

export interface RootObject {
  success: boolean;
  status_code: number;
  status_message: string;
}

export interface ResultItem {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title?: string;
  original_language: string;
  original_title?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
  videos?: MovieVideoResult;
  
  
}

export enum MediaType {
  Movie = 'movie',
  Tv = 'tv',
}
export interface MovieCredits {
  id: number;
  cast: Cast[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface MovieVideo {
  id: string;
  name: string;
  key: string;
}

export interface MovieVideoResult extends RootObject {
  results?: MovieVideo[];
}