import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaRegSadTear, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, items } = location.state || { title: '', items: [] };
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredItems, setFilteredItems] = React.useState(items || []);

  React.useEffect(() => {
    if (items) {
      const filtered = items.filter(item => 
        (item.title || item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description || item.subtitle || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, items]);

  const handleCardClick = (item) => {
    if (item._id) {
      navigate(`/news/${item._id}`);
    }
  };

  if (!location.state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="text-red-500 text-5xl mb-4">
            <FaRegSadTear className="inline-block" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Missing Data</h2>
          <p className="text-gray-600 mb-6">
            We couldn't find the section data. Please navigate from the main page.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h1>
          
          {/* Search Bar */}
          <div className="relative max-w-lg mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Content Grid */}
        {filteredItems.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer group"
                onClick={() => handleCardClick(item)}
              >
                {/* Image Section */}
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={item.image || '/default-news.jpg'} 
                    alt={item.title || item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = '/default-news.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent p-4 flex flex-col justify-end">
                    {item.category && (
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium self-start mb-2">
                        {item.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title || item.name}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {item.description || item.subtitle || ''}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
                    {item.date && (
                      <span className="flex items-center">
                        {item.date}
                      </span>
                    )}
                    {item.readTime && (
                      <span className="flex items-center">
                        {item.readTime}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-5xl mb-4">
              <FaRegSadTear className="inline-block" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              {searchQuery ? 'No matching items found' : 'No items available'}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {searchQuery 
                ? `We couldn't find any items matching "${searchQuery}"`
                : `There are currently no items in this section.`}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionPage;