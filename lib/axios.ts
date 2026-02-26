import { BASE_URL } from "@/constants/api";
import axios from "axios";
import { getAccessToken } from "./secureStore";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
    config.headers["Content-Type"] = "multipart/form-data";
  }

  return config;
});

export default api;
