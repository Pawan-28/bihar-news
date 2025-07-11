import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [language, setLanguage] = React.useState('hindi');
  const location = useLocation();

  const navItems = {
    hindi: [
      { name: "होम", path: "/" },
      // { name: "चुनाव", path: "/election" },
      { name: "बिहार", path: "/bihar" },
      { name: "झारखंड", path: "/jharkhand" },
      // { name: "देश", path: "/nation" },
      { name: "राजनीति", path: "/politics" },
      { name: "जुर्म", path: "/crime" },
      { name: "खेल", path: "/sports" },
      // { name: "करियर", path: "/career" },
    //   { name: "लाइफ स्टाइल", path: "/lifestyle" },
    //   { name: "मूवी मसाला", path: "/category/entertainment" },
    //   { name: "धर्म", path: "/dharm" },
    //   { name: "कारोबार", path: "/category/business" }
     ],
    english: [
      { name: "Home", path: "/" },
      // { name: "Elections", path: "/election" },
      { name: "Bihar", path: "/bihar" },
      { name: "Jharkhand", path: "/jharkhand" },
      // { name: "Nation", path: "/nation" },
      { name: "Politics", path: "/politics" },
      { name: "Crime", path: "/crime" },
      { name: "Sports", path: "/sports" },
      // { name: "Career", path: "/career" },
      // { name: "Lifestyle", path: "/lifestyle" },
      // { name: "Entertainment", path: "/category/entertainment" },
      // { name: "Religion", path: "/dharm" },
      // { name: "Business", path: "/category/business" }
    ]
  };

  const hindiMarqueeItems = [
    "न्यूज़ बिहार 24/7: हर खबर, हर समय",
    "आपके मुद्दे, हमारी आवाज़ - न्यूज़ बिहार 24/7",
    "बिहार-झारखंड की सबसे तेज़ खबरें",
    "24 घंटे, 7 दिन - सिर्फ सच्ची खबरें",
    "न्यूज़ बिहार 24/7: आपकी नज़र, हमारी खबर",
    "हर पल की ताज़ा अपडेट - न्यूज़ बिहार 24/7",
    "बिहार की धड़कन, झारखंड की आवाज़",
    "सच्ची, निष्पक्ष, सबसे पहले - न्यूज़ बिहार 24/7"
  ];
