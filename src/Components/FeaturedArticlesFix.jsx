import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedArticlesFix = () => {
  return (
    <div className="featured-articles">
      <div className="flex space-x-4 mt-4 md:mt-6 text-gray-400">
        <Link to="#" className="text-indigo-600 hover:underline font-medium flex items-center gap-2">
          View All
        </Link>
      </div>
    </div>
  );
};

export default FeaturedArticlesFix;
