import React, { useState } from 'react';
import { FaRegNewspaper } from 'react-icons/fa';

const borderColors = {
  'बिहार': 'border-blue-600',
  'झारखंड': 'border-green-600',
  'राजनीति': 'border-purple-600',
  'अपराध': 'border-red-600',
  'खेल': 'border-yellow-500',
};

const badgeColors = {
  'बिहार': 'bg-blue-100 text-blue-700',
  'झारखंड': 'bg-green-100 text-green-700',
  'राजनीति': 'bg-purple-100 text-purple-700',
  'अपराध': 'bg-red-100 text-red-700',
  'खेल': 'bg-yellow-100 text-yellow-700',
};

const CategoryNewsSection = ({ category, posts }) => {
  const [modalPost, setModalPost] = useState(null);
  // Filter posts for this category
  const categoryPosts = posts?.filter(post => post.category === category) || [];
  const borderColor = borderColors[category] || 'border-blue-600';
  const badgeColor = badgeColors[category] || 'bg-blue-100 text-blue-700';

  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <FaRegNewspaper className="text-3xl text-blue-500 drop-shadow" />
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-0 text-blue-700 drop-shadow-lg">
          {category} <span className="font-light text-gray-700">समाचार</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryPosts.length > 0 ? (
          categoryPosts.map((post, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-2xl shadow-xl border-l-8 ${borderColor} p-0 flex flex-col group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
              style={{ minHeight: 320 }}
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.heading}
                  className="w-full h-44 object-cover object-center rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className={`inline-block px-3 py-1 mb-2 rounded-full text-xs font-semibold shadow-sm ${badgeColor} tracking-wide`}>{category}</div>
                  <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 flex items-center gap-2">
                    <FaRegNewspaper className="inline text-blue-400 mr-1" />
                    {post.heading}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3 text-base leading-relaxed">{post.news}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-gray-500 italic">
                    {new Date(post.createdAt).toLocaleString('hi-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                  <button
                    className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-900 hover:scale-105 transition-all duration-200 text-sm"
                    onClick={() => setModalPost(post)}
                  >
                    पूरा पढ़ें
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 italic col-span-3">कोई समाचार नहीं मिला।</div>
        )}
      </div>

      {/* Modal Popup for full news */}
      {modalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6 relative animate-fadeIn max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold focus:outline-none"
              onClick={() => setModalPost(null)}
              aria-label="Close"
            >
              ×
            </button>
            {modalPost.image && (
              <img
                src={modalPost.image}
                alt={modalPost.heading}
                className="w-full h-56 object-cover rounded-xl mb-4"
              />
            )}
            <div className={`inline-block px-3 py-1 mb-2 rounded-full text-xs font-semibold shadow-sm ${badgeColor} tracking-wide`}>{category}</div>
            <h2 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">
              <FaRegNewspaper className="inline text-blue-400 mr-1" />
              {modalPost.heading}
            </h2>
            <div className="text-xs text-gray-500 italic mb-3">
              {new Date(modalPost.createdAt).toLocaleString('hi-IN', { dateStyle: 'medium', timeStyle: 'short' })}
            </div>
            <div className="text-gray-800 text-base leading-relaxed whitespace-pre-line mb-2">
              {modalPost.news}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryNewsSection; 