import { ProductData } from "../types/contentType";
import { ApiError, ApiGetResponse } from "../types/apiType";

import { useQuery } from "@tanstack/react-query";
import { apiGetRequest } from "../api/adminGetApi";

const useProduct = () => {
  return useQuery<ApiGetResponse<ProductData[]>, ApiError>({
    queryKey: ["product"],
    queryFn: async () => {
      return await apiGetRequest<ProductData[]>({
        url: "api/product",
      });
    },
  });
};

export default useProduct;
