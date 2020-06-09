import axios from "axios";

const baseUrl = "https://api.themoviedb.org/3/";
const apiKey = "c8d82f6f08cefeda0f8738249710e644";

export const fetchMovieTrending = (media, timeInterval) => {
  const requestParams = `trending/${media}/${timeInterval}?api_key=${apiKey}`;
  return axios.get(`${baseUrl}${requestParams}`).then((res) => {
    return res.data.results;
  });
};

export const fetchMovieDetails = (media, movieId) => {
  const requestParams = `${media}/${movieId}?api_key=${apiKey}`;
  return axios.get(`${baseUrl}${requestParams}`);
};

export const fetchMovieCast = (media, movieId) => {
  const requestParams = `${media}/${movieId}/credits?api_key=${apiKey}`;
  return axios.get(`${baseUrl}${requestParams}`);
};

export const fetchMovieReviews = (media, movieId) => {
  const requestParams = `${media}/${movieId}/reviews?api_key=${apiKey}`;
  return axios.get(`${baseUrl}${requestParams}`);
};

export const fetchMovieSearch = (query) => {
  const requestParams = `search/movie?api_key=${apiKey}&query=${query}`;
  return axios.get(`${baseUrl}${requestParams}`);
};

export const fetchMovieGenresList = (genre) => {
  const requestParams = `genre/${genre}/list?api_key=${apiKey}`;
  return axios.get(`${baseUrl}${requestParams}`);
};

export const fetchMovieListByGenre = (media, genreId) => {
  const requestParams = `discover/${media}?api_key=${apiKey}&with_genres=${genreId}`;
  return axios.get(`${baseUrl}${requestParams}`);
};
