import axios from 'axios';

// Connect to your local backend (or cloud URL later)
const API = axios.create({
  baseURL: 'https://hcltech-healthcare-oyya.vercel.app/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Add Token to every request if it exists
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;