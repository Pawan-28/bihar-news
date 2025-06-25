// import { motion } from 'framer-motion';
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import { useState, useEffect } from 'react';
// import { FaNewspaper, FaChartLine, FaLaptopCode, FaUsers, FaCloudSun, FaVideo, FaTags, FaMapMarkerAlt, FaCalendarAlt, FaEnvelope, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// // Utility function for truncating text
// const truncateText = (text = '', wordLimit = 15) => {
//   const words = text.split(' ');
//   return words.length <= wordLimit ? text : words.slice(0, wordLimit).join(' ') + '...';
// };

// // HeroBanner Component
// export const HeroBanner = ({ heroBanner = {} }) => {
//   const navigate = useNavigate();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [loaded, setLoaded] = useState(false);
  
//   const bannerData = {
//     title: 'Welcome to Our News Portal',
//     subtitle: 'Stay updated with the latest breaking news and stories',
//     button1Text: 'Read Latest News',
//     button2Text: 'Watch Videos',
//     images: ['https://source.unsplash.com/random/1920x1080?news'],
//     ...heroBanner
//   };

//   const [sliderRef, instanceRef] = useKeenSlider({
//     loop: true,
//     slides: { perView: 1, spacing: 0 },
//     mode: "snap",
//     drag: true,
//     created() { setLoaded(true); },
//     slideChanged(s) { setCurrentSlide(s.track.details.rel); }
//   });

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (instanceRef.current && bannerData.images?.length > 1) {
//         instanceRef.current.next();
//       }
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [instanceRef, bannerData.images]);

//   const scrollToSection = (id) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <section className="relative h-screen w-full flex items-center justify-center text-white overflow-hidden">
//       <div ref={sliderRef} className="keen-slider h-full w-full">
//         {bannerData.images?.map((image, index) => (
//           <div 
//             key={index}
//             className="keen-slider__slide h-full w-full bg-cover bg-center"
//             style={{ backgroundImage: `url(${image})`, filter: 'brightness(0.7)' }}
//           />
//         ))}
//       </div>
      
//       <div className="absolute inset-0 bg-black/70 z-10 flex flex-col items-center justify-center px-6 text-center">
//         <motion.div 
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="max-w-4xl mx-auto"
//         >
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">{bannerData.title}</h1>
//           <p className="text-xl md:text-2xl mb-8">{bannerData.subtitle}</p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <button 
//               onClick={() => scrollToSection('latest-news')}
//               className="bg-white text-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all"
//             >
//               {bannerData.button1Text} <FaArrowRight className="inline ml-2" />
//             </button>
//             <button 
//               onClick={() => scrollToSection('video-news')}
//               className="border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-all"
//             >
//               {bannerData.button2Text} <FaArrowRight className="inline ml-2" />
//             </button>
//           </div>
//         </motion.div>
//       </div>

//       {loaded && bannerData.images?.length > 1 && (
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
//           {bannerData.images.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => instanceRef.current?.moveToIdx(idx)}
//               className={`w-3 h-3 rounded-full transition-all ${currentSlide === idx ? 'bg-white w-6' : 'bg-white/50'}`}
//               aria-label={`Go to slide ${idx + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// // LatestNews Component
// export const LatestNews = ({ 
//   latestNewsTitle = 'Latest News', 
//   latestNewsArticles = [] 
// }) => {
//   const navigate = useNavigate();

//   const handleClick = (article) => {
//     const id = article.id || article._id;
//     if (id) navigate(`/news/${id}`);
//   };

//   return (
//     <section id="latest-news" className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-10">
//         <h2 className="text-3xl md:text-4xl font-bold">
//           {latestNewsTitle}
//           <span className="block w-20 h-1.5 mt-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
//         </h2>
//         <button 
//           onClick={() => navigate('/news')}
//           className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
//         >
//           View All <FaArrowRight />
//         </button>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {latestNewsArticles.length > 0 ? (
//           latestNewsArticles.map((article, i) => (
//             <article
//               key={i}
//               className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg cursor-pointer"
//               onClick={() => handleClick(article)}
//             >
//               <div className="relative h-60 overflow-hidden">
//                 <img
//                   src={article.image || 'https://source.unsplash.com/random/800x600?news'}
//                   alt={article.title || 'News thumbnail'}
//                   className="w-full h-full object-cover hover:scale-105 transition-transform"
//                 />
//                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
//                   <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
//                     {article.category || 'General'}
//                   </span>
//                 </div>
//               </div>
//               <div className="p-6">
//                 <h3 className="font-bold text-xl mb-3 hover:text-blue-600 transition-colors">
//                   {article.title || 'Untitled Article'}
//                 </h3>
//                 <p className="text-gray-600 mb-4">
//                   {truncateText(article.description)}
//                 </p>
//                 <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
//                   <span>By {article.author || 'Unknown'}</span>
//                   <span>{article.date || new Date().toLocaleDateString()}</span>
//                 </div>
//               </div>
//             </article>
//           ))
//         ) : (
//           <div className="col-span-2 py-10 text-center text-gray-500">
//             No latest news articles available.
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// // FeaturedArticles Component
// export const FeaturedArticles = ({ 
//   featuredArticlesTitle = 'Featured Articles', 
//   featuredArticles = [] 
// }) => {
//   const navigate = useNavigate();

