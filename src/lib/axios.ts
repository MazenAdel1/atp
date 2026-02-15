import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  proxy: false, // Disable proxy detection to avoid url.parse() deprecation warning
});

export default api;
