import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = ({ footerLogoParts, footerDescription, footerContactInfo, footerQuickLinksCategories }) => {
  const brandName = "News Bihar 24/7";
  const contactInfo = footerContactInfo || { 
    email: 'news24/7@gmail.com', 
    phone: '+91 1234567894', 
    address: 'Creative Corner, Noida, India' 
  };
  
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: <FaFacebookF size={16} />, url: "https://www.facebook.com/harsita.ke.kalama.se/", color: "hover:bg-[#1877F2]" },
    { icon: <FaTwitter size={16} />, url: "https://twitter.com", color: "hover:bg-[#1DA1F2]" },
    { icon: <FaInstagram size={16} />, url: "https://instagram.com", color: "hover:bg-gradient-to-tr from-[#833AB4] via-[#E1306C] to-[#FCAF45]" },
    { icon: <FaYoutube size={16} />, url: "https://youtube.com", color: "hover:bg-[#FF0000]" }
  ];

  return (
    <footer className="bg-gradient-to-r from-[#141e30] to-[#243b55] text-white pt-4 md:pt-6 pb-2 notranslate shadow-2xl border-t border-blue-900/40">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-4">
          {/* Brand Column */}
          <div className="space-y-3 md:space-y-4 bg-white/10 rounded-2xl shadow-lg p-4 flex flex-col justify-between border border-white/10 backdrop-blur-md">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="footerLogoBg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                      <stop offset="0%" stopColor="#fff"/>
                      <stop offset="100%" stopColor="#f59e42"/>
                    </radialGradient>
                  </defs>
                  <circle cx="28" cy="28" r="25" fill="url(#footerLogoBg)" stroke="#ea580c" strokeWidth="2"/>
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
              <div>
                <h2 className="text-base sm:text-lg font-black text-white group-hover:text-yellow-400 transition-colors duration-300 tracking-tight">
                  News Bihar 24/7
                </h2>
                <p className="text-xs font-semibold text-white">
                  {footerDescription || 'बिहार की धड़कन, झारखंड की आवाज़'}
                </p>
              </div>
            </Link>
            
            <p className="text-white text-xs sm:text-sm leading-relaxed">
            गहन विचार और मुद्दा प्रस्तुत करना। हर्षित के कलम से चिंतन, अंतर्दृष्टि और रचनात्मक अभिव्यक्तियों में गहराई से उतरें।
            </p>
            
            <div className="flex space-x-2 mt-1">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-8 h-8 rounded-full bg-white/20 border border-white/20 flex items-center justify-center text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 ${link.color}`}
                  style={{backdropFilter:'blur(4px)'}}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {/* <div className="space-y-5 md:space-y-6 bg-white/10 rounded-2xl shadow-lg p-6 border border-white/10 backdrop-blur-md">
            <h3 className="text-base sm:text-lg font-bold text-white border-l-4 border-yellow-500 pl-3 py-1">Quick Links</h3>
            <ul className="flex flex-wrap gap-3 mt-2">
              {['Home', 'About', 'Contact', 'Advertise', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-blue-100 font-semibold shadow hover:from-blue-700 hover:to-blue-800 hover:text-white transition-all duration-200 text-sm border border-blue-800/30"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Categories */}
          <div className="space-y-3 md:space-y-4 bg-white/10 rounded-2xl shadow-lg p-4 border border-white/10 backdrop-blur-md">
            <h3 className="text-sm sm:text-base font-bold text-white border-l-4 border-pink-500 pl-3 py-1">Categories</h3>
            <ul className="flex flex-wrap gap-2 mt-1">
              {[
                { name: 'बिहार', path: '/bihar' },
                { name: 'झारखंड', path: '/jharkhand' },
                { name: 'राजनीति', path: '/politics' },
                { name: 'जुर्म', path: '/crime' },
                { name: 'खेल', path: '/sports' }
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-blue-900 via-blue-700 to-blue-900 text-blue-100 font-semibold shadow hover:from-blue-700 hover:to-blue-800 hover:text-white transition-all duration-200 text-xs sm:text-sm border border-blue-800/30 whitespace-nowrap"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-3 md:space-y-4 bg-white/10 rounded-2xl shadow-lg p-4 border border-white/10 backdrop-blur-md">
            <h3 className="text-sm sm:text-base font-bold text-white border-l-4 border-indigo-500 pl-3 py-1">Stay Updated</h3>
            
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-indigo-100 mt-1 flex-shrink-0" />
                <span className="text-white text-xs sm:text-sm">{contactInfo.address}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <FaPhone className="text-indigo-100" />
                <a href={`tel:${contactInfo.phone}`} className="text-white hover:text-indigo-100 transition-colors text-xs sm:text-sm">
                  {contactInfo.phone}
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-100" />
                <a href={`mailto:${contactInfo.email}`} className="text-white hover:text-indigo-100 transition-colors text-xs sm:text-sm">
                  {contactInfo.email}
                </a>
              </div>
            </div>
            
            <div className="mt-2 md:mt-3">
              <h4 className="text-white font-medium mb-1 md:mb-2 text-xs sm:text-sm">Subscribe to our newsletter</h4>
              <form className="flex flex-col gap-1 md:gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 rounded-full bg-white/20 text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 text-xs sm:text-sm border border-blue-200/40 shadow"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-700 via-blue-500 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-bold py-1 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/20 text-xs sm:text-sm"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright & Bottom Info */}
        <div className="py-2 md:py-3 px-2 md:px-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-3 bg-white/10 rounded-xl mt-4 mb-4 sm:mb-0 shadow border border-white/10 backdrop-blur-md mx-2 md:mx-4">
          <p className="text-white text-xs sm:text-xs">
            © {currentYear} {brandName}. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 text-gray-500 text-xs sm:text-xs">
            <Link to="/privacy-policy" className="text-white hover:text-indigo-100 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-white hover:text-indigo-100 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="text-white hover:text-indigo-100 transition-colors">Contact</Link>
          </div>
          
          <div className="flex items-center">
          <a
    href="https://pigo-pi.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-xs text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-green-400"
  >
    Powered By PigoPi
  </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;