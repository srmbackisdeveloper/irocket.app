import Axios from "axios";

export const axiosInstance = (url: string) => {
  const BASE_URL = import.meta.env.BASE_URL;
  const token = localStorage.getItem('token');

  const axios = Axios.create({
    baseURL: `${BASE_URL}/${url}`,
    timeout: 1500,
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Token ${token}` })
    },
  });
  return axios;
};