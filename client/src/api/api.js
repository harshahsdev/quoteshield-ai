import axios from "axios";

console.log("VITE_API_URL =", import.meta.env.VITE_API_URL);
console.log("MODE =", import.meta.env.MODE);

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  console.log("Request URL:", config.baseURL + config.url);

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;