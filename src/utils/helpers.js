const imgUrl = "https://image.tmdb.org/t/p/";

export const getPoster = (path, sizeImg = "original") => {
  return `${imgUrl}${sizeImg}${path}`;
};
