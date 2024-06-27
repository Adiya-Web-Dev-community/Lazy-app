import axios from "axios";

const { VITE_BASE_URL } = import.meta.env;

const defaultOptions = {
  baseURL: `${VITE_BASE_URL}`, // your API base URL
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin");

    console.log("Token from localStorage:", token);

    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    // Handle error
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
