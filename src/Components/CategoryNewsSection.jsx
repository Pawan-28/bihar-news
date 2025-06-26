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
          categoryPosts.map((post, idx) => {
            const shortDesc = post.news ? post.news.slice(0, 120) + '...' : '';
            const newsUrl = `${window.location.origin}/news/${post._id || ''}`;
            return (
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
                    {/* Share Buttons Row - Custom SVGs */}
                    <div className="flex gap-4 mb-2 mt-1">
                      {/* WhatsApp */}
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(post.heading + '\n' + shortDesc + '\n' + newsUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white ring-2 ring-green-500 rounded-full shadow-md p-2 hover:scale-110 transition"
                        title="WhatsApp पर शेयर करें"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-7 h-7 text-green-600" viewBox="0 0 24 24">
                          <path d="M20.52 3.48A11.86 11.86 0 0012 0a11.86 11.86 0 00-8.52 3.48A11.86 11.86 0 000 12a11.77 11.77 0 001.56 5.91L0 24l6.27-1.64A11.86 11.86 0 0012 24a11.86 11.86 0 008.52-3.48A11.86 11.86 0 0024 12a11.86 11.86 0 00-3.48-8.52zM12 22a9.93 9.93 0 01-5.07-1.39l-.36-.22-3.73 1 1-3.64-.24-.38A9.92 9.92 0 012 12a10 10 0 012.93-7.07A10 10 0 0112 2a10 10 0 017.07 2.93A10 10 0 0122 12a10 10 0 01-2.93 7.07A10 10 0 0112 22zm5.26-7.11c-.29-.14-1.72-.85-1.99-.94s-.47-.14-.67.14-.76.94-.94 1.13-.35.21-.64.07a8.09 8.09 0 01-2.36-1.45 8.89 8.89 0 01-1.66-2.06c-.17-.29 0-.44.13-.58s.29-.35.43-.52.19-.29.29-.48a.55.55 0 00-.03-.52c-.08-.14-.67-1.61-.92-2.2s-.49-.51-.67-.52H8c-.17 0-.44.06-.67.29a2.82 2.82 0 00-.88 2.1 4.9 4.9 0 001.03 2.52 11.09 11.09 0 004.14 3.85A13.6 13.6 0 0014.73 17c.61-.08 1.19-.42 1.34-.83s.17-.77.13-.85-.13-.13-.27-.21z"/>
                        </svg>
                      </a>
                      {/* Instagram */}
                      <a
                        href="https://instagram.com/yourid"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white ring-2 ring-pink-500 rounded-full shadow-md p-2 hover:scale-110 transition"
                        title="Instagram पर शेयर करें"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-7 h-7 text-pink-500" viewBox="0 0 24 24">
                          <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.5-.25a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z"/>
                        </svg>
                      </a>
                      {/* Facebook */}
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(newsUrl)}&quote=${encodeURIComponent(post.heading + '\n' + shortDesc)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white ring-2 ring-blue-600 rounded-full shadow-md p-2 hover:scale-110 transition"
                        title="Facebook पर शेयर करें"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-7 h-7 text-blue-700" viewBox="0 0 24 24">
                          <path d="M22.675 0h-21.35C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.733 0 1.326-.593 1.326-1.326V1.326C24 .593 23.407 0 22.675 0z"/>
                        </svg>
                      </a>
                      {/* Gmail */}
                      <a
                        href={`mailto:?subject=${encodeURIComponent(post.heading)}&body=${encodeURIComponent(shortDesc + '\n' + newsUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white ring-2 ring-red-500 rounded-full shadow-md p-2 hover:scale-110 transition"
                        title="Gmail से भेजें"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-7 h-7 text-red-600" viewBox="0 0 24 24">
                          <path d="M20 4H4C2.897 4 2 4.897 2 6v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 5.333-8-5.333V6h16zM4 18V8.489l7.445 4.963a1 1 0 001.11 0L20 8.489V18H4z"/>
                        </svg>
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
            );
          })
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