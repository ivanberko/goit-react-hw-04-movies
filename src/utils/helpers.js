export const formatData = (data) => {
  const {
    id,
    title,
    release_date,
    overview,
    genres,
    vote_average,
    poster_path,
  } = data;

  const result = {
    id,
    title,
    release_date,
    overview,
    genres,
    vote_average,
    poster_path,
  };
  return result;
};

const imgUrl = "https://image.tmdb.org/t/p/";

export const getPoster = (path, sizeImg = "original") => {
  return `${imgUrl}${sizeImg}${path}`;
};
