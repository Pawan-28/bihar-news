import React, { useState, useEffect } from 'react';
import CategoryNewsSection from '../Components/CategoryNewsSection';

const Politics = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const trendingTopics = [
    "#BiharPolitics",
    "#LokSabhaElections2024",
    "#NitishKumar",
    "#RJD",
    "#BJP",
    "#Congress"
  ];

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/content/public');
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

    fetchContent();
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-5">
        <div className="mb-6 text-center">
          <span className="inline-block bg-purple-50 text-purple-800 text-lg md:text-xl font-semibold px-6 py-2 rounded-full shadow-sm border border-purple-200 tracking-wide">
            Harshit ke Kalam Se Rajniti Samachar Padhiye
          </span>
        </div>
        <CategoryNewsSection category="राजनीति" posts={sortedPosts} />
        <hr className="my-10 border-t-2 border-blue-200" />

        {/* Breaking News Ticker */}
        {/* <div className="bg-red-600 text-white py-2 px-4 mb-8">
          <div className="container mx-auto flex items-center">
            <span className="font-bold mr-4 bg-black px-3 py-1 rounded-md animate-pulse">ब्रेकिंग न्यूज़</span>
            <div className="overflow-hidden whitespace-nowrap">
              <div className="inline-block animate-marquee">
                <span className="mx-8">• नीतीश कुमार ने की अहम बैठक</span>
                <span className="mx-8">• बिहार में सियासी हलचल तेज</span>
                <span className="mx-8">• लोकसभा चुनाव की तैयारियां जोरों पर</span>
              </div>
            </div>
          </div>
        </div> */}

        {/* Trending Topics */}
        <div className="bg-blue-50 rounded-lg p-5 mt-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">ट्रेंडिंग टॉपिक्स</h3>
          <ul className="flex flex-wrap gap-2">
            {trendingTopics.map((topic, index) => (
              <li 
                key={index}
                className="bg-blue-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-300 transition-colors cursor-pointer"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>

        {/* Political Analysis Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">चुनावी विश्लेषण</h3>
            <p className="text-gray-600">
              2024 के लोकसभा चुनाव में बिहार की 40 सीटों पर कड़ा मुकाबला देखने को मिल सकता है। 
              एनडीए और महागठबंधन के बीच कांटे की टक्कर की उम्मीद है।
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">राजनीतिक दल</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• भाजपा - राष्ट्रीय जनतांत्रिक गठबंधन (NDA)</li>
              <li>• जेडीयू - राष्ट्रीय जनतांत्रिक गठबंधन (NDA)</li>
              <li>• राजद - महागठबंधन (Grand Alliance)</li>
              <li>• कांग्रेस - महागठबंधन (Grand Alliance)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Politics; 