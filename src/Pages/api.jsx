import axios from 'axios';

const API_CONFIG = {
    development: {
      baseUrl: 'https://harshit-backend-18mr.onrender.com'
    },
    production: {
      baseUrl: 'https://harshit-ke-kalam-se.onrender.com/'  // 🔁 yahi actual render URL daalo
    }
  };
  
  const API_URL = import.meta.env.MODE === 'production'
    ? API_CONFIG.production.baseUrl
    : API_CONFIG.development.baseUrl;
  
  const api = axios.create({
    baseURL: API_URL
  });

  export default api;
  