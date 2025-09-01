import axios from "axios";
import { cookies } from "next/headers";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" }
});

// TODO: conferir pra que serve isso... n entendi
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  console.log("TOKEN AXIOS.TS: ", token);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
