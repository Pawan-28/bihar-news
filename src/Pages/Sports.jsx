import React, { useState, useEffect } from 'react';
import CategoryNewsSection from '../Components/CategoryNewsSection';

const Sports = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const sportsNews = [
  //   {
  //     id: 1,
  //     title: "Shubman Gill से गंभीर और अगरकर को है यह ख़ास उम्मीद",
  //     description: "भारतीय टेस्ट क्रिकेट में एक नए युग की शुरुआत होने जा रही है और इसकी कमान 25 वर्षीय शुभमन गिल के हाथों में सौंपी गई है..."
  //   },
  //   {
  //     id: 2,
  //     title: "WTC Final 2025: विश्व टेस्ट चैंपियनशिप विजेता टीम को मिलेंगे इतने करोड़",
  //     description: "वर्ल्ड टेस्ट चैंपियनशिप 2025 फाइनल में साउथ अफ्रीका और ऑस्ट्रेलिया के बीच लॉर्ड्स में रोमांचक मुकाबला चल रहा है..."
  //   },
  //   {
  //     id: 3,
  //     title: "WTC Final 2025: पैट कमिंस के नाम एक और वर्ल्ड रिकॉर्ड",
  //     description: "लंदन के लॉर्ड्स मैदान पर खेले गए विश्व टेस्ट चैंपियनशिप 2025 फाइनल के दूसरे दिन ऑस्ट्रेलियाई कप्तान पैट कमिंस ने इतिहास रच दिया..."
  //   },
  //   {
  //     id: 4,
  //     title: "Gautam Gambhir की मां को आया हार्ट अटैक",
  //     description: "भारतीय क्रिकेट टीम के हेड कोच गौतम गंभीर अचानक भारत लौट आए हैं। जानकारी के अनुसार, गौतम गंभीर की मां सीमा गंभीर को हाल ही में दिल का दौरा पड़ा था..."
  //   },
  //   {
  //     id: 5,
  //     title: "Virat Kohli और Rohit Sharma को सम्मानित करेगा इस देश का क्रिकेट बोर्ड",
  //     description: "भारतीय क्रिकेट के दो दिग्गज विराट कोहली और रोहित शर्मा ने टेस्ट और टी20 क्रिकेट से संन्यास ले लिया है..."
  //   },
  //   {
  //     id: 6,
  //     title: "INDvsENG: इंग्लैंड में सबसे ज्यादा टेस्ट शतक ठोकने वाले भारतीय",
  //     description: "भारत और इंग्लैंड के बीच 20 जून 2025 से शुरू होने वाली 5 मैचों की टेस्ट सीरीज में युवा भारतीय बल्लेबाजों पर सबकी नजरें होंगी..."
  //   }
  // ];

  const trendingTopics = [
    "#ShubmanGillCaptain",
    "#WTCFinal2025",
    "#PatCummins",
    "#INDvsENGTestSeries",
    "#IPL2025Final"
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
    <div className="max-w-6xl mx-auto p-5 font-sans">
      <div className="mb-6 text-center">
        <span className="inline-block bg-gradient-to-r from-yellow-100 via-yellow-50 to-yellow-200 text-yellow-900 text-lg md:text-xl font-bold px-6 py-2 rounded-full shadow-md border border-yellow-100 tracking-wide">
          खेल जगत की ताज़ा और रोमांचक खबरें यहाँ पढ़ें
        </span>
      </div>
      <CategoryNewsSection category="खेल" posts={sortedPosts} />
      <hr className="my-10 border-t-2 border-blue-200" />

      {/* Trending Topics and other content below */}
      <div className="bg-green-50 rounded-lg p-5 mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Trending in Sports</h3>
        <ul className="flex flex-wrap gap-2">
          {trendingTopics.map((topic, index) => (
            <li 
              key={index}
              className="bg-teal-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sports;