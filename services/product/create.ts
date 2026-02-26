import { ENDPOINTS } from "@/constants/api";
import { getAccessToken } from "@/lib/secureStore";

export const createProductService = async (formData: FormData) => {
  const token = await getAccessToken();

  const response = await fetch(ENDPOINTS.products.sendWithImage, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(JSON.stringify(errorData));
  }

  return await response.json();
};
