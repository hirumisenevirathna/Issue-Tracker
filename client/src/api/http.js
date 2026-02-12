import axios from "axios";

export const api = axios.create({
  baseURL: "https://issue-tracker-production-a244.up.railway.app", // vite proxy handles /api
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
