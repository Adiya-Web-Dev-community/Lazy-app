import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "../api/adminApi";
import { CategoryResponseData } from "../types/contentType";
import { ApiError, ApiResponse } from "../types/apiType";

export const useCategories = () => {
  return useQuery<ApiResponse<CategoryResponseData>, ApiError>({
    queryKey: ["categories"],
    queryFn: async () => {
      return await apiRequest<CategoryResponseData>({
        url: "/categories",
        method: "get",
      });
    },
  });
};
