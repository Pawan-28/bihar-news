import React from 'react';
import { testMetaTags } from '../utils/testMetaTags';

const ShareDebugger = ({ article }) => {
  const handleTestMetaTags = () => {
    testMetaTags(article);
  };

  const handleTestWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article?.title || 'Check out this article');
    const whatsappUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleTestFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookUrl, '_blank');
  };

  const handleTestTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article?.title || 'Check out this article');
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(twitterUrl, '_blank');
  };

  if (!article) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-sm z-50">
      <h3 className="font-bold text-sm mb-2">🔧 Share Debugger</h3>
      <div className="space-y-2">
        <button
          onClick={handleTestMetaTags}
          className="w-full px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Meta Tags
        </button>
        <button
          onClick={handleTestWhatsApp}
          className="w-full px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test WhatsApp
        </button>
        <button
          onClick={handleTestFacebook}
          className="w-full px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test Facebook
        </button>
        <button
          onClick={handleTestTwitter}
          className="w-full px-3 py-1 text-xs bg-sky-500 text-white rounded hover:bg-sky-600"
        >
          Test Twitter
        </button>
      </div>
      <div className="mt-2 text-xs text-gray-600">
        <p><strong>Title:</strong> {article.title?.slice(0, 30)}...</p>
        <p><strong>Image:</strong> {article.image ? '✅' : '❌'}</p>
      </div>
    </div>
  );
};

export default ShareDebugger; 