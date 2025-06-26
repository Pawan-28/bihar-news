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
                  {/* Share Buttons Row */}
                  <div className="flex items-center gap-3 mb-2 mt-1">
                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(post.heading + '\n' + window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="WhatsApp पर शेयर करें"
                      className="text-green-500 hover:bg-green-100 p-2 rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.77 0-3.5-.46-5.01-1.33l-.36-.21-3.69.96.99-3.59-.23-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.28.7.9.86 1.08.16.18.32.2.6.07.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-.97 2.43.03 1.43 1.03 2.81 1.18 3.01.15.2 2.03 3.1 4.93 4.23.69.3 1.23.48 1.65.61.69.22 1.32.19 1.81.12.55-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"/></svg>
                    </a>
                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(post.heading)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Facebook पर शेयर करें"
                      className="text-blue-600 hover:bg-blue-100 p-2 rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
                    </a>
                    {/* Gmail */}
                    <a
                      href={`mailto:?subject=${encodeURIComponent(post.heading)}&body=${encodeURIComponent(post.news + '\n' + window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Gmail से भेजें"
                      className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 13.065L2.4 6.6V18c0 1.104.896 2 2 2h15.2c1.104 0 2-.896 2-2V6.6l-9.6 6.465zm9.6-9.6H2.4c-1.104 0-2 .896-2 2v.8l11.6 7.8 11.6-7.8v-.8c0-1.104-.896-2-2-2z"/></svg>
                    </a>
                    {/* Instagram (just link to Instagram, as direct share is not supported) */}
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Instagram पर शेयर करें (कॉपी करें)"
                      className="text-pink-500 hover:bg-pink-100 p-2 rounded-full transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.567 5.782 2.295 7.148 2.233 8.414 2.175 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.771.128 4.659.334 3.678 1.315c-.98.98-1.187 2.092-1.245 3.373C2.012 5.668 2 6.077 2 12c0 5.923.012 6.332.07 7.612.058 1.281.265 2.393 1.245 3.373.98.98 2.092 1.187 3.373 1.245C8.332 23.988 8.741 24 12 24s3.668-.012 4.948-.07c1.281-.058 2.393-.265 3.373-1.245.98-.98 1.187-2.092 1.245-3.373.058-1.28.07-1.689.07-7.612 0-5.923-.012-6.332-.07-7.612-.058-1.281-.265-2.393-1.245-3.373-.98-.98-2.092-1.187-3.373-1.245C15.668.012 15.259 0 12 0zm0 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162A3.999 3.999 0 1 1 12 8a3.999 3.999 0 0 1 0 7.999zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>
                    </a>
                  </div>
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