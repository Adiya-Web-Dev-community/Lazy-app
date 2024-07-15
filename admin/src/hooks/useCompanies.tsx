import { useQuery } from "@tanstack/react-query";

import { ApiError, ApiGetResponse } from "../types/apiType";

import { CompanyResponseData } from "../types/contentType";
import { apiGetRequest } from "../api/adminGetApi";

const useCompanies = () => {
  return useQuery<ApiGetResponse<CompanyResponseData>, ApiError>({
    queryKey: ["company"],
    queryFn: async () => {
      return await apiGetRequest<CompanyResponseData>({
        url: "api/company",
      });
    },
  });
};

export default useCompanies;
