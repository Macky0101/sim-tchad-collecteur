import { ENDPOINTS } from "@/constants/api";
import api from "@/lib/axios";

export const createProductService = async (formData: FormData) => {
  const { data: response } = await api.post(
    ENDPOINTS.products.sendWithImage,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response;
};
