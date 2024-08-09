import { apiGetRequest } from "../api/adminGetApi";
import { ApiError, ApiGetResponse } from "../types/apiType";
import { useQuery } from "@tanstack/react-query";
import { InfoGuidGetType } from "../types/contentType";

const useInfoGuide = () => {
  return useQuery<ApiGetResponse<InfoGuidGetType[]>, ApiError>({
    queryKey: ["infoGuide"],
    queryFn: async () => {
      return await apiGetRequest<InfoGuidGetType[]>({
        url: "api/infoguide",
      });
    },
  });
};

export default useInfoGuide;
