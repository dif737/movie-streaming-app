import axios from 'axios';

const API_KEY = 'ae21f1ebe04481040cc643c70230bc89';
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// 🔹 Films populaires
export const fetchPopularMovies = async (page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/movie/popular`,
    {
      params: {
        api_key: API_KEY,
        language: 'fr-FR',
        page,
      },
    }
  );
  return response.data;
};

// 🔹 Recherche
export const searchMovies = async (query, page = 1) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie`,
    {
      params: {
        api_key: API_KEY,
        language: 'fr-FR',
        query,
        page,
      },
    }
  );
  return response.data;
};

// 🔹 Détails d’un film
export const fetchMovieDetails = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}`,
    {
      params: {
        api_key: API_KEY,
        language: 'fr-FR',
        append_to_response: 'credits',
      },
    }
  );
  return response.data;
};

// 🔹 TA LISTE TMDB (Suicide Squad)
export const fetchMyList = async () => {
  const response = await axios.get(
    `${BASE_URL}/list/8578104`,
    {
      params: {
        api_key: API_KEY,
        language: 'fr-FR',
      },
    }
  );
  return response.data.items;
};
