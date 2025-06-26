import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('https://harshit-backend-18mr.onrender.com/api/content/public');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log('Fetched content data:', data);
        console.log('News Posts from Backend:', data.newsPosts);
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

  // Helper function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

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

  // Get data from backend or use fallbacks
  const heroBanner = content?.heroBanner || {
    title: 'हर्षित के कलम से में आपका स्वागत है',
    subtitle: 'बिहार और झारखंड की ताज़ा खबरें, राजनीति, अपराध और करियर समाचार',
    // button1Text: 'ताज़ा खबरें पढ़ें',
    // button2Text: 'वीडियो देखें',
    images: ['https://navbharattimes.indiatimes.com/thumb/113599197/bihar-politics-sound-power-change-113599197.jpg?imgsize=62408&width=1600&height=900&resizemode=75']
  };

  // Try to get latestNewsArticles from backend, fallback to latestNews, then to default
  const latestNewsArticles = content?.latestNewsArticles || content?.latestNews || [
    {
      title: 'बिहार: मुख्यमंत्री ने लॉन्च की नई योजना',
      image: 'https://images.indianexpress.com/2024/01/bihar-1600.jpg',
      link: '/news/bihar-new-scheme',
      category: 'बिहार'
    },
    {
      title: 'झारखंड: खनन घोटाले में 3 अधिकारी गिरफ्तार',
      image: 'https://swarajya.gumlet.io/swarajya/2024-04/40a53b4d-7dc8-4017-8d35-fd3fdd3e08f6/10_04_3.png?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true',
      link: '/news/jharkhand-mining-scam',
      category: 'झारखंड'
    },
    {
      title: 'पटना मेट्रो में नई सुविधा',
      image: 'https://thedailyguardian.com/wp-content/uploads/2025/01/political-landscape-in-Bihar.webp',
      link: '/news/patna-metro',
      category: 'विकास'
    }
  ];

  // Ensure we always have at least 3 images for the layout
  const displayArticles = latestNewsArticles.length >= 3 ? latestNewsArticles.slice(0, 3) : [
    {
      title: 'बिहार: मुख्यमंत्री ने लॉन्च की नई योजना',
      image: 'https://images.indianexpress.com/2024/01/bihar-1600.jpg',
      link: '/news/bihar-new-scheme',
      category: 'बिहार'
    },
    {
      title: 'झारखंड: खनन घोटाले में 3 अधिकारी गिरफ्तार',
      image: 'https://swarajya.gumlet.io/swarajya/2024-04/40a53b4d-7dc8-4017-8d35-fd3fdd3e08f6/10_04_3.png?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true',
      link: '/news/jharkhand-mining-scam',
      category: 'झारखंड'
    },
    {
      title: 'पटना मेट्रो में नई सुविधा',
      image: 'https://thedailyguardian.com/wp-content/uploads/2025/01/political-landscape-in-Bihar.webp',
      link: '/news/patna-metro',
      category: 'विकास'
    }
  ];

  console.log('Content from backend:', content);
  console.log('Hero Banner:', heroBanner);
  console.log('Latest News Articles:', latestNewsArticles);
  console.log('Number of articles:', latestNewsArticles.length);
  console.log('Content.newsPosts to be rendered:', content?.newsPosts);

  // Try to get videos from different possible sources, ensuring we handle empty arrays
  const backendVideos = content?.videos || content?.videoNews?.videos;
  const videos = backendVideos && backendVideos.length > 0 ? backendVideos : ['https://youtu.be/dQw4w9WgXcQ'];
  const videoNewsTitle = content?.videoNewsTitle || content?.videoNews?.title || 'बिहार की ताज़ा राजनीतिक खबरें | नीतीश कुमार का बड़ा बयान';
  
  // Get first video ID for YouTube
  const firstVideoUrl = videos[0]; // This will now correctly be from the backend if available
  const videoId = getYouTubeVideoId(firstVideoUrl) || 'dQw4w9WgXcQ'; // Fallback remains as a safeguard

  const marqueeItems = content?.marqueeItems && content.marqueeItems.length > 0
    ? content.marqueeItems
    : [
      'बिहार: पटना में बड़ा सड़क हादसा, 5 लोगों की मौत',
      'झारखंड: खनन माफिया पर पुलिस की बड़ी कार्रवाई',
      'बिहार चुनाव: NDA की बैठक आज, उम्मीदवारों की सूची जल्द',
      'NEET 2025: परीक्षा पैटर्न में बड़े बदलाव'
    ];

  // SVG for 'पढ़ो' (Read) icon
  const ReadIcon = (
    <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M12 20l9-5-9-5-9 5 9 5z" />
      <path d="M12 12V4l9 5-9 5-9-5 9-5z" />
    </svg>
  );

  const sortedNewsPosts = content?.newsPosts 
    ? [...content.newsPosts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) 
    : [];

  return (
    <div className="bg-gray-50 font-hindi w-full min-h-screen">
      {/* Breaking News Ticker */}
      <div className="bg-red-600 text-white py-2 px-4">
  <div className="container mx-auto flex items-center space-x-4">
    <span className="font-bold bg-black px-3 py-1 rounded-md animate-pulse flex items-center h-full">
      ब्रेकिंग न्यूज़
    </span>
    <div className="overflow-hidden whitespace-nowrap flex-1">
      <div className="inline-block animate-marquee">
        {marqueeItems.map((item, index) => (
          <span key={index} className="mx-8">• {item}</span>
        ))}
      </div>
    </div>
  </div>
</div>

      {/* Top Section */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Welcome Banner - Centered Content */}
          <div className="w-full lg:w-1/2 h-[512px] relative group text-center ">
            <div className="h-full relative rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 group-hover:shadow-3xl">
              <img
                src={
                  heroBanner.images?.[0] ||
                  "https://navbharattimes.indiatimes.com/thumb/113599197/bihar-politics-sound-power-change-113599197.jpg?imgsize=62408&width=1600&height=900&resizemode=75"
                }
                alt="Welcome Banner"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end items-center p-8 text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg mb-2">
                  {heroBanner.title}
                </h1>
                <p className="text-white text-lg md:text-xl max-w-lg bg-black/30 px-4 py-2 rounded-lg">
                  {heroBanner.subtitle}
                </p>
                {/* <div className="flex gap-4 mt-6 justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-md font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {heroBanner.button1Text}
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-md font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                    </svg>
                    {heroBanner.button2Text}
                  </button>
                </div> */}
              </div>
            </div>
          </div>
          {/* Right Side Column */}
         {/* Right Side Column */}
         <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-3 text-center">
            {/* News Banners - Centered Content */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              {displayArticles.map((banner, index) => (
                <Link
                  to={banner.link || "#"}
                  key={index}
                  className="relative h-40 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <img
                    src={banner.image || "https://via.placeholder.com/300x200"}
                    alt={banner.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col justify-end items-center text-center">
                    <span className="text-xs font-semibold text-yellow-400 mb-2 bg-black/50 px-3 py-1 rounded-full border border-yellow-400/50">
                      {banner.category || "समाचार"}
                    </span>
                    <h3 className="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow-md">
                      {banner.title || "समाचार लोड हो रहा है..."}
                    </h3>
                  </div>
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    नया
                  </div>
                </Link>
              ))}
            </div>
            {/* YouTube Video Box & Ad - Centered Content */}
            <div className="w-full lg:w-1/2 flex flex-col gap-3">
              {/* YouTube Video Box */}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 border-2 border-gray-200">
                <div className="relative pt-[56.25%] overflow-hidden rounded-t-xl scale-105">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                    title={videoNewsTitle}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4 bg-gradient-to-b from-gray-50 to-white text-center">
                  <h3 className="font-bold text-lg text-gray-800 line-clamp-2">
                    {videoNewsTitle}
                  </h3>
                  <div className="flex items-center justify-center mt-3 text-red-600 font-bold text-lg">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-2">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                      </svg>
                    </div>
                    <div>Watch News</div>
                  </div>
                </div>
              </div>
              {/* Ad Card */}
              <div className="bg-white rounded-2xl shadow-xl border-2 border-dashed border-gray-300 p-4 flex flex-col justify-center items-center flex-grow group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-center">
                  <h3 className="font-bold text-lg text-gray-500">विज्ञापन</h3>
                  <p className="text-gray-500 mt-2">अपना विज्ञापन यहां प्रदर्शित करें।</p>
                  <a href="https://wa.me/919711168942?text=HELLO%20SIR" className="mt-4 inline-block bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                    संपर्क करें
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Debug Section - Temporary */}
      {/* {latestNewsArticles.length === 0 && (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <strong>Debug Info:</strong> No latest news articles found. Backend data: {JSON.stringify(content?.latestNewsArticles || content?.latestNews || 'No data')}
          </div>
        </div>
      )} */}

      {/* News Sections */}
      <div className="container mx-auto px-4 py-12">
        {["बिहार", "झारखंड", "राजनीति", "अपराध", "खेल"].map((cat, i) => {
          const categoryLinks = {
            'बिहार': '/bihar',
            'झारखंड': '/jharkhand',
            'राजनीति': '/politics',
            'अपराध': '/crime',
            'खेल': '/sports',
          };
          const borderColors = [
            'border-blue-600',
            'border-green-600',
            'border-purple-600',
            'border-red-600',
            'border-yellow-500',
          ];
          
          const categoryPosts = sortedNewsPosts.filter(post => post.category === cat);

          return (
            <div key={cat} className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-0 text-blue-700 drop-shadow-lg">{cat} <span className="font-light text-gray-700">समाचार</span></h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryPosts.length > 0 ? (
                  <>
                    {categoryPosts.map((post, idx) => {
                      const imageUrl = post.image?.startsWith('https://')
                        ? post.image
                        : 'https://via.placeholder.com/300x200';

                      return (
                        <div
                          key={post._id || idx}
                          className={`bg-white rounded-2xl shadow-xl border-2 ${borderColors[i]} p-0 flex flex-col group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
                        >
                          <div
                            className="w-full h-40 bg-center bg-cover"
                            style={{ backgroundImage: `url(${imageUrl})` }}
                          ></div>
                          <div className="p-7 flex flex-col justify-between flex-1">
                            <div>
                              <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                                {post.heading}
                              </h3>
                              <p className="text-gray-700 mb-4 line-clamp-3">{post.news}</p>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="text-xs text-gray-500">
                                {new Date(post.createdAt).toLocaleString('hi-IN')}
                              </div>
                              {idx === categoryPosts.length - 1 && (
                                <Link
                                  to={categoryLinks[cat]}
                                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-900 hover:scale-105 transition-all duration-200"
                                >
                                  पेज पर जाएं
                                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M9 5l7 7-7 7" />
                                  </svg>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="text-gray-400 italic col-span-3">कोई समाचार नहीं मिला।</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      

      {/* Newsletter Subscription */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-15 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            हमारे न्यूज़लेटर की सदस्यता लें
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            दैनिक समाचार अपडेट सीधे अपने इनबॉक्स में प्राप्त करें। बिहार और
            झारखंड की ताज़ा खबरें, विश्लेषण और अपडेट्स।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto sm:max-w-xl">
            <input
              type="email"
              placeholder="आपका ईमेल पता"
              className="flex-grow px-4 py-3 border-white bg-white text-black rounded-lg outline focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-colors duration-300 whitespace-nowrap">
              सब्सक्राइब करें
            </button>
          </div>
        </div>
      </div>
</div>
    
  );
};

export default Home;