import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3/";
const apiKey = "c8d82f6f08cefeda0f8738249710e644";
const queryTrending = "trending/movie/day";

export const fetchMovieTrending = () => {
  const requestParams = `${queryTrending}?api_key=${apiKey}`;
  return axios.get(`${baseUrl}${requestParams}`).then((res) => {
    return res.data.results;
  });
};

export const fetchMovieDetails = (movieId) => {
  const requestParams = `movie/${movieId}?api_key=${apiKey}`;
  return axios.get(`${baseUrl}${requestParams}`);
};

export const fetchMovieCast = (movieId) => {
  const requestParams = `movie/${movieId}/credits?api_key=${apiKey}`;
  return axios.get(`${baseUrl}${requestParams}`);
};

export const fetchMovieReviews = (movieId) => {
  const requestParams = `movie/${movieId}/reviews?api_key=${apiKey}`;
  return axios.get(`${baseUrl}${requestParams}`);
};

export const fetchMovieSearch = (query) => {
  const requestParams = `search/movie?api_key=${apiKey}&query=${query}`;
  return axios.get(`${baseUrl}${requestParams}`);
};
