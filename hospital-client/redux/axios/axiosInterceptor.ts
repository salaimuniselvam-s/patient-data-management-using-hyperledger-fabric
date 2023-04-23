import axios from "axios";
import {
  getAuthCookies,
  getUserDetails,
  removeAuthCookies,
  removeUserDetails,
  setAuthCookies,
} from "../utils/cookies";
import { API_BASE_URL } from "@/constants/constants";

// Function to refresh the access token
const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/refreshToken`,
      {
        token: getAuthCookies().refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
          role: getUserDetails().role,
          username: getUserDetails().username,
        },
      }
    );
    const { accessToken } = response.data;
    setAuthCookies({
      accessToken,
      refreshToken: getAuthCookies().refreshToken || "",
    });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

// Create a new Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthCookies().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.role = getUserDetails().role;
      config.headers.username = getUserDetails().username;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return axiosInstance(originalRequest);
      } catch (error) {
        window.location.href = "/";
        console.error(error, "error");
        removeAuthCookies();
        removeUserDetails();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