const englishMarqueeItems = [
    "Harshit ke Kalam se",
    "Unleashing Thoughts",
    "Harshit ke Kalam se",
    "Unleashing Thoughts",
    "Harshit ke Kalam se",
    "Unleashing Thoughts",
    "Harshit ke Kalam se",
    "Unleashing Thoughts",
   
  ];

  return (
    <header className="bg-gradient-to-r from-[#141e30] to-[#243b55] text-white sticky top-0 z-50 shadow-md notranslate">
      {/* Compact Language Toggle */}
     
      <div className="bg-gradient-to-r from-gray-900 to-black text-gray-200 text-xs py-1.5">
        <div className="container max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="hidden sm:inline-flex items-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>Patna, Bihar</span>
            </span>
            <span className="hidden md:inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>{new Date().toLocaleDateString(language === 'hindi' ? 'hi-IN' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => setLanguage('hindi')}
              className={`px-3 py-0.5 rounded-md transition-all duration-200 flex items-center ${
                language === 'hindi' 
                  ? 'bg-amber-500 text-gray-900 font-bold shadow-inner scale-105' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span className="mr-1">🇮🇳</span> हिंदी
            </button>
            <button 
              onClick={() => setLanguage('english')}
              className={`px-3 py-0.5 rounded-md transition-all duration-200 flex items-center ${
                language === 'english' 
                  ? 'bg-amber-500 text-gray-900 font-bold shadow-inner scale-105' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span className="mr-1">🌐</span> English
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-gradient-to-r from-[#141e30] to-[#243b55] text-white shadow-lg border-b-2 border-blue-900">
        <div className="container max-w-[1350px] mx-auto px-4 py-1 flex items-center justify-between min-h-[60px]">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center space-x-2 transition-all duration-300 hover:scale-105"
          >
            {/* Compact Decorated News Bihar 24/7 Logo SVG */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="logoBg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#fff"/>
                    <stop offset="100%" stopColor="#f59e42"/>
                  </radialGradient>
                </defs>
                <circle cx="28" cy="28" r="25" fill="url(#logoBg)" stroke="#ea580c" strokeWidth="2"/>
                <rect x="10" y="36" width="36" height="7" rx="3.5" fill="#ea580c" opacity="0.13"/>
                <g>
                  <text x="50%" y="29" textAnchor="middle" fill="#b91c1c" fontSize="13" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">NEWS</text>
                  <text x="50%" y="41" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="bold" fontFamily="Arial, sans-serif">Bihar 24/7</text>
                </g>
                <g>
                  <rect x="16" y="10" width="24" height="5" rx="2.5" fill="#ea580c"/>
                  <rect x="20" y="13" width="16" height="2" rx="1" fill="#fff"/>
                  <circle cx="28" cy="10" r="2" fill="#fff"/>
                </g>
              </svg>
            </div>
            <div className="flex flex-col leading-tight ml-1">
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-lg">
                News Bihar 24/7
              </span>
              <span className="text-xs sm:text-sm font-semibold text-blue-100 tracking-wide">
                {language === 'hindi' ? 'आपकी नज़र, हमारी खबर' : 'Voice of Bihar'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Full Width with Scroll */}
          <div className="hidden md:flex flex-1 overflow-x-auto scrollbar-hide ml-6">
            <div className="flex space-x-6 mx-auto">
              {navItems[language].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`
                    whitespace-nowrap transition-colors duration-300 px-1 pb-1 text-base font-semibold
                    flex-shrink-0 relative group
                    ${
                      location.pathname === item.path
                        ? "text-blue-100 underline underline-offset-4 decoration-blue-300 drop-shadow"
                        : "text-white hover:text-blue-100 hover:underline hover:decoration-blue-200 hover:drop-shadow"
                    }
                  `}
                >
                  {item.name}
                  
                  {/* Animated underline - visible on hover/active */}
                  <span className={`
                    absolute left-0 -bottom-0.5 w-full h-0.5 bg-yellow-300 rounded-full
                    transition-transform duration-300 origin-left
                    ${
                      location.pathname === item.path
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }
                  `}></span>
                  
                  {/* Glowing dot for active item */}
                  {location.pathname === item.path && (
                    <span className="absolute -top-1 right-0 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-500 focus:outline-none p-1 bg-opacity-10"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-indigo-800 to-blue-900 text-white">
          <div className="container mx-auto px-4 py-2 grid grid-cols-2 gap-3">
            {navItems[language].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`
                  px-3 py-2.5 rounded-lg transition-all duration-300 text-sm
                  flex items-center justify-center text-center
                  ${
                    location.pathname === item.path
                      ? "bg-yellow-500 text-gray-900 font-bold shadow-lg"
                      : "text-white hover:bg-indigo-700 hover:font-medium"
                  }
                `}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
                {location.pathname === item.path && (
                  <span className="ml-2 w-2 h-2 bg-amber-800 rounded-full animate-pulse"></span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      
      <div className="relative bg-gray-200 border-t border-b border-gray-300 py-1.5 overflow-hidden">
        <div className="container mx-auto px-6 flex items-center relative">
          {/* LIVE Badge */}
          <div className="flex-shrink-0 bg-gradient-to-r from-blue-700 to-red-800 text-white px-3 py-0.5 font-bold mr-4 flex items-center rounded-l-full outline-none">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-4 animate-pulse"></div>
            {language === 'hindi' ? 'लाइव' : 'LIVE'}
          </div>

          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-gray-200 to-transparent z-10" />
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-gray-200 to-transparent z-10" />

          {/* Marquee */}
          <div className="flex-1 whitespace-nowrap overflow-hidden">
            <div className="animate-marquee inline-flex space-x-10 min-w-full">
              {(language === 'hindi' ? hindiMarqueeItems : englishMarqueeItems).map((item, index) => (
                <span 
                  key={index} 
                  className="text-gray-800 text-sm font-medium flex items-center"
                >
                  <span className="bg-red-600 w-1.5 h-1.5 rounded-full mx-2"></span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </header>
  );
};

export default Header;