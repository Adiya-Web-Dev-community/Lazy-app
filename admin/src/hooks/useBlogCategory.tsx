import { useQuery } from "@tanstack/react-query";
import { ApiError, ApiGetResponse } from "../types/apiType";
import { CategoryGetData } from "../types/contentType";
import { apiGetRequest } from "../api/adminGetApi";

const useBlogCategory = () => {
  return useQuery<ApiGetResponse<CategoryGetData[]>, ApiError>({
    queryKey: ["blog-category"],
    queryFn: async () => {
      return await apiGetRequest<CategoryGetData[]>({
        url: "api/blog/all/category",
      });
    },
  });
};

export default useBlogCategory;
