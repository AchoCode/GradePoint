import axios from "axios";
import { ACCESS_TOKEN , REFRESH_TOKEN} from "./constants";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  const RFToken = localStorage.getItem(REFRESH_TOKEN);
  if (!RFToken) {
    console.log("No refresh token found. User must log in again.");
    return null;
  }

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
      refresh: RFToken,
    });

    if (response.status === 200) {
      const newAccessToken = response.data.access;
      localStorage.setItem(ACCESS_TOKEN, newAccessToken);
      api.defaults.headers.Authorization = `Bearer ${newAccessToken}`; // Update axios default header
      return newAccessToken;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};

// Response Interceptor: Handle Token Expiry
api.interceptors.response.use(
  (response) => response, // If response is successful, return it
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to an expired token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop

      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // Retry the failed request
      }
    }

    return Promise.reject(error); // Reject other errors
  }
);

export default api;