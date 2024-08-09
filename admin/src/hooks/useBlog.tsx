import { ApiError, ApiGetResponse } from "../types/apiType";
import { BlogResponseData } from "../types/contentType";
import { apiGetRequest } from "../api/adminGetApi";
import { useQuery } from "@tanstack/react-query";

const useBlog = () => {
  return useQuery<ApiGetResponse<BlogResponseData>, ApiError>({
    queryKey: ["blog"],
    queryFn: async () => {
      return await apiGetRequest<BlogResponseData>({
        url: "api/blog",
      });
    },
  });
};

export default useBlog;
