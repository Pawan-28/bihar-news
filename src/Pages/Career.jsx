import React from 'react';

const Career = () => {
  const careerNews = [
    {
      id: 1,
      title: "NEET UG 2025: नीट यूजी 2025 की काउंसिलिंग शुरू, बिहार में MBBS की 1490 और BDS की 140 सीटें उपलब्ध",
      description: "नीट यूजी 2025 परीक्षा का रिजल्ट जारी होते ही मेडिकल कॉलेजों में दाखिले की प्रक्रिया भी जल्द शुरू होने वाली है..."
    },
    {
      id: 2,
      title: "How to Become Pilot: 12वीं के बाद पायलट बनने का सपना करें पूरा, जानें... कौन सा कोर्स है जरूरी",
      description: "अगर आप भी 12वीं के बाद पायलट बनाना चाहते है, तो यह खबर आपके लिए है..."
    },
    {
      id: 3,
      title: "Bihar News: 19 जून को इस जिले में लगेगा रोजगार कैंप, 8वीं पास से लेकर ITI वालों तक के लिए नौकरी",
      description: "बिहार के मुंगेर जिले के बेरोजगार युवाओं के लिए एक सुनहरा अवसर जल्द आ रहा है..."
    },
    {
      id: 4,
      title: "Success Story: कौन है बिहार के IPS कार्तिकेय शर्मा जिन्होंने अपराधियों की नींद उड़ा दी?",
      description: "आईपीएस कार्तिकेय शर्मा आज बिहार पुलिस सेवा का एक ऐसा नाम बन चुके हैं..."
    },
    {
      id: 5,
      title: "नीट 2025 में गोल इन्स्टीट्यूट के छात्रों ने लहराया परचम, 5400 से अधिक छात्र सफल",
      description: "गोल इन्स्टीट्यूट के छात्रों ने नीट 2025 के परिणाम में एक बार फिर से उत्कृष्ट प्रदर्शन करते हुए संस्थान का नाम रौशन किया है..."
    },
    {
      id: 6,
      title: "NEET UG Result 2025: नीट 2025 परीक्षा में पटना के छात्रों का जलवा",
      description: "आकाश पटना सेंटर के छात्र सौरभ कुमार ने नीट 2025 के एग्जाम में 720 में 625 नंबर ला के पटना के टॉपर बने..."
    }
  ];

  const trendingTopics = [
    "#NEET2025",
    "#BiharJobs",
    "#UPSCSuccess",
    "#MedicalAdmission",
    "#GovernmentJobs"
  ];

  const successStories = [
    {
      id: 1,
      title: "चाट-समोसा बेचने वाले की बेटी बनी IAS अधिकारी",
      description: "सिविल सेवा परीक्षा (UPSC)पास करना कोई आसान काम नहीं है..."
    },
    {
      id: 2,
      title: "तीसरी कोशिश में UPSC में लहराया परचम, जानिए... IAS नेहा भोसले की सफलता की कहानी",
      description: "अगर मेहनत और लगन से कोई भी काम किया जाए, तो परिश्रम रंग जरूर लाता है..."
    },
    {
      id: 3,
      title: "छोटे से गांव का लड़का बना IAS अधिकारी, AI की मदद से पढ़ाई कर UPSC में लहराया परचम",
      description: "अगर मेहनत और लगन से परिश्रम किया जाए,तो सफलता तय होती है..."
    }
  ];

  const jobUpdates = [
    {
      id: 1,
      title: "Bihar Police Constable Recruitment 2025: बिहार पुलिस सिपाही भर्ती लिखित परीक्षा 2025 का शेड्यूल जारी",
      description: "बिहार पुलिस में 19,838 सिपाही पदों की बहाली के लिए केंद्रीय चयन पर्षद ने अब लिखित परीक्षा की तिथि आज घोषित कर दी है..."
    },
    {
      id: 2,
      title: "Government job update : इस राज्य में 7वीं और 10वीं पास के लिए सरकारी नौकरी का सुनहरा मौका!",
      description: "झारखंड गृह रक्षा वाहिनी ने 7वीं और 10वीं पास उम्मीदवारों के लिए होमगार्ड के 1614 पदों पर भर्ती की घोषणा की है..."
    },
    {
      id: 3,
      title: "Bihar Librarian: 2010 के बाद पहली बार बिहार में हाई स्कूल लाइब्रेरियन भर्ती",
      description: "बिहार में सरकारी नौकरी की राह देख रहे युवाओं के लिए शिक्षा विभाग ने एक बड़ी खुशखबरी दे दी है..."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans">
      {/* Main Heading */}
      <h1 className="text-3xl font-bold text-blue-800 border-b-2 border-blue-800 pb-2 mb-6">
        Career News & Updates
      </h1>
      
      {/* News Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Career News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerNews.map(news => (
            <div 
              key={news.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{news.title}</h3>
                <p className="text-gray-600">{news.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Success Stories */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {successStories.map(story => (
            <div 
              key={story.id}
              className="bg-green-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-2">{story.title}</h3>
                <p className="text-gray-600">{story.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Job Updates */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Job Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobUpdates.map(job => (
            <div 
              key={job.id}
              className="bg-blue-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">{job.title}</h3>
                <p className="text-gray-600">{job.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Trending Topics */}
      <div className="bg-yellow-50 rounded-lg p-5 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Trending in Career</h3>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic, index) => (
            <span 
              key={index}
              className="bg-yellow-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>
      
      {/* Quick Links */}
      <div className="bg-gray-100 rounded-lg p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Links</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="#" className="text-blue-600 hover:underline">NEET Counselling</a>
          <a href="#" className="text-blue-600 hover:underline">UPSC Preparation</a>
          <a href="#" className="text-blue-600 hover:underline">Bihar Govt Jobs</a>
          <a href="#" className="text-blue-600 hover:underline">JEE Advanced</a>
        </div>
      </div>
    </div>
  );
};

export default Career;