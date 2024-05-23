import Axios from "axios";

export const axiosInstance = (url: string) => {
  const BASE_URL = import.meta.env.VITE_API_PATH;
  console.log(BASE_URL);
  const token = localStorage.getItem('token');

  const axios = Axios.create({
    baseURL: `${BASE_URL}/${url}`,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Token ${token}` })
    },
  });
  return axios;
};