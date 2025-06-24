import React from 'react';

const Lifestyle = () => {
  const lifestyleNews = [
    {
      id: 1,
      title: "Monsoon Trip: मानसून में घुमने का है प्लान, तो यह जगह है बेस्ट",
      description: "तपती गर्मी से अब लोगों को राहत मिलने वाली है, क्योंकि मानसून की दस्तक के साथ ही बारिश का पूर्वानुमान जारी हो चुका है..."
    },
    {
      id: 2,
      title: "Life Style: बच्चों और किशोरों की नींद सुधारने के लिए अपनाएं ये आसान उपाय",
      description: "बचपन और किशोरावस्था में नींद की गड़बड़ी एक आम समस्या है, लेकिन समय रहते इस पर ध्यान देना बेहद ज़रूरी है..."
    },
    {
      id: 3,
      title: "Life Style: सेहत के लिए सेंधा नमक वाला पानी क्यों है जरूरी?",
      description: "शरीर को स्वस्थ और एनर्जेटिक बनाए रखने के लिए केवल अच्छा खानपान ही जरूरी नहीं,बल्कि सही मात्रा में पानी पीना भी उतना ही अहम होता है..."
    },
    {
      id: 4,
      title: "Life Style: हर जिद पूरी करना नहीं है परवरिश का सही तरीका",
      description: "बच्चे छोटे हों या बड़े, वे अक्सर पैरेंट्स से किसी न किसी चीज़ की जिद करते रहते हैं..."
    },
    {
      id: 5,
      title: "Life Style: भीषण गर्मी में उल्टी और दस्त की शिकायत बढ़ी",
      description: "राजधानी पटना में पिछले चार से पांच दिनों से झुलसाने वाली गर्मी पड़ रही है..."
    },
    {
      id: 6,
      title: "Life Style: आम की दीवानगी पड़ सकती है भारी",
      description: "गर्मी का मौसम और आम इन दोनों का रिश्ता बेहद खास होता है..."
    }
  ];

  const trendingTopics = [
    "#MonsoonTravel",
    "#ParentingTips",
    "#SummerHealth",
    "#HealthyLiving",
    "#Ayurveda"
  ];

  const healthTips = [
    {
      id: 1,
      title: "Glowing skin routine: रात की इस एक आदत से चेहरे पर हमेशा रहेगा निखार",
      description: "आज की भागदौड़ भरी ज़िंदगी में सबसे ज़्यादा असर हमारे चेहरे की त्वचा पर पड़ता है..."
    },
    {
      id: 2,
      title: "Tea drinking habits: चाय पीने का सही तरीका नहीं पता?",
      description: "सुबह उठते ही चाय पीना, हर खाने के बाद चाय की तलब लगना या फिर रात को सोने से पहले एक कप ये आदतें आम जरूर हैं..."
    },
    {
      id: 3,
      title: "Anger effects on health: गुस्सा बन सकता है सेहत का दुश्मन",
      description: "गुस्सा आना, हंसना, रोना और मुस्कुरानाइन सभी की तरह एक स्वाभाविक मानवीय भावना है..."
    }
  ];

  const foodArticles = [
    {
      id: 1,
      title: "Life Style: पोषक तत्वों से भरपूर है यह सुपरफूड",
      description: "शकरकंद (Sweet Potato)को इसकी अद्भुत पौष्टिकता के कारण सुपरफूड की श्रेणी में रखा गया है..."
    },
    {
      id: 2,
      title: "Tea and biscuit: सुबह खाली पेट चाय और बिस्किट का कॉम्बिनेशन आपके स्वास्थ्य को पहुंचा सकता है बड़ा नुकसान",
      description: "भारत ही नहीं, पूरी दुनिया में लोग सुबह की शुरुआत चाय से करते हैं..."
    },
    {
      id: 3,
      title: "Orange Benefits: गर्मियों में खाएं रोज एक संतरा",
      description: "गर्मी का मौसम आते ही शरीर को ठंडक और ताजगी की जरूरत पड़ती है..."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 font-sans">
      {/* Main Heading */}
      <h1 className="text-3xl font-bold text-purple-800 border-b-2 border-purple-800 pb-2 mb-6">
        Lifestyle & Wellness
      </h1>
      
      {/* News Grid */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Latest Lifestyle News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lifestyleNews.map(news => (
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
      
      {/* Health Tips */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Health & Wellness Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {healthTips.map(tip => (
            <div 
              key={tip.id}
              className="bg-blue-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Food Articles */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Food & Nutrition</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {foodArticles.map(article => (
            <div 
              key={article.id}
              className="bg-green-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-green-800 mb-2">{article.title}</h3>
                <p className="text-gray-600">{article.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Trending Topics */}
      <div className="bg-yellow-50 rounded-lg p-5 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Trending in Lifestyle</h3>
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
          <a href="#" className="text-purple-600 hover:underline">Travel</a>
          <a href="#" className="text-purple-600 hover:underline">Parenting</a>
          <a href="#" className="text-purple-600 hover:underline">Health</a>
          <a href="#" className="text-purple-600 hover:underline">Food</a>
        </div>
      </div>
    </div>
  );
};

export default Lifestyle;