import React, { useState, useEffect } from 'react';
import CategoryNewsSection from '../Components/CategoryNewsSection';

const Bihar = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('https://bihar-backend.onrender.com/api/content/public');
        // const url = 'http://localhost:5000/api/content/public';
        // const response = await fetch(url);
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setContent(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();0
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  const sortedPosts = content?.newsPosts
    ? [...content.newsPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 text-center">
          <span className="inline-block bg-gradient-to-r from-blue-100 via-blue-50 to-blue-200 text-blue-900 text-lg md:text-xl font-bold px-6 py-2 rounded-full shadow-md border border-blue-100 tracking-wide">
            बिहार की ताज़ा और विश्वसनीय खबरें यहाँ पढ़ें
          </span>
        </div>
        {/* Crime News Section */}
        <CategoryNewsSection category="बिहार" posts={sortedPosts} />
      </div>
    </div>
  );
};

export default Bihar;