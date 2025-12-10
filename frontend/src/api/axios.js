// src/api.js
import axios from 'axios';

const DEFAULT_LOCAL = 'http://localhost:5000';
const baseURL = process.env.REACT_APP_API_URL || DEFAULT_LOCAL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

export default axiosInstance;
