// Utility function to update meta tags for social media sharing
export const updateMetaTags = (article) => {
  if (!article) return;

  const baseUrl = 'https://harshit-ka-kalam-se.netlify.app';
  const articleUrl = `${baseUrl}/article/${article.id}`;
  
  // Default fallback values
  const title = article.title || 'हर्षित के कलम से - ताज़ा समाचार';
  const description = article.content || article.description || 'बिहार और झारखंड की ताज़ा खबरें, राजनीति, अपराध, खेल और अन्य महत्वपूर्ण समाचार।';
  const imageUrl = article.image || article.imageUrl || `${baseUrl}/favicon.png`;
  
  // Update Open Graph meta tags
  updateMetaTag('og:title', title);
  updateMetaTag('og:description', description);
  updateMetaTag('og:image', imageUrl);
  updateMetaTag('og:url', articleUrl);
  updateMetaTag('og:type', 'article');
  
  // Update Twitter Card meta tags
  updateMetaTag('twitter:title', title);
  updateMetaTag('twitter:description', description);
  updateMetaTag('twitter:image', imageUrl);
  
  // Update page title
  document.title = title;
  
  // Update canonical URL
  updateMetaTag('canonical', articleUrl);
};

// Helper function to update or create meta tags
const updateMetaTag = (property, content) => {
  let meta = document.querySelector(`meta[property="${property}"]`) || 
             document.querySelector(`meta[name="${property}"]`) ||
             document.querySelector(`link[rel="${property}"]`);
  
  if (meta) {
    if (meta.tagName === 'LINK') {
      meta.href = content;
    } else {
      meta.content = content;
    }
  } else {
    // Create new meta tag
    meta = document.createElement('meta');
    if (property.startsWith('og:')) {
      meta.setAttribute('property', property);
    } else if (property === 'canonical') {
      meta = document.createElement('link');
      meta.setAttribute('rel', 'canonical');
      meta.setAttribute('href', content);
      document.head.appendChild(meta);
      return;
    } else {
      meta.setAttribute('name', property);
    }
    meta.setAttribute('content', content);
    document.head.appendChild(meta);
  }
};

// Function to reset meta tags to default values
export const resetMetaTags = () => {
  const baseUrl = 'https://harshit-ka-kalam-se.netlify.app';
  
  updateMetaTag('og:title', 'हर्षित के कलम से - ताज़ा समाचार और विश्लेषण');
  updateMetaTag('og:description', 'बिहार और झारखंड की ताज़ा खबरें, राजनीति, अपराध, खेल और अन्य महत्वपूर्ण समाचार। हर्षित के कलम से सटीक और विश्वसनीय जानकारी।');
  updateMetaTag('og:image', `${baseUrl}/favicon.png`);
  updateMetaTag('og:url', baseUrl);
  updateMetaTag('og:type', 'website');
  
  updateMetaTag('twitter:title', 'हर्षित के कलम से - ताज़ा समाचार और विश्लेषण');
  updateMetaTag('twitter:description', 'बिहार और झारखंड की ताज़ा खबरें, राजनीति, अपराध, खेल और अन्य महत्वपूर्ण समाचार।');
  updateMetaTag('twitter:image', `${baseUrl}/favicon.png`);
  
  document.title = 'हर्षित के कलम से - ताज़ा समाचार और विश्लेषण';
  updateMetaTag('canonical', baseUrl);
}; 