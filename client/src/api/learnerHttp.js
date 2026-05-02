import axios from "axios";

const learnerHttp = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

learnerHttp.interceptors.request.use((config) => {
  const token = localStorage.getItem("c2c_user_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default learnerHttp;

