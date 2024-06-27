// src/api/userApi.ts
import { ApiError, ApiResponse } from "../types/apiType";
import axiosInstance from "./axiosInstance";

interface ApiRequestConfig<T> {
  url: string;
  method: "get" | "post" | "put" | "delete";
  data?: T;
}

export const apiRequest = async <T>({
  url,
  method,
  data,
}: ApiRequestConfig<T>): Promise<ApiResponse<T>> => {
  try {
    const config = {
      url,
      method,
      ...(data && { data }), // Conditionally include data only if it is provided
    };

    console.log(config, "from post/put category");

    const response = await axiosInstance(config);
    return response as ApiResponse<T>;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred";
    const status = error.response?.status;
    throw { message: errorMessage, status } as ApiError;
  }
};
