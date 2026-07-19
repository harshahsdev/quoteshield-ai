import axios from "axios";

export const api = axios.create({
  baseURL: "https://quoteshield-ai.onrender.com/api",
  withCredentials: true,
});
api.interceptors.request.use((config) =>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default api;