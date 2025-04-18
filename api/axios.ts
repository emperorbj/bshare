// api/axios.js
import axios from 'axios';

const BASE_URL = 'https://booksharedb.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add token to requests
// api.interceptors.request.use(async (config) => {
//   const token = await SecureStore.getItemAsync('authToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;