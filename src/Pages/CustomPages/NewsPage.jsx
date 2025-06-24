import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaClock, FaArrowLeft, FaShareAlt, FaBookmark, FaRegBookmark, FaHeart, FaRegHeart } from 'react-icons/fa';
import { FiMessageSquare } from 'react-icons/fi';
import API_URL from "../api";

const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await fetch(`${API_URL}/api/customization`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data;
        try {
          data = await response.json();
        } catch (jsonError) {
          console.error('JSON parse error:', jsonError);
          throw new Error('Invalid server response');
        }

        if (!data) {
          throw new Error('No data received from API');
        }

        // Combine all articles with proper null checks
        const allArticles = [
          ...(Array.isArray(data.latestNewsArticles) ? data.latestNewsArticles : []),
          ...(Array.isArray(data.featuredArticles) ? data.featuredArticles : []),
          ...(Array.isArray(data.localNewsArticles) ? data.localNewsArticles : [])
        ].filter(Boolean);

        // Find article with proper ID matching
        const found = allArticles.find(a => {
          const articleId = a._id || a.id;
          return articleId && articleId.toString() === id.toString();
        });

        if (found) {
          // Set default values for missing fields
          const cleanedArticle = {
            ...found,
            title: found.title || 'Untitled Article',
            description: found.description || found.content || 'No content available',
            image: found.image || '/default-news.jpg',
            author: found.author || 'Anonymous',
            date: found.date || new Date().toLocaleDateString(),
            readTime: found.readTime || '5 min read',
            category: found.category || 'General',
            likes: typeof found.likes === 'number' ? found.likes : 0,
            comments: typeof found.comments === 'number' ? found.comments : 0
          };
          
          setArticle(cleanedArticle);
          setLikeCount(cleanedArticle.likes);
        } else {
          throw new Error('Article not found');
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article?.title || 'Check out this article';
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        break;
      default:
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    }
    setShowShareOptions(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Article</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Home Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="text-gray-500 text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Article Not Found</h2>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or may have been removed.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Articles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to News
        </button>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 pb-16 max-w-4xl">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
          {/* Article Image */}
          <div className="relative h-80 md:h-96 overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = '/default-news.jpg';
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                {article.category}
              </span>
            </div>
          </div>

          {/* Article Body */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <FaUser className="text-blue-600" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-600" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-blue-600" />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-10 text-gray-700">
              <p className="text-xl leading-relaxed mb-6 text-gray-800">
                {article.description.split('\n')[0]}
              </p>
              {article.description.split('\n').slice(1).map((paragraph, i) => (
                <p key={i} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Article Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mb-10">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Article Actions */}
            <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 ${isLiked ? 'text-red-600' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                >
                  {isLiked ? <FaHeart /> : <FaRegHeart />}
                  <span>{likeCount} Likes</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
                  <FiMessageSquare />
                  <span>{article.comments} Comments</span>
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleSave}
                  className={`p-2 rounded-full ${isSaved ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                >
                  {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                </button>
                
                <div className="relative">
                  <button 
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    <FaShareAlt />
                  </button>
                  
                  {showShareOptions && (
                    <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-lg shadow-lg p-2 z-10">
                      <button 
                        onClick={() => handleShare('twitter')}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md flex items-center gap-2"
                      >
                        <span className="text-blue-400">Twitter</span>
                      </button>
                      <button 
                        onClick={() => handleShare('facebook')}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md flex items-center gap-2"
                      >
                        <span className="text-blue-600">Facebook</span>
                      </button>
                      <button 
                        onClick={() => handleShare('linkedin')}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md flex items-center gap-2"
                      >
                        <span className="text-blue-700">LinkedIn</span>
                      </button>
                      <button 
                        onClick={() => handleShare('copy')}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md flex items-center gap-2"
                      >
                        <span>Copy Link</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsPage;