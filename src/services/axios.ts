import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" }
});

// TODO: conferir pra que serve isso... n entendi
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  console.log("aaaa", token);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
