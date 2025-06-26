import React, { useState, useEffect } from 'react';
import CategoryNewsSection from '../Components/CategoryNewsSection';

const Jharkhand = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('https://harshit-backend-18mr.onrender.com/api/content/public');
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
          <span className="inline-block bg-green-50 text-green-800 text-lg md:text-xl font-semibold px-6 py-2 rounded-full shadow-sm border border-green-200 tracking-wide">
            हर्षित की कलम से झारखंड समाचार पढ़िए
          </span>
        </div>
        {/* Crime News Section */}
        <CategoryNewsSection category="झारखंड" posts={sortedPosts} />
      </div>
    </div>
  );
};

export default Jharkhand;