//   const handleClick = (article) => {
//     const id = article.id || article._id;
//     if (id) navigate(`/articles/${id}`);
//   };

//   return (
//     <section className="py-12 px-4 md:px-6 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-10">
//           <h2 className="text-3xl md:text-4xl font-bold">
//             {featuredArticlesTitle}
//             <span className="block w-20 h-1.5 mt-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
//           </h2>
//           <button 
//             onClick={() => navigate('/articles')}
//             className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
//           >
//             View All <FaArrowRight />
//           </button>
//         </div>

//         <div className="space-y-8">
//           {featuredArticles.length > 0 ? (
//             featuredArticles.map((article, i) => (
//               <article
//                 key={i}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg cursor-pointer"
//                 onClick={() => handleClick(article)}
//               >
//                 <div className="md:flex">
//                   <div className="md:w-1/3 h-64 md:h-auto">
//                     <img
//                       src={article.image || 'https://source.unsplash.com/random/800x600?featured'}
//                       alt={article.title || 'Featured article'}
//                       className="w-full h-full object-cover hover:scale-105 transition-transform"
//                     />
//                   </div>
//                   <div className="md:w-2/3 p-6">
//                     <div className="flex items-center mb-4">
//                       <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium mr-3">
//                         Featured
//                       </span>
//                       <span className="text-gray-500 text-sm">{article.date || 'Today'}</span>
//                     </div>
//                     <h3 className="font-bold text-xl md:text-2xl mb-3 hover:text-blue-600 transition-colors">
//                       {article.title || 'Featured Story'}
//                     </h3>
//                     <p className="text-gray-600 mb-4">
//                       {truncateText(article.description, 25)}
//                     </p>
//                     <div className="flex justify-between items-center text-sm text-gray-500 pt-4 border-t border-gray-100">
//                       <span>{article.readTime || '5 min read'}</span>
//                       <span className="text-blue-600 font-medium">Must Read</span>
//                     </div>
//                   </div>
//                 </div>
//               </article>
//             ))
//           ) : (
//             <div className="py-10 text-center text-gray-500">
//               No featured articles available.
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// // PhotoGallery Component
// export const PhotoGallery = ({ 
//   photoGalleryTitle = 'Photo Gallery', 
//   galleryPhotos = [] 
// }) => {
//   return (
//     <section className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-10">
//         <h2 className="text-3xl md:text-4xl font-bold">
//           {photoGalleryTitle}
//           <span className="block w-20 h-1.5 mt-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
//         </h2>
//         <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
//           View All <FaArrowRight />
//         </button>
//       </div>
      
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {galleryPhotos.length > 0 ? (
//           galleryPhotos.map((photo, i) => (
//             <div key={i} className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg">
//               <img
//                 src={photo.url || 'https://source.unsplash.com/random/600x400?gallery'}
//                 alt={photo.title || `Gallery photo ${i + 1}`}
//                 className="w-full h-48 object-cover hover:scale-105 transition-transform"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
//                 <h3 className="text-white font-medium">
//                   {photo.title || `Photo ${i + 1}`}
//                 </h3>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-4 py-10 text-center text-gray-500">
//             No photos available.
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// // PopularTags Component
// export const PopularTags = ({ 
//   popularTags = ['Politics', 'Technology', 'Sports', 'Business', 'Entertainment'] 
// }) => {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md">
//       <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
//         <FaTags className="text-blue-600" /> Popular Tags
//       </h3>
//       <div className="flex flex-wrap gap-2">
//         {popularTags.map((tag, i) => (
//           <a
//             key={i}
//             href="#"
//             className="px-3 py-1 bg-gray-100 hover:bg-blue-100 text-gray-800 hover:text-blue-800 rounded-full text-sm transition-colors"
//           >
//             #{tag}
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Newsletter Component
// export const Newsletter = ({ 
//   newsletterTitle = 'Stay Updated', 
//   newsletterDescription = 'Get the latest news delivered to your inbox' 
// }) => {
//   return (
//     <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl shadow-lg text-white">
//       <div className="flex items-start gap-4 mb-6">
//         <div className="bg-white/20 p-3 rounded-full">
//           <FaEnvelope className="text-xl" />
//         </div>
//         <div>
//           <h3 className="font-bold text-xl mb-1">{newsletterTitle}</h3>
//           <p className="text-blue-100">{newsletterDescription}</p>
//         </div>
//       </div>
//       <form className="space-y-3">
//         <input 
//           type="email" 
//           placeholder="Your email address" 
//           className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
//           required
//         />
//         <button 
//           type="submit" 
//           className="w-full bg-white text-blue-700 font-medium py-2 rounded-lg hover:bg-gray-100 transition-colors"
//         >
//           Subscribe Now
//         </button>
//       </form>
//       <p className="text-xs text-blue-200 mt-3">
//         We respect your privacy. Unsubscribe at any time.
//       </p>
//     </div>
//   );
// };

// // LocalNews Component
// export const LocalNews = ({ 
//   localNewsTitle = 'Local News', 
//   localNewsArticles = [] 
// }) => {
//   const navigate = useNavigate();

//   const handleClick = (article) => {
//     const id = article.id || article._id;
//     if (id) navigate(`/local-news/${id}`);
//   };

//   return (
//     <section className="py-12 px-4 md:px-6 bg-gray-100">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-10">
//           <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
//             <FaMapMarkerAlt className="text-blue-600" />
//             {localNewsTitle}
//           </h2>
//           <button 
//             onClick={() => navigate('/local-news')}
//             className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
//           >
//             View All <FaArrowRight />
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {localNewsArticles.length > 0 ? (
//             localNewsArticles.map((article, i) => (
//               <article
//                 key={i}
//                 className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg cursor-pointer"
//                 onClick={() => handleClick(article)}
//               >
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={article.image || 'https://source.unsplash.com/random/800x600?local'}
//                     alt={article.title || 'Local news thumbnail'}
//                     className="w-full h-full object-cover hover:scale-105 transition-transform"
//                   />
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
//                     <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
//                       Local
//                     </span>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="font-bold text-lg mb-2 hover:text-blue-600 transition-colors">
//                     {article.title || 'Local Story'}
//                   </h3>
//                   <p className="text-gray-600 mb-4 text-sm">
//                     {truncateText(article.description, 20)}
//                   </p>
//                   <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t border-gray-100">
//                     <span>By {article.author || 'Local Reporter'}</span>
//                     <span>{article.date || 'Today'}</span>
//                   </div>
//                 </div>
//               </article>
//             ))
//           ) : (
//             <div className="col-span-3 py-10 text-center text-gray-500">
//               No local news available.
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// // BrowseByCategory Component
// export const BrowseByCategory = () => {
//   const categories = [
//     { name: "Politics", icon: <FaNewspaper />, color: "bg-red-100 text-red-600" },
//     { name: "Business", icon: <FaChartLine />, color: "bg-blue-100 text-blue-600" },
//     { name: "Technology", icon: <FaLaptopCode />, color: "bg-indigo-100 text-indigo-600" },
//     { name: "Sports", icon: <FaUsers />, color: "bg-green-100 text-green-600" },
//     { name: "Health", icon: <FaCloudSun />, color: "bg-teal-100 text-teal-600" },
//     { name: "Entertainment", icon: <FaVideo />, color: "bg-yellow-100 text-yellow-600" }
//   ];

//   return (
//     <section className="py-12 px-4 md:px-6 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
//           Browse by Category
//           <span className="block w-20 h-1.5 mt-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto"></span>
//         </h2>
        
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//           {categories.map((category, i) => (
//             <a
//               key={i}
//               href="#"
//               className={`${category.color} rounded-lg p-4 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow`}
//             >
//               <div className="text-2xl mb-3">{category.icon}</div>
//               <h3 className="font-medium text-center">{category.name}</h3>
//             </a>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // VideoNews Component
// export const VideoNews = ({ 
//   videoNewsTitle = 'Video News', 
//   videos = [] 
// }) => {
//   const [sliderRef] = useKeenSlider({
//     loop: false,
//     mode: "free-snap",
//     slides: {
//       origin: "center",
//       perView: 2.5,
//       spacing: 20,
//     },
//     breakpoints: {
//       "(max-width: 768px)": { slides: { perView: 1.2, spacing: 16 } },
//       "(max-width: 1024px)": { slides: { perView: 2, spacing: 18 } }
//     },
//   });

//   return (
//     <section id="video-news" className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-10">
//         <h2 className="text-3xl md:text-4xl font-bold">
//           {videoNewsTitle}
//           <span className="block w-20 h-1.5 mt-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></span>
//         </h2>
//         <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
//           View All <FaArrowRight />
//         </button>
//       </div>
      
//       <div ref={sliderRef} className="keen-slider">
//         {videos.length > 0 ? (
//           videos.map((video, i) => (
//             <div key={i} className="keen-slider__slide">
//               <div className="relative rounded-lg overflow-hidden shadow-lg">
//                 <div className="relative pt-[56.25%] bg-black">
//                   <iframe
//                     src={video.url}
//                     title={`Video ${i + 1}`}
//                     className="absolute top-0 left-0 w-full h-full"
//                     allowFullScreen
//                   />
//                 </div>
//                 <div className="p-4 bg-white">
//                   <h3 className="font-medium">{video.title || `Video ${i + 1}`}</h3>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-500 py-10">
//             No videos available.
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };