import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = ({ footerLogoParts, footerDescription, footerContactInfo, footerQuickLinksCategories }) => {
  const brandName = "Harshit ke Kalam se";
  const contactInfo = footerContactInfo || { 
    email: 'Harshitkr@gmail.com', 
    phone: '+91 80905 41266', 
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
    <footer className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white pt-10 md:pt-14 mt-16 notranslate">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 pb-10 border-b border-gray-700">
          {/* Brand Column */}
          <div className="space-y-5 md:space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-lg flex items-center justify-center bg-white">
                <img
                  src="/kalam.jpg"
                  alt="Mic Icon"
                  className="w-12 h-12 object-contain rounded-full"
                />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white group-hover:text-yellow-400 transition-colors duration-300 tracking-tight">
                हर्षित के कलम से
                </h2>
                <p className="text-xs font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500">
                  {footerDescription || 'आपका मुद्दा हमारी आवाज'}
                </p>
              </div>
            </Link>
            
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            गहन विचार और मुद्दा प्रस्तुत करना। हर्षित के कलम से चिंतन, अंतर्दृष्टि और रचनात्मक अभिव्यक्तियों में गहराई से उतरें।
            </p>
            
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 transition-all duration-300 ${link.color} hover:text-white`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5 md:space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-white border-l-4 border-yellow-500 pl-3 py-1">Quick Links</h3>
            <ul className="space-y-2 md:space-y-3">
              {['Home', 'About', 'Contact', 'Advertise', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition-colors duration-300 group text-sm sm:text-base"
                  >
                    <span className="w-2 h-2 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-5 md:space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-white border-l-4 border-pink-500 pl-3 py-1">Categories</h3>
            <ul className="space-y-2 md:space-y-3">
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
                    className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors duration-300 group text-sm sm:text-base"
                  >
                    <span className="w-2 h-2 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-5 md:space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-white border-l-4 border-indigo-500 pl-3 py-1">Stay Updated</h3>
            
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-indigo-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">{contactInfo.address}</span>
              </div>
              
              <div className="flex items-center gap-3">
                <FaPhone className="text-indigo-400" />
                <a href={`tel:${contactInfo.phone}`} className="text-gray-400 hover:text-indigo-400 transition-colors text-sm sm:text-base">
                  {contactInfo.phone}
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-400" />
                <a href={`mailto:${contactInfo.email}`} className="text-gray-400 hover:text-indigo-400 transition-colors text-sm sm:text-base">
                  {contactInfo.email}
                </a>
              </div>
            </div>
            
            <div className="mt-3 md:mt-4">
              <h4 className="text-gray-300 font-medium mb-2 md:mb-3 text-sm sm:text-base">Subscribe to our newsletter</h4>
              <form className="flex flex-col gap-2 md:gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base border border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-medium py-2 md:py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/20 text-sm sm:text-base"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright & Bottom Info */}
        <div className="py-6 md:py-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-gray-500 text-xs sm:text-sm">
            © {currentYear} {brandName}. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-gray-500 text-xs sm:text-sm">
            <Link to="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link>
          </div>
          
          <div className="flex items-center">
            <span className="text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 font-semibold">
              Powered by <a href="https://pigo-pi.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">PigoPi</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;