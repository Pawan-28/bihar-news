// Utility function to test and debug meta tags
export const testMetaTags = (article) => {
  console.log('=== Testing Meta Tags ===');
  console.log('Article:', article);
  
  // Check if all required meta tags are present
  const requiredTags = [
    'og:title',
    'og:description', 
    'og:image',
    'og:url',
    'twitter:title',
    'twitter:description',
    'twitter:image'
  ];
  
  requiredTags.forEach(tag => {
    const meta = document.querySelector(`meta[property="${tag}"]`) || 
                 document.querySelector(`meta[name="${tag}"]`);
    if (meta) {
      console.log(`✅ ${tag}:`, meta.content);
    } else {
      console.log(`❌ ${tag}: Missing`);
    }
  });
  
  // Test image URL accessibility
  if (article?.image) {
    const img = new Image();
    img.onload = () => {
      console.log('✅ Image loads successfully:', article.image);
    };
    img.onerror = () => {
      console.log('❌ Image failed to load:', article.image);
    };
    img.src = article.image;
  }
  
  // Log current page title
  console.log('Page Title:', document.title);
  
  // Test WhatsApp sharing URL
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(article?.title || 'Check out this article')}%20${encodeURIComponent(window.location.href)}`;
  console.log('WhatsApp Share URL:', whatsappUrl);
  
  console.log('=== End Meta Tags Test ===');
};

// Function to validate image URL format
export const validateImageUrl = (imageUrl) => {
  if (!imageUrl) return false;
  
  // Check if it's a valid URL
  try {
    const url = new URL(imageUrl);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    // If it's a relative URL, it should start with /
    return imageUrl.startsWith('/') || imageUrl.startsWith('./');
  }
};

// Function to ensure image URL is absolute
export const makeImageUrlAbsolute = (imageUrl, baseUrl = 'https://harshit-ka-kalam-se.netlify.app') => {
  if (!imageUrl) return `${baseUrl}/news.png`;
  
  // If it's already an absolute URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's a relative URL, make it absolute
  if (imageUrl.startsWith('/')) {
    return `${baseUrl}${imageUrl}`;
  }
  
  // If it doesn't start with /, add it
  return `${baseUrl}/${imageUrl}`;
}; 