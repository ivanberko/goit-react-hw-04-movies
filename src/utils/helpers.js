const imgUrl = "https://image.tmdb.org/t/p/";

export const getPoster = (path, sizeImg = "original") => {
  return `${imgUrl}${sizeImg}/${path}`;
};

export const scrollTo = () =>
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  });

export const scrollToUp = () =>
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
