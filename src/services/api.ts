import Axios from "axios";
import links from "./../links.json";

export const axiosInstance = (url: string) => {
  const token = localStorage.getItem('token');

  const axios = Axios.create({
    baseURL: `${links.api}/${url}`,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      ...(token && { "Authorization": `Token ${token}` })
    },
  });
  return axios;
};