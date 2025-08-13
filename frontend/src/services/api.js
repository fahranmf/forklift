// services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      // optional: hindari loop kalau udah di /login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default API;
