import { BASE_URL } from "@/constants/api";
import axios from "axios";
import { getAccessToken } from "./secureStore";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Logout auto et redirect
      // await logout(); // Si intégré
      // const router = useRouter(); router.replace('/login');
    }
    return Promise.reject(error);
  },
);

export default api;
