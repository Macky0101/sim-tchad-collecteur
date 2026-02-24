import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";
import {
    CreateCategoryRequest,
    CreateCategoryResponse,
} from "@/types/category";

export const createCategoryService = async (
  data: CreateCategoryRequest,
): Promise<CreateCategoryResponse> => {
  const { data: response } = await api.post<CreateCategoryResponse>(
    ENDPOINTS.categories.create,
    data,
  );
  return response;
};
