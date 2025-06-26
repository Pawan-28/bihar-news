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
    "हर्षित के कलम से",
    "विचारों की अभिव्यक्ति",
    "हर्षित के कलम से",
    "विचारों की अभिव्यक्ति",
    "हर्षित के कलम से",
    "विचारों की अभिव्यक्ति",
    "हर्षित के कलम से",
    "विचारों की अभिव्यक्ति",
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
    <header className="sticky top-0 z-50 bg-white shadow-md notranslate">
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
      <nav className="bg-gradient-to-r from-indigo-800 via-red-700 to-indigo-800 text-white">
        <div className="container max-w-[1350px] mx-auto px-6 py-2 flex items-center justify-between">
          {/* Logo */}
          <Link
  to="/"
  className="group flex items-center space-x-2 transition-all duration-300 hover:scale-105"
>
<div className="relative w-16 h-16 rounded-full overflow-hidden shadow-lg group-hover:rotate-6 transition-transform duration-300 flex items-center justify-center">
  <img
    src="/kalam.png"
    alt="Mic Icon"
    className="w-14 h-14 object-contain rounded-full"
  />
</div>

  <div className="flex flex-col leading-tight">
    <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight group-hover:text-yellow-300 transition-colors duration-300">
    हर्षित के कलम से
    </span>
    <span className="text-xs sm:text-sm font-medium text-gray-300 tracking-wider group-hover:text-pink-300 transition-colors duration-300">
      {language === 'hindi' ? 'विचारों की आवाज़' : 'Voice of Thoughts'}
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
                    whitespace-nowrap transition-colors duration-300 px-1 pb-1 text-sm
                    flex-shrink-0 relative group
                    ${
                      location.pathname === item.path
                        ? "text-yellow-300"
                        : "text-white hover:text-yellow-300"
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