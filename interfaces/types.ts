export interface Favorite {
    id: string;
    mediaType: MediaType; // Import or define MediaType here
    thumb: string;
    name: string;
  }

  
  
  export type MediaType = 'movie' | 'tv'; // Define MediaType here if it's not already defined
  
  