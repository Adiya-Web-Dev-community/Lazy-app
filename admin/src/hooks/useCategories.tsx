import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "../api/adminApi";
import { CategoryResponseData } from "../types/contentType";
import { ApiError, ApiResponse } from "../types/apiType";

export const useCategories = () => {
  return useQuery<ApiResponse<CategoryResponseData>, ApiError>({
    queryKey: ["category"],
    queryFn: async () => {
      return await apiRequest<CategoryResponseData>({
        // url: "api/admin/category",
        url: "api/admin/category",
        method: "get",
      });
    },
  });
};
