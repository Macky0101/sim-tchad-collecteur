import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import { LoginRequest, LoginResponse } from "@/types/auth";

export const LoginService = async (
  data: LoginRequest,
): Promise<LoginResponse> => {
  const { data: response } = await api.post<LoginResponse>(
    ENDPOINTS.auth.login,
    data,
  );
  return response;
};
