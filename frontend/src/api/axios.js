import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "https://fliper-project-4.onrender.com",
  withCredentials: true,
});

export default axiosInstance;