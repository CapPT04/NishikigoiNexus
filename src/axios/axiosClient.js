import axios from "axios";

const instance = axios.create({
  timeout: 300000,
  baseURL: process.env.REACT_APP_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  null
  // (error) => {
  //   return error.response;
  // }
);
export default instance;
