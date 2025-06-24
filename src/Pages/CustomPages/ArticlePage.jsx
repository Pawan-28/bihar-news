import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../api";

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_URL}/api/customization`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data) {
          throw new Error('No data received from API');
        }

        // Combine all articles arrays with null checks
        const allArticles = [
          ...(Array.isArray(data.latestNewsArticles) ? data.latestNewsArticles : []),
          ...(Array.isArray(data.localNewsArticles) ? data.localNewsArticles : [])
        ].filter(Boolean); // Remove any null/undefined entries

        // Find article by id with proper type checking
        const found = allArticles.find(a => {
          const articleId = a.id || a._id;
          return articleId && String(articleId) === String(id);
        });

        if (found) {
          // Clean up the article data with fallbacks
          const cleanedArticle = {
            ...found,
            id: found.id || found._id || id,
            title: found.title || "Untitled Article",
            content: found.content || found.description || "No content available",
            tags: Array.isArray(found.tags) ? found.tags : [],
            likes: typeof found.likes === 'number' ? found.likes : 0,
            comments: typeof found.comments === 'number' ? found.comments : 0,
            authorImage: found.authorImage || found.image || '/default-author.jpg',
            authorTitle: found.authorTitle || 'Staff Writer',
            author: found.author || 'Anonymous',
            date: found.date || new Date().toLocaleDateString(),
            readTime: found.readTime || '5 min read',
            category: found.category || 'General'
          };

          setArticle(cleanedArticle);
          setLikeCount(cleanedArticle.likes);
          
          // Get related articles with proper filtering
          const related = allArticles
            .filter(a => {
              const articleId = a.id || a._id;
              return a && 
                a.category === found.category && 
                articleId && 
                String(articleId) !== String(found.id || found._id);
            })
            .map(a => ({
              ...a,
              id: a.id || a._id,
              title: a.title || "Untitled Article",
              content: a.content || a.description || "",
              image: a.image || '/default-article.jpg',
              date: a.date || new Date().toLocaleDateString(),
              readTime: a.readTime || '5 min read'
            }))
            .slice(0, 3);
          
          setRelatedArticles(related);
        } else {
          throw new Error('Article not found');
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id, navigate]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Article</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => navigate(-1)} 
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="text-gray-500 text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Article Not Found</h2>
          <p className="text-gray-600 mb-6">The requested article could not be found.</p>
          <button 
            onClick={() => navigate('/')} 
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Browse Articles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Header */}
      <header className="relative bg-gradient-to-r from-red-700 to-red-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <div className="container mx-auto px-4 py-24 max-w-5xl relative z-10">
          <div className="max-w-3xl">
            <button 
              onClick={() => navigate(-1)} 
              className="flex items-center text-white/90 hover:text-white mb-8 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Articles
            </button>

            <span className="inline-block px-4 py-1.5 text-sm font-semibold bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight tracking-tight">
              {article.title}
            </h1>
            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-2xl">
              {article.content.split(/\s+/).slice(0, 25).join(' ')}...
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-white/90">
              <div className="flex items-center">
                <img
                  src={article.authorImage}
                  alt={article.author}
                  className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-white/30"
                  onError={(e) => {
                    e.target.src = '/default-author.jpg';
                  }}
                />
                <div>
                  <div className="font-semibold text-white">{article.author}</div>
                  <div className="text-white/70">{article.authorTitle}</div>
                </div>
              </div>
              
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {article.readTime}
              </div>
              
              <div className="flex items-center bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {article.date}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
          {article.image && (
            <div className="relative h-80 md:h-96 overflow-hidden">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/default-article.jpg';
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
          )}
          
          <div className="p-6 md:p-10">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Topics</h3>
                <div className="flex flex-wrap gap-3">
                  {article.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={handleLike}
                  className={`flex items-center space-x-2 ${isLiked ? 'text-red-600' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                >
                  <svg 
                    className="w-6 h-6" 
                    fill={isLiked ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{likeCount} Likes</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{article.comments} Comments</span>
                </button>
                
                <button 
                  onClick={handleSave}
                  className={`flex items-center space-x-2 ${isSaved ? 'text-red-600' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                >
                  <svg 
                    className="w-6 h-6" 
                    fill={isSaved ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 font-medium">Share:</span>
                {[
                  {name: 'facebook', color: 'bg-blue-600 hover:bg-blue-700'},
                  {name: 'twitter', color: 'bg-blue-400 hover:bg-blue-500'},
                  {name: 'linkedin', color: 'bg-blue-700 hover:bg-blue-800'}
                ].map((platform) => (
                  <button 
                    key={platform.name} 
                    className={`p-2 rounded-full text-white ${platform.color} transition-colors`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-10 text-gray-900 relative pb-4 after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-red-600">
              Related Articles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((related) => (
                <div 
                  key={related.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => navigate(`/article/${related.id}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = '/default-article.jpg';
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {related.category || 'News'}
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {related.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {related.content.split(/\s+/).slice(0, 20).join(' ')}...
                    </p>
                    
                    <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 pt-4">
                      <span>{related.date}</span>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {related.readTime}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlePage;