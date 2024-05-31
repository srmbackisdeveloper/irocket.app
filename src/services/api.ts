import Axios from "axios";

export const axiosInstance = (url: string) => {
  const BASE_URL = import.meta.env.VITE_API_PATH;

  // Create an Axios instance
  const axios = Axios.create({
    baseURL: `${BASE_URL}/${url}`,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor to include the token in each request
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Token ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axios;
};
