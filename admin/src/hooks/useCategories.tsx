import { useQuery } from "@tanstack/react-query";
import { CategoryResponseData } from "../types/contentType";
import { ApiError, ApiGetResponse } from "../types/apiType";
import { apiGetRequest } from "../api/adminGetApi";

export const useCategories = () => {
  return useQuery<ApiGetResponse<CategoryResponseData>, ApiError>({
    queryKey: ["category"],
    queryFn: async () => {
      return await apiGetRequest<CategoryResponseData>({
        url: "api/admin/category",
      });
    },
  });
};
