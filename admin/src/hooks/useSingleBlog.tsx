import { ApiError, ApiGetResponse } from "../types/apiType";
import { useQuery } from "@tanstack/react-query";
import { BlogData } from "../types/contentType";
import { apiGetRequest } from "../api/adminGetApi";

const useSingleBlog = (id: string) => {
  return useQuery<ApiGetResponse<BlogData>, ApiError>({
    queryKey: ["blog", id],
    queryFn: async () => {
      return await apiGetRequest<BlogData>({
        url: `api/blog/${id}`,
      });
    },
  });
};

export default useSingleBlog;
