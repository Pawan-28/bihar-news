import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('https://bihar-backend.onrender.com/api/content/public');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        let data;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          try {
            data = await response.json();
          } catch (jsonError) {
            console.error('JSON parse error:', jsonError);
            throw new Error('Invalid JSON from server');
          }
        } else {
          const text = await response.text();
          console.error('Non-JSON response:', text);
          throw new Error('Server did not return JSON');
        }
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

  // Prefer newsPosts from backend for dynamic news
  let displayArticles = [];
  if (content?.newsPosts && content.newsPosts.length > 0) {
    displayArticles = [...content.newsPosts]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3)
      .map(post => ({
        title: post.heading,
        image: post.image,
        link: `/news/${post._id}`,
        category: post.category || 'समाचार',
      }));
  } else if (latestNewsArticles.length >= 3) {
    displayArticles = latestNewsArticles.slice(0, 3);
  } else {
    displayArticles = [
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
  }

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
    <div className="bg-gradient-to-r from-[#f8fafc] to-[#e2e8f0] min-h-screen font-hindi w-full relative overflow-x-hidden animate-bg-move">
      {/* Animated floating background shapes */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 rounded-full opacity-30 blur-2xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-pink-200 via-yellow-100 to-orange-200 rounded-full opacity-20 blur-2xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 rounded-full opacity-20 blur-2xl animate-float-reverse"></div>
      </div>

      {/* Breaking News Ticker */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-1 xs:py-1.5 px-2 xs:px-4 h-6 xs:h-8 sm:h-10">
  <div className="container mx-auto flex items-center space-x-2 xs:space-x-4 h-full">
    <span className="font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 xs:px-3 py-0.5 xs:py-1 rounded-md animate-pulse flex items-center h-full shadow-lg text-xs xs:text-sm">
      ब्रेकिंग न्यूज़
    </span>
    <div className="overflow-hidden whitespace-nowrap flex-1 h-full">
      <div className="inline-block animate-marquee text-xs xs:text-sm h-full">
        {marqueeItems.map((item, index) => (
          <span key={index} className="mx-4 xs:mx-8 text-yellow-200 font-semibold">• {item}</span>
        ))}
      </div>
    </div>
  </div>
</div>

      {/* Hero Banner - Centered Container, no overlay */}
      <section className="w-full flex items-center justify-center mt-8 mb-8 relative animate-glow">
  <div className="container mx-auto px-2 md:px-4 relative h-[180px] xs:h-[220px] sm:h-[320px] md:h-[504px] lg:h-[576px] xl:h-[700px] flex items-center justify-center">
    
    {/* Dismissible Welcome Section */}
    {showWelcomeBanner && (
      <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full text-center z-10">
        <div className="backdrop-blur-xl bg-white/30 border-2 border-yellow-200/60 rounded-3xl shadow-2xl px-4 py-4 xs:px-6 xs:py-6 sm:px-8 sm:py-8 md:px-16 md:py-12 flex flex-col items-center animate-fade-in" style={{ maxWidth: '95vw' }}>
          <button
            className="absolute top-4 right-4 text-gray-700 text-2xl font-bold bg-white/60 rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-200 hover:text-red-600 transition z-20"
            onClick={() => setShowWelcomeBanner(false)}
            aria-label="Close"
            style={{outline: 'none'}}
          >
            ×
          </button>
          <div className="flex items-center gap-2 xs:gap-4 mb-2 xs:mb-4">
            <span className="inline-flex items-center justify-center w-10 h-10 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 shadow-lg animate-bounce">
              <svg className="w-6 h-6 xs:w-9 xs:h-9 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15 8l6 .5-4.5 4.5L18 20l-6-3.5L6 20l1.5-7L3 8.5 9 8z" /></svg>
            </span>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-yellow-600 to-red-600 drop-shadow-2xl px-1 xs:px-2">
              Bihar News 24/7
            </h1>
          </div>

          <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 px-2 xs:px-4 py-1 xs:py-2 rounded-lg max-w-xl sm:max-w-2xl mx-auto bg-white/60 shadow animate-fade-in mb-2 xs:mb-4">
            बिहार की धड़कन, झारखंड की आवाज़
          </p>

          <Link to="/news" className="mt-1 xs:mt-2 inline-flex items-center gap-1 xs:gap-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white font-bold px-4 py-2 xs:px-6 xs:py-3 sm:px-8 sm:py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 text-base xs:text-lg sm:text-xl animate-shine">
            <svg className="w-5 h-5 xs:w-7 xs:h-7 text-white animate-bounce" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15 8l6 .5-4.5 4.5L18 20l-6-3.5L6 20l1.5-7L3 8.5 9 8z" /></svg>
            लेटेस्ट खबरें देखें
          </Link>
        </div>
      </div>
    )}

    {/* 🖼 Hero Image */}
    <img
      src={heroBanner.images?.[0] || "https://navbharattimes.indiatimes.com/thumb/113599197/bihar-politics-sound-power-change-113599197.jpg?imgsize=62408&width=1600&height=900&resizemode=75"}
      alt="Welcome Banner"
      className="w-full h-full object-cover object-center m-auto rounded-3xl shadow-2xl opacity-80"
      style={{ boxShadow: '0 8px 64px 0 #fde68a55' }}
    />

    {/* ✨ Animated Floating Text on Top */}
    <div className="absolute top-4 sm:top-6 md:top-10 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
      <h2 className="text-sm xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-yellow-100 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-shimmer px-4 py-1 rounded-xl shadow-md tracking-wider uppercase">
        📡 ताज़ा अपडेट हर पल - Stay Tuned!
      </h2>
    </div>
  </div>

  {/* ✨ Shadow Glow at Bottom */}
  <div className="absolute -bottom-4 xs:-bottom-6 left-1/2 -translate-x-1/2 w-20 xs:w-32 h-4 xs:h-8 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full blur-xl opacity-40 animate-pulse"></div>
</section>


      {/* Decorative Divider */}
      <div className="w-full flex justify-center mb-8">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 md:h-16 lg:h-20">
          <path fill="#fde68a" fillOpacity="0.5" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          <path fill="#fdba74" fillOpacity="0.4" d="M0,60 C400,20 1040,100 1440,60 L1440,80 L0,80 Z" />
        </svg>
      </div>

      <section className="container mx-auto px-2 md:px-4 mb-0">
  <div className="flex flex-col lg:flex-row gap-6 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-200 rounded-3xl shadow-2xl animate-border-move overflow-hidden p-2 md:p-4 lg:p-6">
    
    {/* Left: Latest News */}
    <div className="flex-1 flex flex-col bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-4 h-full min-h-[1000px] overflow-hidden animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-yellow-600 to-red-600 drop-shadow-2xl px-4 py-2 rounded-2xl text-center flex items-center justify-center gap-3 border-b-4 border-gradient-to-r from-blue-400 via-yellow-400 to-red-400 relative">
        <svg className="w-7 h-7 text-yellow-400 drop-shadow-lg animate-bounce" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L15 8l6 .5-4.5 4.5L18 20l-6-3.5L6 20l1.5-7L3 8.5 9 8z"/>
        </svg>
        Latest News
        <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full px-2 py-1 text-xs font-bold text-white border border-red-300 shadow-md animate-pulse">लाइव</span>
      </h2>

      <div className="flex flex-col gap-4 mt-4 overflow-y-auto">
        {displayArticles.map((banner, index) => (
          <Link
            to={banner.link || "#"}
            key={index}
            className="relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 group bg-gradient-to-br from-white/90 via-blue-50 to-yellow-50 border border-blue-100 hover:scale-[1.025] hover:shadow-2xl hover:ring-2 hover:ring-yellow-300"
            style={{ maxHeight: '270px' }}
          >
            <img
              src={banner.image || "https://via.placeholder.com/400x300"}
              alt={banner.title}
              className="w-full h-64 object-cover object-center rounded-t-2xl border-b-2 border-yellow-200 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <span className="text-xs sm:text-sm font-bold text-yellow-300 mb-1 bg-black/40 px-3 py-1 rounded-full border border-yellow-400/50">{banner.category || "समाचार"}</span>
              <h3 className="text-white font-extrabold text-sm sm:text-lg">{banner.title}</h3>
            </div>
            <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-lg">नया</span>
          </Link>
        ))}
      </div>
    </div>

    {/* Right: Video Section */}
    <div className="flex-1 flex flex-col justify-between bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-4 h-full min-h-[1000px] animate-fade-in">
      
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full mt-0 md:mt-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-900 px-6 py-3 text-center border-b-2 border-yellow-200 flex items-center justify-center gap-3 relative">
          <svg className="w-8 h-8 text-yellow-600 drop-shadow-lg animate-spin-slow" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          Video
          <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full px-2 py-1 text-xs font-bold text-white border border-green-300 shadow-md animate-pulse">लाइव</span>
        </h2>
        
        <iframe
          className="w-full h-[550px] lg:h-[700px] border-2 rounded-2xl border-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-border-move"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
          title={videoNewsTitle}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <div className="p-4 bg-gradient-to-b from-yellow-50 to-white text-center flex flex-col flex-1 justify-center">
          <h3 className="font-bold text-2xl md:text-3xl text-yellow-800 mb-2">{videoNewsTitle}</h3>
          <p className="text-gray-700 mb-4">बिहार और झारखंड की ताज़ा राजनीतिक खबरें, वीडियो में देखें।</p>
          <div className="flex items-center justify-center text-red-600 font-bold text-lg">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-bold shadow transition-all duration-300">
              Watch News
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>


      {/* Decorative Wave Divider */}
      <div className="w-full -mt-2 mb-2 overflow-hidden">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 md:h-16 lg:h-20">
          <path fill="#fde68a" fillOpacity="0.5" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          <path fill="#fdba74" fillOpacity="0.4" d="M0,60 C400,20 1040,100 1440,60 L1440,80 L0,80 Z" />
        </svg>
      </div>

      {/* Call to Action Below News */}
      <div className="w-full flex justify-center mb-4 animate-fade-in">
        <Link to="/news" className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 text-xl">
          <svg className="w-7 h-7 text-white animate-bounce" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15 8l6 .5-4.5 4.5L18 20l-6-3.5L6 20l1.5-7L3 8.5 9 8z"/></svg>
          और खबरें देखें
        </Link>
      </div>

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
            <div
              key={cat}
              className="mb-16 p-4 md:p-8 rounded-3xl shadow-xl"
              style={{
                background: cat === 'बिहार' ? 'linear-gradient(135deg, #e0f2fe 60%, #bae6fd 100%)' :
                            cat === 'झारखंड' ? 'linear-gradient(135deg, #fef9c3 60%, #fde68a 100%)' :
                            cat === 'राजनीति' ? 'linear-gradient(135deg, #fce7f3 60%, #fbcfe8 100%)' :
                            cat === 'अपराध' ? 'linear-gradient(135deg, #fee2e2 60%, #fecaca 100%)' :
                            cat === 'खेल' ? 'linear-gradient(135deg, #d1fae5 60%, #6ee7b7 100%)' :
                            '#f3f4f6',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="inline-block mb-4 px-6 py-3 rounded-2xl shadow-lg animate-fade-in"
                  style={{
                    background: cat === 'बिहार' ? '#38bdf8' :
                                cat === 'झारखंड' ? '#fde047' :
                                cat === 'राजनीति' ? '#f472b6' :
                                cat === 'अपराध' ? '#f87171' :
                                cat === 'खेल' ? '#34d399' :
                                '#e0e7ef',
                  }}
                >
                  <h2
                    className="text-4xl md:text-5xl font-extrabold tracking-tight mb-0"
                    style={{
                      color: cat === 'बिहार' ? '#0e7490' :
                              cat === 'झारखंड' ? '#92400e' :
                              cat === 'राजनीति' ? '#831843' :
                              cat === 'अपराध' ? '#991b1b' :
                              cat === 'खेल' ? '#065f46' :
                              '#334155',
                    }}
                  >
                    {cat} <span className="font-light" style={{color: '#222'}}>समाचार</span>
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryPosts.length > 0 ? (
                  <>
                    {categoryPosts.map((post, idx) => {
                      const imageUrl = post.image?.startsWith('http')
                        ? post.image
                        : `${window.location.origin}${post.image}`;

                      return (
                        <div
                          key={post._id || idx}
                          className={`relative rounded-[2rem] shadow-xl p-0 flex flex-col md:flex-row group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border`}
                          style={{
                            backdropFilter: 'blur(8px)',
                            background: cat === 'बिहार' ? 'linear-gradient(135deg, #e0f2fe 60%, #f0fdfa 100%)' :
                                        cat === 'झारखंड' ? 'linear-gradient(135deg, #fef9c3 60%, #f0fdfa 100%)' :
                                        cat === 'राजनीति' ? 'linear-gradient(135deg, #fce7f3 60%, #f0fdfa 100%)' :
                                        cat === 'अपराध' ? 'linear-gradient(135deg, #fee2e2 60%, #f0fdfa 100%)' :
                                        cat === 'खेल' ? 'linear-gradient(135deg, #d1fae5 60%, #f0fdfa 100%)' :
                                        '#fff',
                            borderColor: cat === 'बिहार' ? '#38bdf8' :
                                         cat === 'झारखंड' ? '#facc15' :
                                         cat === 'राजनीति' ? '#ec4899' :
                                         cat === 'अपराध' ? '#ef4444' :
                                         cat === 'खेल' ? '#10b981' :
                                         '#e5e7eb',
                          }}
                        >
                          {/* Image: 3/4 on desktop, full on mobile */}
                          <div
                            className="md:basis-3/4 w-full h-40 md:h-auto bg-center bg-cover"
                            style={{ backgroundImage: `url(${imageUrl})` }}
                          ></div>
                          {/* Content: 1/4 on desktop, full on mobile */}
                          <div className="md:basis-1/4 w-full flex flex-col justify-between p-5 md:p-7 bg-white/80">
                            <div>
                              <h3 className="font-bold text-xl mb-2 line-clamp-2" style={{
                                color: cat === 'बिहार' ? '#0e7490' :
                                       cat === 'झारखंड' ? '#92400e' :
                                       cat === 'राजनीति' ? '#831843' :
                                       cat === 'अपराध' ? '#991b1b' :
                                       cat === 'खेल' ? '#065f46' :
                                       '#334155',
                              }}>
                                {post.heading}
                              </h3>
                              <p className="text-gray-700 mb-4 line-clamp-3">{post.news}</p>
                            </div>
                            <div className="flex flex-col mt-2 gap-1">
                              {/* Date on one line, time on next line */}
                              <div className="text-xs text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString('hi-IN')}
                              </div>
                              <div className="text-xs text-gray-400">
                                {new Date(post.createdAt).toLocaleTimeString('hi-IN')}
                              </div>
                              {idx === categoryPosts.length - 1 && (
                                <Link
                                  to={categoryLinks[cat]}
                                  className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-teal-700 hover:scale-105 transition-all duration-200"
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

      {/* Scroll to Top Button */}
      <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 animate-bounce border-4 border-white/60">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7"/></svg>
      </button>
    </div>
  );
}

// Animated border and shine effect styles
const style = `
  @keyframes border-move {
    0% { border-image-source: linear-gradient(90deg, #fde68a, #fdba74, #fca5a5); }
    100% { border-image-source: linear-gradient(270deg, #fde68a, #fdba74, #fca5a5); }
  }
  .animate-border-move {
    border-image: linear-gradient(90deg, #fde68a, #fdba74, #fca5a5) 1;
    animation: border-move 4s linear infinite alternate;
  }
  @keyframes shine {
    0% { box-shadow: 0 0 0 0 #fde68a; }
    50% { box-shadow: 0 0 16px 4px #fde68a; }
    100% { box-shadow: 0 0 0 0 #fde68a; }
  }
  .animate-shine {
    animation: shine 2s infinite;
  }
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: none; }
  }
  .animate-fade-in {
    animation: fade-in 1.2s cubic-bezier(0.4,0,0.2,1) both;
  }
  @keyframes bg-move {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
  .animate-bg-move {
    background-size: 200% 200%;
    animation: bg-move 10s ease-in-out infinite alternate;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-30px) scale(1.05); }
  }
  .animate-float {
    animation: float 8s ease-in-out infinite;
  }
  @keyframes float-slow {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(20px) scale(1.1); }
  }
  .animate-float-slow {
    animation: float-slow 14s ease-in-out infinite;
  }
  @keyframes float-reverse {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-20px) scale(0.95); }
  }
  .animate-float-reverse {
    animation: float-reverse 12s ease-in-out infinite;
  }
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 32px 8px #fde68a44, 0 0 0 0 #fdba7444; }
    50% { box-shadow: 0 0 64px 16px #fde68a99, 0 0 32px 8px #fdba7499; }
  }
  .animate-glow {
    animation: glow 3s ease-in-out infinite;
  }
`;

if (typeof document !== 'undefined') {
  let styleTag = document.getElementById('home-animated-styles');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'home-animated-styles';
    document.head.appendChild(styleTag);
  }
  styleTag.innerHTML = style;
}

export default Home;