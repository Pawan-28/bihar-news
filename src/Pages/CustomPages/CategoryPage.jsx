import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaSearch, FaRegSadTear, FaSpinner } from 'react-icons/fa';
import { FiClock, FiCalendar, FiUser } from 'react-icons/fi';
import API_URL from "../api";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [networkError, setNetworkError] = useState(false);

  useEffect(() => {
    const fetchCategoryArticles = async () => {
      setLoading(true);
      setError(null);
      setNetworkError(false);
      
      try {
        // Convert category name to lowercase and replace spaces with hyphens
        const formattedCategory = categoryName.toLowerCase().replace(/\s+/g, '-');
        const response = await fetch(`${API_URL}/api/news/category/${formattedCategory}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          // Add timeout for the fetch request
          signal: AbortSignal.timeout(8000) // 8 seconds timeout
        });

        // Check if the request was aborted
        if (response.status === 0) {
          throw new Error('Request timed out or network error');
        }

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from server');
        }

        if (data.length === 0) {
          setError(`No articles found in the ${categoryName} category`);
        }

        setArticles(data.map(article => ({
          ...article,
          id: article._id || article.id || Math.random().toString(36).substr(2, 9),
          image: article.image || '/default-news.jpg',
          author: article.author || 'Anonymous',
          date: article.date || new Date().toLocaleDateString(),
          readTime: article.readTime || '5 min read',
          category: article.category || categoryName
        })));
      } catch (error) {
        console.error('Fetch error:', error);
        if (error.name === 'AbortError' || error.message.includes('network')) {
          setNetworkError(true);
          setError('Network error - Could not connect to server');
        } else {
          setError(error.message || 'Failed to load articles');
        }
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    // Add debounce to prevent rapid successive requests
    const timer = setTimeout(fetchCategoryArticles, 300);
    return () => clearTimeout(timer);
  }, [categoryName]);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setNetworkError(false);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  const filteredArticles = articles.filter(article => 
    (article.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (article.description?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading {categoryName} articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="text-red-500 text-5xl mb-4">
            {networkError ? '⚠️' : <FaRegSadTear className="inline-block" />}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {networkError ? 'Connection Error' : 'No Articles Found'}
          </h2>
          <p className="text-gray-600 mb-6">
            {networkError 
              ? 'Could not connect to the server. Please check your internet connection.'
              : error}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 capitalize">
          {categoryName} News
        </h1>
        <p className="text-lg text-gray-600">
          Latest updates and stories about {categoryName.toLowerCase()}
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 max-w-2xl mx-auto"
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={`Search ${categoryName} articles...`}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article, i) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
            onClick={() => navigate(`/news/${article.id}`)}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                onError={(e) => {
                  e.target.src = '/default-news.jpg';
                  e.target.onerror = null;
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {article.category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-xl mb-3 text-gray-900 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {article.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {filteredArticles.length === 0 && !loading && !error && (
        <div className="text-center py-12">
          <p className="text-gray-500">No articles match your search criteria.</p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;