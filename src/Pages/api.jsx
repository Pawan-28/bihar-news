const API_CONFIG = {
    development: {
      baseUrl: 'http://localhost:5000'
    },
    production: {
      baseUrl: 'https://harshit-ke-kalam-se.onrender.com/'  // 🔁 yahi actual render URL daalo
    }
  };
  
  const API_URL = import.meta.env.MODE === 'production'
    ? API_CONFIG.production.baseUrl
    : API_CONFIG.development.baseUrl;
  
  export default API_URL;
  