import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:6500/";

const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await axios.post(`${API_URL}auth/refresh-token`, {
      refreshToken: refreshToken,
    });

    const newAccessToken = response.data.accessToken;

    if (!newAccessToken) {
      throw new Error("No access token in response");
    }

    Cookies.set("accessToken", newAccessToken, {
      expires: 1,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return newAccessToken;
  } catch (error) {
    console.error("Refresh token failed:", error);
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("phone");
    Cookies.remove("user");
    throw error;
  }
};

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

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("phone");
        Cookies.remove("user");

        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }

        return Promise.reject(refreshError);
      }
    }

    if (error.response?.status === 401 && typeof window !== "undefined") {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("phone");
      Cookies.remove("user");
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
