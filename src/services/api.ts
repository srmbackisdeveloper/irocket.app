import Axios from "axios";

export const axiosInstance = (url: string) => {
  const BASE_URL = "https://irocket.sky-ddns.kz";
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