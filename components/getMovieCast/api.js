import axios from 'axios';

const API_KEY = '7e6a9fe8d19e65ed25205bb5935cd051';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
});

export const getMovieCast = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/credits`, {
      params: {
        api_key: API_KEY,
      },
    });

    return response.data.cast;
  } catch (error) {
    console.error('Error fetching movie cast:', error);
    throw error;
  }
};

export default api;