import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ApiError, ApiResponse } from "../types/apiType";
import { RestaurantData, RestaurantResponseData } from "../types/contentType";
import { apiRequest } from "../api/adminApi";

const useCompanies = () => {
  return useQuery<ApiResponse<RestaurantResponseData>, ApiError>({
    queryKey: ["company"],
    queryFn: async () => {
      return await apiRequest<RestaurantResponseData>({
        url: "api/company",
        method: "get",
      });
    },
  });
};

export default useCompanies;
