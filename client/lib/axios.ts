import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: __DEV__ ? "http://192.168.1.11:3000" : "https://your-production-api.com",
  withCredentials: true,
});
