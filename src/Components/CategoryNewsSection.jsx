import React, { useState } from 'react';
import { FaRegNewspaper } from 'react-icons/fa';

// Gradient backgrounds for each category
const categoryGradients = {
  'बिहार': 'bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200',
  'झारखंड': 'bg-gradient-to-br from-green-100 via-green-50 to-green-200',
  'राजनीति': 'bg-gradient-to-br from-purple-100 via-purple-50 to-purple-200',
  'अपराध': 'bg-gradient-to-br from-red-100 via-red-50 to-red-200',
  'खेल': 'bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-200',
};

// Heading gradient text for each category
const headingGradients = {
  'बिहार': 'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 text-transparent bg-clip-text drop-shadow',
  'झारखंड': 'bg-gradient-to-r from-green-700 via-green-500 to-green-700 text-transparent bg-clip-text drop-shadow',
  'राजनीति': 'bg-gradient-to-r from-purple-700 via-purple-500 to-purple-700 text-transparent bg-clip-text drop-shadow',
  'अपराध': 'bg-gradient-to-r from-red-700 via-red-500 to-red-700 text-transparent bg-clip-text drop-shadow',
  'खेल': 'bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 text-transparent bg-clip-text drop-shadow',
};

const badgeColors = {
  'बिहार': 'bg-blue-200 text-blue-800',
  'झारखंड': 'bg-green-200 text-green-800',
  'राजनीति': 'bg-purple-200 text-purple-800',
  'अपराध': 'bg-red-200 text-red-800',
  'खेल': 'bg-yellow-200 text-yellow-800',
};

const buttonGradients = {
  'बिहार': 'bg-gradient-to-r from-blue-500 to-blue-700',
  'झारखंड': 'bg-gradient-to-r from-green-500 to-green-700',
  'राजनीति': 'bg-gradient-to-r from-purple-500 to-purple-700',
  'अपराध': 'bg-gradient-to-r from-red-500 to-red-700',
  'खेल': 'bg-gradient-to-r from-yellow-400 to-yellow-600',
};

const CategoryNewsSection = ({ category, posts }) => {
  const [modalPost, setModalPost] = useState(null);
  
  // Filter posts for this category
  const categoryPosts = posts?.filter(post => post.category === category) || [];
  const cardBg = categoryGradients[category] || 'bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200';
  const headingGradient = headingGradients[category] || 'bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 text-transparent bg-clip-text';
  const badgeColor = badgeColors[category] || 'bg-blue-200 text-blue-800';
  const buttonGradient = buttonGradients[category] || 'bg-gradient-to-r from-blue-500 to-blue-700';

  return (
    <div className="mb-16">
      {/* Section Heading Box */}
      <div className={`mb-8 flex justify-center`}>
        <div className={`px-8 py-3 rounded-2xl shadow-lg ${cardBg} border border-white/60`}> 
          <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${headingGradient} mb-0`} style={{textShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
            {category} <span className="font-light text-gray-700">समाचार</span>
          </h2>
        </div>
      </div>
      {/* News Cards */}
      <div className="flex flex-col gap-8">
        {categoryPosts.length > 0 ? (
          categoryPosts.map((post, idx) => {
            const shortDesc = post.news ? post.news.slice(0, 120) + '...' : '';
            const newsUrl = `https://harshit-ka-kalam-se.netlify.app/news/${post._id || ''}`;
            return (
              <div
                key={idx}
                className={`relative ${cardBg} rounded-3xl shadow-xl flex flex-col md:flex-row group hover:shadow-2xl hover:scale-[1.015] transition-all duration-300 overflow-hidden border border-white/70`}
                style={{ minHeight: 220 }}
              >
                {/* Image Left */}
                {post.image && (
                  <div className="md:w-3/4 w-full flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.heading}
                      className="w-full h-56 md:h-full object-cover object-center md:rounded-l-3xl md:rounded-tr-none rounded-t-3xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                {/* Content Right */}
                <div className="flex flex-col justify-between p-6 md:w-1/4 w-full">
                  <div>
                    <div className={`inline-block px-3 py-1 mb-2 rounded-full text-xs font-semibold shadow-sm ${badgeColor} tracking-wide`}>{category}</div>
                    <h3 className={`font-bold text-2xl mb-2 ${headingGradient} leading-tight`} style={{textShadow:'0 2px 8px rgba(0,0,0,0.10)'}}>
                      {post.heading}
                    </h3>
                    {/* News Content (Scrollable if long) */}
                    <div className="text-gray-700 mb-4 text-base leading-relaxed max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                      {post.news}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="text-xs text-gray-500 italic">
                      {new Date(post.createdAt).toLocaleDateString('hi-IN', { dateStyle: 'medium' })}<br/>
                      <span className="text-[11px]">{new Date(post.createdAt).toLocaleTimeString('hi-IN', { timeStyle: 'short' })}</span>
                    </div>
                    {/* Share Buttons Row - WhatsApp, Facebook, Instagram, X */}
                    <div className="flex gap-3 mt-3 w-full">
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
                      {/* Instagram */}
                      <a
                        href={`https://www.instagram.com/?url=${encodeURIComponent(newsUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white ring-2 ring-pink-500 rounded-full shadow-md p-2 hover:scale-110 transition"
                        title="Instagram पर शेयर करें"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-7 h-7 text-pink-500" viewBox="0 0 24 24">
                          <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.5-.25a1.25 1.25 0 112.5 0 1.25 1.25 0 01-2.5 0z"/>
                        </svg>
                      </a>
                      {/* X (Twitter) */}
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(newsUrl)}&text=${encodeURIComponent(post.heading + '\n' + shortDesc)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white ring-2 ring-gray-800 rounded-full shadow-md p-2 hover:scale-110 transition"
                        title="X (Twitter) पर शेयर करें"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-7 h-7 text-gray-800" viewBox="0 0 24 24">
                          <path d="M22.162 0h-4.327l-5.835 7.906L6.162 0H.001l7.906 11.324L0 24h4.327l6.162-8.353L17.838 24H24l-8.162-11.324z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-400 italic text-center">कोई समाचार नहीं मिला।</div>
        )}
      </div>
      {/* Modal Popup for full news (optional, can be removed if not needed) */}
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
            <h2 className={`text-2xl font-bold mb-2 ${headingGradient}`}>{modalPost.heading}</h2>
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

/* Add this to the bottom of the file for custom scrollbar styling (if using Tailwind, add to global CSS instead) */
// .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 8px; background: #e5e7eb; border-radius: 8px; }
// .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 8px; } 