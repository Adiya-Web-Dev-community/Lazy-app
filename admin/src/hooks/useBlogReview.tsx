import { ApiError, ApiGetResponse } from "../types/apiType";
import { BlogResponseGetType } from "../types/contentType";
import { apiGetRequest } from "../api/adminGetApi";
import { useQuery } from "@tanstack/react-query";

const useBlogReview = () => {
  return useQuery<ApiGetResponse<BlogResponseGetType>, ApiError>({
    queryKey: ["blogReview"],
    queryFn: async () => {
      return await apiGetRequest<BlogResponseGetType>({
        url: "api/blog/review",
      });
    },
  });
};

export default useBlogReview;
