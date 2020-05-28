import axios from "axios";

const baseUrl = "https://pixabay.com/api";
const apiKey = "13689220-f8624404383f6a2586dfba74c";
const perPage = 12;

export const fetchData = (query, page) => {
  const requestParams = `/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=${perPage}&key=${apiKey}`;
  return axios.get(`${baseUrl}${requestParams}`).then((res) => {
    return res.data.hits;
  });
};
