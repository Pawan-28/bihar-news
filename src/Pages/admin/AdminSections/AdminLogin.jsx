import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [newsPosts, setNewsPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);

  // State for Home page sections - matching Home.jsx structure
  const [heroBanner, setHeroBanner] = useState({
    title: 'Bihar News 24/7 में आपका स्वागत है',
    subtitle: 'बिहार और झारखंड की ताज़ा खबरें, राजनीति, अपराध और करियर समाचार',
    button1Text: 'ताज़ा खबरें पढ़ें',
    button2Text: 'वीडियो देखें',
    images: [
      'https://navbharattimes.indiatimes.com/thumb/113599197/bihar-politics-sound-power-change-113599197.jpg?imgsize=62408&width=1600&height=900&resizemode=75'
    ]
  });

  const [latestNewsTitle, setLatestNewsTitle] = useState('Latest News');
  const [latestNewsArticles, setLatestNewsArticles] = useState([]);

  const [featuredArticlesTitle, setFeaturedArticlesTitle] = useState('Featured Articles');
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [photoGalleryTitle, setPhotoGalleryTitle] = useState('Photo Gallery');
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [popularTags, setPopularTags] = useState(['Politics', 'Technology', 'Sports', 'Health', 'Finance']);
  const [newsletterTitle, setNewsletterTitle] = useState('Newsletter');
  const [newsletterDescription, setNewsletterDescription] = useState('Stay updated with our latest news and articles');
  const [videoNewsTitle, setVideoNewsTitle] = useState('बिहार की ताज़ा राजनीतिक खबरें | नीतीश कुमार का बड़ा बयान');
  const [videos, setVideos] = useState(['https://youtu.be/dQw4w9WgXcQ']);
  const [localNewsTitle, setLocalNewsTitle] = useState('Local News');
  const [localNewsArticles, setLocalNewsArticles] = useState([]);
  const [marqueeItems, setMarqueeItems] = useState([]);
  const [newsForm, setNewsForm] = useState({ category: '', heading: '', news: '', image: '' });
  const [isNewsSubmitting, setIsNewsSubmitting] = useState(false);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
      setIsLoggedIn(true);
      fetchCustomization(tokenFromStorage);
    }
  }, []);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const response = await fetch('https://bihar-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          username,
          password
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setMessage(data.message || 'Login failed. Please check your credentials.');
        return;
      }
      
      console.log('Login successful, token:', data.token);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      fetchCustomization(data.token);
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Error connecting to server: ' + error.message);
    }
  };

  // Fetch customization data
  const fetchCustomization = async (authToken) => {
    try {
      const response = await fetch('https://bihar-backend.onrender.com/api/content', {
        headers: { Authorization: 'Bearer ' + authToken }
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          const content = data;
          setHeroBanner(content.heroBanner || heroBanner);
          setLatestNewsTitle(content.latestNewsTitle || 'Latest News');
          setLatestNewsArticles(content.latestNews || []);
          setFeaturedArticlesTitle(content.featuredArticlesTitle || featuredArticlesTitle);
          setFeaturedArticles(content.featuredArticles || []);
          setPhotoGalleryTitle(content.photoGallery?.title || photoGalleryTitle);
          setGalleryPhotos(content.photoGallery?.photos || []);
          setPopularTags(content.popularTags || popularTags);
          setNewsletterTitle(content.newsletter?.title || newsletterTitle);
          setNewsletterDescription(content.newsletter?.description || newsletterDescription);
          setVideoNewsTitle(content.videoNews?.title || videoNewsTitle);
          setVideos(content.videoNews?.videos || videos);
          setLocalNewsTitle(content.localNews?.title || localNewsTitle);
          setLocalNewsArticles(content.localNews?.articles || []);
          setMarqueeItems(content.marqueeItems || []);
          setNewsPosts(content.newsPosts || []);
        }
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to fetch customization data');
      }
    } catch (error) {
      setMessage('Error fetching customization data: ' + error.message);
    }
  };

  // Save customization data with popup and redirect
  const handleSave = async () => {
    try { 
      const payload = {
        heroBanner: heroBanner,
        latestNewsTitle: latestNewsTitle,
        latestNews: latestNewsArticles,
        featuredArticlesTitle: featuredArticlesTitle,
        featuredArticles: featuredArticles,
        photoGallery: {
          title: photoGalleryTitle,
          photos: galleryPhotos
        },
        popularTags: popularTags,
        newsletter: {
          title: newsletterTitle,
          description: newsletterDescription
        },
        videoNews: {
          title: videoNewsTitle,
          videos: videos
        },
        localNews: {
          title: localNewsTitle,
          articles: localNewsArticles
        },
        marqueeItems: marqueeItems
      };

      const response = await fetch('https://bihar-backend.onrender.com/api/content', {
        method: 'PUT',  
        headers: { 
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify(payload)
      });

      // First check if the response is ok
      if (!response.ok) {
        const errorText = await response.text();
        setMessage('Error: ' + errorText);
        return;
      }

      // Try to parse JSON response if it exists
      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch (parseError) {
          console.error('Failed to parse JSON response:', parseError);
          data = { message: 'Invalid JSON response from server' };
        }
      }

      // If no JSON data, just use the text response
      if (!data) {
        const text = await response.text();
        data = { message: text };
      }

      if (response.ok) {
        alert('Changes saved successfully!');
        // navigate('/');
        // window.location.reload();
      } else {
        setMessage(data.message || 'Failed to save customization');
      }
    } catch (error) {
      setMessage('Error saving customization: ' + error.message);
      console.error('Error saving customization:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setIsLoggedIn(false);
    navigate('/admin');
  };

  // Handlers for CRUD operations on heroBanner images
  const handleAddHeroBannerImage = () => {
    setHeroBanner({
      ...heroBanner,
      images: [...(heroBanner.images || []), '']
    });
  };

  const handleUpdateHeroBannerImage = (index, value) => {
    const updatedImages = [...(heroBanner.images || [])];
    updatedImages[index] = value;
    setHeroBanner({
      ...heroBanner,
      images: updatedImages
    });
  };

  const handleRemoveHeroBannerImage = (index) => {
    const updatedImages = (heroBanner.images || []).filter((_, i) => i !== index);
    setHeroBanner({
      ...heroBanner,
      images: updatedImages
    });
  };

  // Handlers for CRUD operations on latestNewsArticles
  const handleAddLatestNewsArticle = () => {
    setLatestNewsArticles([...latestNewsArticles, {
      image: '',
      category: '',
      title: '',
      description: '',
      author: 'हर्षित',
      date: new Date().toISOString(),
      location: 'बिहार',
      time: 'अभी',
      views: 0,
      link: '#'
    }]);
  };

  const handleUpdateLatestNewsArticle = (index, field, value) => {
    const updatedArticles = [...latestNewsArticles];
    updatedArticles[index][field] = value;
    setLatestNewsArticles(updatedArticles);
  };

  const handleRemoveLatestNewsArticle = (index) => {
    const updatedArticles = latestNewsArticles.filter((_, i) => i !== index);
    setLatestNewsArticles(updatedArticles);
  };

  // Handlers for CRUD operations on featuredArticles
  const handleAddFeaturedArticle = () => {
    setFeaturedArticles([...featuredArticles, {
      image: '',
      title: '',
      description: '',
      date: '',
      readTime: ''
    }]);
  };

  // Handlers for CRUD operations on videos
  const handleAddVideo = () => {
    setVideos([...videos, '']);
  };

  const handleUpdateVideo = (index, value) => {
    const updatedVideos = [...videos];
    updatedVideos[index] = value;
    setVideos(updatedVideos);
  };


  const handleRemoveVideo = (index) => {
    const updatedVideos = videos.filter((_, i) => i !== index);
    setVideos(updatedVideos);
  };

  // Handlers for CRUD operations on localNewsArticles
  const handleAddLocalNewsArticle = () => {
    setLocalNewsArticles([...localNewsArticles, {
      image: '',
      title: '',
      description: '',
      author: '',
      date: ''
    }]);
  };

  const handleDeleteNews = async (postId) => {
    if (!window.confirm('क्या आप वाकई इस समाचार पोस्ट को हटाना चाहते हैं?')) {
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://bihar-backend.onrender.com/api/content/news/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage('समाचार पोस्ट सफलतापूर्वक हटा दिया गया!');
        fetchCustomization(token);
      } else {
        const data = await response.json();
        setMessage(data.message || 'समाचार पोस्ट हटाने में विफल।');
      }
    } catch (error) {
      setMessage('समाचार पोस्ट हटाने में त्रुटि: ' + error.message);
    }
  };

  const handleEditNews = (post) => {
    setEditingPostId(post._id);
    setNewsForm({
      category: post.category,
      heading: post.heading,
      news: post.news,
      image: post.image || '',
    });
    const formSection = document.getElementById('news-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setNewsForm({ category: '', heading: '', news: '', image: '' });
  };

  const handleNewsFormChange = (e) => {
    const { name, value } = e.target;
    setNewsForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleNewsFormSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation to prevent sending an array
    const finalNewsForm = { ...newsForm };
    if (Array.isArray(finalNewsForm.image)) {
        console.warn('Correcting image field from array to empty string before sending.');
        finalNewsForm.image = '';
    }

    setIsNewsSubmitting(true);
    const token = localStorage.getItem('token');
    const url = editingPostId
      ? `https://bihar-backend.onrender.com/api/content/news/${editingPostId}`
      : 'https://bihar-backend.onrender.com/api/content/news';
    const method = editingPostId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(finalNewsForm),
      });
      if (response.ok) {
        setNewsForm({ category: '', heading: '', news: '' , image: ''});
        setMessage(`समाचार सफलतापूर्वक ${editingPostId ? 'अपडेट' : 'पोस्ट'} हो गया!`);
        setEditingPostId(null);
        fetchCustomization(token);
      } else {
        const data = await response.json();
        setMessage(data.message || `समाचार ${editingPostId ? 'अपडेट' : 'पोस्ट'} नहीं हुआ।`);
      }
    } catch (error) {
      setMessage('Error posting news: ' + error.message);
    } finally {
      setIsNewsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          {message && <p className="text-red-500 mb-4">{message}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-3 py-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-100 p-0 md:p-0 overflow-auto">
      <header className="sticky top-0 z-20 flex flex-col sm:flex-row items-center justify-between mb-10 bg-white/80 backdrop-blur-lg p-6 rounded-b-3xl shadow-2xl border-b-4 border-blue-400">
        <div className="flex items-center gap-4">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L15 8l6 .5-4.5 4.5L18 20l-6-3.5L6 20l1.5-7L3 8.5 9 8z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-xs font-bold">24</span>
            </div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-red-600 tracking-tight drop-shadow-lg uppercase">Bihar News 24/7 Admin</h1>
            <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 tracking-wide">Welcome, manage your news portal in style!</h2>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:from-blue-600 hover:to-blue-800 hover:scale-105 transition-all duration-300 text-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Save Changes
          </button>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:from-red-600 hover:to-red-800 hover:scale-105 transition-all duration-300 text-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
            Logout
          </button>
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative max-w-3xl mx-auto mt-12 mb-16">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full p-4 shadow-2xl flex items-center justify-center border-4 border-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="p-10 pt-16 bg-white/70 rounded-3xl shadow-2xl border border-yellow-200 backdrop-blur-lg">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L15 8l6 .5-4.5 4.5L18 20l-6-3.5L6 20l1.5-7L3 8.5 9 8z" />
              </svg>
              <h2 className="text-4xl font-extrabold text-yellow-700 tracking-tight drop-shadow-lg uppercase">Bihar News 24/7</h2>
            </div>
            <span className="text-xl text-yellow-700 font-semibold tracking-wide bg-yellow-100 px-6 py-2 rounded-full shadow">बिहार और झारखंड की सबसे तेज़ खबरें</span>
          </div>
          <label className="block font-semibold mb-2 text-yellow-900">उपशीर्षक</label>
          <input
            type="text"
            value={heroBanner.subtitle}
            onChange={(e) => setHeroBanner({ ...heroBanner, subtitle: e.target.value })}
            className="w-full px-4 py-3 border-2 border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white text-gray-800 mb-3"
            placeholder="बिहार और झारखंड की ताज़ा खबरें"
          />
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-yellow-900">इमेजेज (URL, एक से अधिक)</label>
            {heroBanner.images && heroBanner.images.length > 0 ? heroBanner.images.map((image, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleUpdateHeroBannerImage(index, e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white text-gray-800"
                  placeholder="Image URL"
                />
                <button
                  onClick={() => handleRemoveHeroBannerImage(index)}
                  type="button"
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                  हटाएं
                </button>
              </div>
            )) : (
              <p className="text-yellow-700">कोई इमेज नहीं जोड़ी गई।</p>
            )}
            <button
              onClick={handleAddHeroBannerImage}
              type="button"
              className="mt-2 bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold shadow hover:bg-yellow-700 transition"
            >
              + इमेज जोड़ें
            </button>
          </div>
        </div>
      </section>

      {/* Latest News Section - For Top 3 Images - Changed to Orange Theme */}
      <section className="relative bg-gradient-to-br from-orange-100 via-white to-orange-50 p-0 rounded-2xl shadow-2xl mt-12 mb-16 border-t-4 border-orange-500 max-w-2xl mx-auto transition-transform duration-300 hover:scale-[1.02] group">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-500 rounded-full p-3 shadow-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </div>
        <div className="p-10 pt-16 bg-white/70 rounded-2xl shadow-inner">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-orange-700 tracking-tight drop-shadow-lg">लेटेस्ट न्यूज़ (शीर्ष 3 छवियां)</h2>
          <label className="block font-semibold mb-2 text-orange-900">सेक्शन शीर्षक</label>
          <input
            type="text"
            value={latestNewsTitle}
            onChange={(e) => setLatestNewsTitle(e.target.value)}
            className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white text-gray-800 mb-6 shadow-sm"
            placeholder="लेटेस्ट न्यूज़ सेक्शन का शीर्षक"
          />
          <div className="grid grid-cols-1 gap-8">
            {latestNewsArticles && latestNewsArticles.length > 0 ? (
              latestNewsArticles.map((article, index) => (
                <div key={index} className="bg-orange-50/80 rounded-xl shadow-lg p-6 border border-orange-200 transition-transform duration-300 hover:scale-105">
                  <h3 className="font-bold text-xl mb-4 text-orange-700 flex items-center gap-2 drop-shadow">
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-orange-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 10h16M4 14h16M4 18h16' /></svg>
                    आर्टिकल {index + 1}
                  </h3>
                  <label className="block font-semibold mb-1 text-orange-900">इमेज URL</label>
                  <input
                    type="text"
                    value={article.image}
                    onChange={(e) => handleUpdateLatestNewsArticle(index, 'image', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white text-gray-800 mb-2 shadow-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                  <label className="block font-semibold mb-1 text-orange-900">श्रेणी</label>
                  <select
                    value={article.category}
                    onChange={(e) => handleUpdateLatestNewsArticle(index, 'category', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white text-gray-800 mb-2 shadow-sm"
                  >
                    <option value="">श्रेणी चुनें</option>
                    <option value="बिहार">बिहार</option>
                    <option value="झारखंड">झारखंड</option>
                    <option value="राजनीति">राजनीति</option>
                    <option value="अपराध">अपराध</option>
                    <option value="खेल">खेल</option>
                    <option value="करियर">करियर</option>
                    <option value="विकास">विकास</option>
                    <option value="देश">देश</option>
                  </select>
                  <label className="block font-semibold mb-1 text-orange-900">शीर्षक</label>
                  <input
                    type="text"
                    value={article.title}
                    onChange={(e) => handleUpdateLatestNewsArticle(index, 'title', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white text-gray-800 mb-2 shadow-sm"
                    placeholder="समाचार का शीर्षक"
                  />
                  <label className="block font-semibold mb-1 text-orange-900">लिंक</label>
                  <input
                    type="text"
                    value={article.link}
                    onChange={(e) => handleUpdateLatestNewsArticle(index, 'link', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white text-gray-800 mb-2 shadow-sm"
                    placeholder="/news/article-link"
                  />
                  <label className="block font-semibold mb-1 text-orange-900">स्थान</label>
                  <input
                    type="text"
                    value={article.location}
                    onChange={(e) => handleUpdateLatestNewsArticle(index, 'location', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white text-gray-800 mb-2 shadow-sm"
                    placeholder="पटना"
                  />
                  <label className="block font-semibold mb-1 text-orange-900">समय</label>
                  <input
                    type="text"
                    value={article.time}
                    onChange={(e) => handleUpdateLatestNewsArticle(index, 'time', e.target.value)}
                    className="w-full px-4 py-2 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 bg-white text-gray-800 mb-2 shadow-sm"
                    placeholder="2 घंटे पहले"
                  />
                  <button
                    onClick={() => handleRemoveLatestNewsArticle(index)}
                    type="button"
                    className="bg-red-500 text-white px-3 py-1 rounded-lg font-semibold shadow hover:bg-red-700 hover:scale-105 transition mt-2"
                  >
                    हटाएं
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-1">इस सेक्शन में कोई आर्टिकल नहीं है। जोड़ने के लिए नीचे दिए गए बटन पर क्लिक करें।</p>
            )}
            <button
              onClick={handleAddLatestNewsArticle}
              type="button"
              className="mt-2 bg-gradient-to-r from-orange-500 to-orange-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-orange-600 hover:to-orange-800 hover:scale-105 transition"
            >
              + आर्टिकल जोड़ें
            </button>
          </div>
        </div>
      </section>

      {/* Video News Section - Changed to Red Theme */}
      <section className="relative bg-gradient-to-br from-red-100 via-white to-red-50 p-0 rounded-2xl shadow-2xl mt-12 mb-16 border-t-4 border-red-500 max-w-2xl mx-auto transition-transform duration-300 hover:scale-[1.02] group">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-3 shadow-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553 2.276A1 1 0 0120 13.118V17a2 2 0 01-2 2H6a2 2 0 01-2-2v-3.882a1 1 0 01.447-.842L9 10m6 0V6a2 2 0 00-2-2H9a2 2 0 00-2 2v4m6 0H9" />
          </svg>
        </div>
        <div className="p-10 pt-16 bg-white/70 rounded-2xl shadow-inner">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-red-700 tracking-tight drop-shadow-lg">वीडियो न्यूज़ (YouTube)</h2>
          <label className="block font-semibold mb-2 text-red-900">सेक्शन शीर्षक</label>
          <input
            type="text"
            value={videoNewsTitle}
            onChange={(e) => setVideoNewsTitle(e.target.value)}
            className="w-full px-4 py-3 border-2 border-red-300 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 bg-white text-gray-800 mb-6 shadow-sm"
            placeholder="वीडियो न्यूज़ सेक्शन का शीर्षक"
          />
          <div className="grid grid-cols-1 gap-8">
            {videos.map((video, index) => (
              <div key={index} className="bg-red-50/80 rounded-xl shadow-lg p-6 border border-red-200 transition-transform duration-300 hover:scale-105">
                <label className="block font-semibold mb-1 text-red-900">YouTube वीडियो URL</label>
                <input
                  type="text"
                  value={video}
                  onChange={(e) => handleUpdateVideo(index, e.target.value)}
                  className="w-full px-4 py-2 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 bg-white text-gray-800 mb-2 shadow-sm"
                  placeholder="https://youtu.be/VIDEO_ID"
                />
                <p className="text-sm text-gray-600 mb-2">उदाहरण: https://youtu.be/dQw4w9WgXcQ</p>
                <button
                  onClick={() => handleRemoveVideo(index)}
                  type="button"
                  className="bg-red-500 text-white px-3 py-1 rounded-lg font-semibold shadow hover:bg-red-700 hover:scale-105 transition mt-2"
                >
                  हटाएं
                </button>
              </div>
            ))}
            <button
              onClick={handleAddVideo}
              type="button"
              className="mt-2 bg-gradient-to-r from-red-500 to-red-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-red-600 hover:to-red-800 hover:scale-105 transition"
            >
              + वीडियो जोड़ें
            </button>
          </div>
        </div>
      </section>

      {/* Popular Tags Section */}
      <section className="relative bg-gradient-to-br from-blue-100 via-white to-blue-50 p-0 rounded-2xl shadow-2xl mt-12 mb-16 border-t-4 border-blue-500 max-w-2xl mx-auto transition-transform duration-300 hover:scale-[1.02] group">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-500 rounded-full p-3 shadow-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </div>
        <div className="p-10 pt-16 bg-white/70 rounded-2xl shadow-inner">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-blue-700 tracking-tight drop-shadow-lg">पॉपुलर टैग्स</h2>
          <label className="block font-semibold mb-2 text-blue-900">टैग्स (कॉमा से अलग करें)</label>
          <input
            type="text"
            value={popularTags.join(', ')}
            onChange={(e) => setPopularTags(e.target.value.split(',').map(tag => tag.trim()))}
            className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white text-gray-800 mb-4 shadow-sm"
            placeholder="यहाँ टैग्स लिखें, जैसे: राजनीति, बिहार, खेल"
          />
        </div>
      </section>

      {/* Newsletter Section - Changed to Emerald Theme */}
      <section className="relative bg-gradient-to-br from-emerald-100 via-white to-emerald-50 p-0 rounded-2xl shadow-2xl mt-12 mb-16 border-t-4 border-emerald-500 max-w-2xl mx-auto transition-transform duration-300 hover:scale-[1.02] group">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-500 rounded-full p-3 shadow-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="p-10 pt-16 bg-white/70 rounded-2xl shadow-inner">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-emerald-700 tracking-tight drop-shadow-lg">न्यूज़लेटर</h2>
          <label className="block font-semibold mb-2 text-emerald-900">शीर्षक</label>
          <input
            type="text"
            value={newsletterTitle}
            onChange={(e) => setNewsletterTitle(e.target.value)}
            className="w-full px-4 py-3 border-2 border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-white text-gray-800 mb-6 shadow-sm"
            placeholder="न्यूज़लेटर का शीर्षक"
          />
          <label className="block font-semibold mb-2 text-emerald-900">विवरण</label>
          <input
            type="text"
            value={newsletterDescription}
            onChange={(e) => setNewsletterDescription(e.target.value)}
            className="w-full px-4 py-3 border-2 border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-white text-gray-800 shadow-sm"
            placeholder="न्यूज़लेटर का विवरण"
          />
        </div>
      </section>

      {/* News Post Section - Changed to Teal Theme */}
      <section id="news-form-section" className="relative bg-gradient-to-br from-teal-50 to-white p-0 rounded-xl shadow-lg mt-12 mb-12 border-t-4 border-teal-600 max-w-2xl mx-auto">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-teal-600 rounded-full p-3 shadow-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h2l2-2h2l2 2h2a2 2 0 012 2v12a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="p-8 pt-12">
          <h2 className="text-3xl font-extrabold mb-6 text-center text-teal-700 tracking-tight flex items-center justify-center gap-2">
            <span>{editingPostId ? 'समाचार एडिट करें' : 'समाचार जोड़ें'}</span>
            <span className="text-xl text-teal-400">(श्रेणी अनुसार)</span>
          </h2>
          <form onSubmit={handleNewsFormSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2 text-teal-900">श्रेणी <span className="text-red-500">*</span></label>
              <select
                name="category"
                value={newsForm.category}
                onChange={handleNewsFormChange}
                className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-white text-gray-800"
                required
              >
                <option value="">श्रेणी चुनें</option>
                {['बिहार', 'झारखंड', 'राजनीति', 'अपराध', 'खेल'].map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-2 text-teal-900">शीर्षक <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="heading"
                value={newsForm.heading}
                onChange={handleNewsFormChange}
                className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-white text-gray-800"
                placeholder="समाचार का शीर्षक लिखें"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-teal-900">छवि जोड़ें</label>
              <input
                type="text"
                name="image"
                value={newsForm.image}
                onChange={handleNewsFormChange}
                className="w-full px-4 py-2 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-white text-gray-800"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-2 text-teal-900">समाचार <span className="text-red-500">*</span></label>
              <textarea
                name="news"
                value={newsForm.news}
                onChange={handleNewsFormChange}
                className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-teal-400 bg-white text-gray-800"
                rows={5}
                placeholder="यहाँ समाचार लिखें..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={isNewsSubmitting}
              className="w-full bg-gradient-to-r from-teal-600 to-teal-800 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:from-teal-700 hover:to-teal-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isNewsSubmitting ? 'सबमिट हो रहा है...' : (editingPostId ? 'पोस्ट अपडेट करें' : 'समाचार पोस्ट करें')}
            </button>
            {editingPostId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full bg-gray-500 text-white py-2 rounded-lg font-bold hover:bg-gray-600 transition"
              >
                कैंसल
              </button>
            )}
          </form>
          {message && <div className="mt-6 text-center text-green-700 font-semibold text-lg animate-pulse">{message}</div>}
        </div>
      </section>

      {/* News Posts List */}
      <section className="relative bg-gradient-to-br from-gray-100 via-white to-gray-50 p-0 rounded-2xl shadow-2xl mt-12 mb-16 border-t-4 border-gray-400 max-w-2xl mx-auto transition-transform duration-300 hover:scale-[1.02] group">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-500 rounded-full p-3 shadow-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="p-10 pt-16 bg-white/70 rounded-2xl shadow-inner">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-700 tracking-tight drop-shadow-lg">मौजूदा समाचार पोस्ट</h2>
          <div className="space-y-4">
              {newsPosts.slice().reverse().map(post => (
                  <div key={post._id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center transition-all hover:shadow-lg hover:scale-[1.02]">
                      <div>
                          <h3 className="font-bold text-gray-800 text-lg">{post.heading}</h3>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-gray-200 mt-2">
                              {post.category}
                          </span>
                      </div>
                      <div className="flex space-x-2 flex-shrink-0 ml-4">
                          <button onClick={() => handleEditNews(post)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors shadow">एडिट</button>
                          <button onClick={() => handleDeleteNews(post._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow">डिलीट</button>
                      </div>
                  </div>
              ))}
              {newsPosts.length === 0 && <p className="text-center text-gray-500 py-4">कोई समाचार पोस्ट नहीं मिला।</p>}
          </div>
        </div>
      </section>


      {/* Marquee Items Section - Changed to Indigo Theme */}
      <section className="relative bg-gradient-to-br from-indigo-200 via-white to-indigo-50 p-0 rounded-2xl shadow-2xl mt-12 mb-16 border-t-4 border-indigo-500 max-w-2xl mx-auto transition-transform duration-300 hover:scale-[1.02] group">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-indigo-500 rounded-full p-3 shadow-lg flex items-center justify-center">
          <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2' /><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 12v.01' /></svg>
        </div>
        <div className="p-10 pt-16 bg-white/70 rounded-2xl shadow-inner">
          <h2 className="text-4xl font-extrabold mb-8 text-center text-indigo-700 tracking-tight drop-shadow-lg">मार्की (चलती खबरें)</h2>
          <label className="block font-semibold mb-2 text-indigo-900">मार्की न्यूज़ (कॉमा से अलग करें)</label>
          <input
            type="text"
            value={marqueeItems.join(', ')}
            onChange={e => setMarqueeItems(e.target.value.split(',').map(item => item.trim()))}
            className="w-full px-4 py-3 border-2 border-indigo-300 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-white text-gray-800 mb-6 shadow-sm"
            placeholder="यहाँ चलती खबरें लिखें, जैसे: खबर 1, खबर 2, खबर 3"
          />
          <button
            type="button"
            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-indigo-600 hover:to-indigo-800 hover:scale-105 transition mt-2"
          >
           चलती खबरें
          </button>
        </div>
      </section>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </div>
  );
};

export default AdminLogin; 