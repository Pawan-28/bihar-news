const API_CONFIG = {
    development: {
      baseUrl: 'https://harshit-backend-18mr.onrender.com/api', // local backend
    },
    production: {
      baseUrl: 'https://harshit-backend-18mr.onrender.com/api', // deployed backend
    },
  };
  
  const API_URL =
    process.env.NODE_ENV === 'production'
      ? API_CONFIG.production.baseUrl
      : API_CONFIG.development.baseUrl;
  
  export const API_ENDPOINTS = {
    getAllPosts: `${API_URL}/posts`,
    createPost: `${API_URL}/posts`,
    // Add more endpoints here based on your project
  };
  
  export default API_URL;
  