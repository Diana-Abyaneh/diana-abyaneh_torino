import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:6500/";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    
    console.log('Making API Request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      fullURL: config.baseURL + config.url,
      data: config.data
    });

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      data: error.response?.data
    });
    
    if (error.response?.status === 401 && typeof window !== "undefined") {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;