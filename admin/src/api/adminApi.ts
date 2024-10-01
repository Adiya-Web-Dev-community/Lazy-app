// src/api/userApi.ts
import { ApiError, ApiResponse } from "../types/apiType";
import axiosInstance from "./axiosInstance";

interface ApiRequestConfig<TRequest> {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  data?: TRequest;
}

export const apiRequest = async <TRequest, TResponse>({
  url,
  method,
  data,
}: ApiRequestConfig<TRequest>): Promise<ApiResponse<TResponse>> => {
  try {
    const config = {
      url,
      method,
      ...(data && { data }), // Conditionally include data only if it is provided
    };

    const response = await axiosInstance(config);

    console.log(config, "from post/put category");
    console.log(response, "Response from apis");
    return response.data;
  } catch (error) {
    const errorMessage = (error as ApiError).message || "An error occurred";
    const status = (error as ApiError)?.status;
    throw { message: errorMessage, status } as ApiError;
  }
};
