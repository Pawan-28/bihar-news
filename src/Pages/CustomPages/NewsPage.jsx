import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NewsPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://harshit-backend-18mr.onrender.com/api/content/public')
      .then(res => res.json())
      .then(data => {
        const found = data.newsPosts?.find(a => a._id === id);
        if (found) setArticle(found);
        else setError('Article not found');
      })
      .catch(() => setError('Server error'));
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>Loading...</div>;

  const newsUrl = `${window.location.origin}/news/${id}`;
  const shortDescription = article.news ? article.news.slice(0, 160) + '...' : '';
  
  // Ensure image URL is absolute
  const imageUrl = article.image && article.image.startsWith('http') 
    ? article.image 
    : `${window.location.origin}${article.image}`;

  console.log('NewsPage Meta Tags:', {
    title: article.heading,
    description: shortDescription,
    image: imageUrl,
    url: newsUrl
  });

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{article.heading} - हर्षित के कलम से</title>
        <meta name="description" content={shortDescription} />
        
        {/* Open Graph Meta Tags for Facebook, WhatsApp, etc. */}
        <meta property="og:title" content={article.heading} />
        <meta property="og:description" content={shortDescription} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:url" content={newsUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="हर्षित के कलम से" />
        <meta property="og:locale" content="hi_IN" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.heading} />
        <meta name="twitter:description" content={shortDescription} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:site" content="@harshitkakalam" />
        
        {/* Additional Meta Tags */}
        <meta name="author" content="हर्षित के कलम से" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={newsUrl} />
        
        {/* WhatsApp specific meta tags */}
        <meta property="og:image:secure_url" content={imageUrl} />
        <meta property="og:image:alt" content={article.heading} />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {article.image && (
              <img 
                src={article.image} 
                alt={article.heading} 
                className="w-full h-96 object-cover"
              />
            )}
            <div className="p-8">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {article.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {article.heading}
              </h1>
              <div className="text-sm text-gray-500 mb-6">
                {new Date(article.createdAt).toLocaleString('hi-IN', { 
                  dateStyle: 'full', 
                  timeStyle: 'short' 
                })}
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {article.news}
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default NewsPage;