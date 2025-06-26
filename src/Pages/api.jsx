const API_CONFIG = {
    development: {
 HEAD
      baseUrl: 'https://harshit-backend-18mr.onrender.com'
      baseUrl: 'http://localhost:5000'
 0fc40f8 (hi)
    },
    production: {
      baseUrl: 'https://harshit-ke-kalam-se.onrender.com/'  // 🔁 yahi actual render URL daalo
    }
  };
  
  const API_URL = import.meta.env.MODE === 'production'
    ? API_CONFIG.production.baseUrl
    : API_CONFIG.development.baseUrl;
  
  export default API_URL;
  