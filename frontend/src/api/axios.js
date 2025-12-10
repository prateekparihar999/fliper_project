// frontend/src/api/axios.js  (CRA)
import axios from 'axios';

// const DEFAULT_LOCAL = 'http://localhost:5000';
const baseURL = "https://fliper-project-4.onrender.com" || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

export default axiosInstance;