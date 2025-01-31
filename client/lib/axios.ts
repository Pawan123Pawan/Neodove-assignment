"use client";
import axios from "axios";
import { LocalStorageHandler } from "./utils";

export const LOCAL_URL = "http://127.0.0.1:5000/api/v1";
export const REMOTE_SERVER_URL = "https://synctalk.onrender.com/api/v1";
const axiosInstance = axios.create({
  baseURL: REMOTE_SERVER_URL, // TODO Replace with your API base URL
  timeout: 60000, // Timeout after 60 seconds
  headers: {
    "Content-Type": "application/json",
    // Add any other headers you need
  },
});

// Add a request interceptor to include the auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const user = LocalStorageHandler.getUserToken()
      ? LocalStorageHandler.getUserToken()
      : null;
    if (user) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Modify response data here (e.g., parse JSON response)
    return response;
  },
  (error) => {
    // Handle response errors (e.g., unauthorized access)
    return Promise.reject(error);
  }
);

export default axiosInstance;
