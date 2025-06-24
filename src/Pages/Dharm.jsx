// import { Card, CardContent, CardHeader, CardTitle } from '../../Components/ui/card';
// import { Badge } from '../../Components/ui/badge';
// import Header from "../../Components/Header";
// import NewsStrip from '../../Components/NewsStrip';
// import Navigation from '../../Components/Navigation';
// import TrendingNews from '../../Components/TrendingNews';
// import { Calendar, MapPin, Clock } from 'lucide-react';

// const Dharm = () => {
//   const religiousNews = [
//     {
//       title: "Sindoor Mahayagya: गयाजी में 21 से 23 जून तक होगा सिंदूर महायज्ञ, देशभर के श्रद्धालुओं का लगेगा जमावड़ा",
//       description: "Sindoor Mahayagya:बिहार रे गयाजी में आगामी 21 से 23 जून तक सिंदूर महायज्ञ का आयोजन किया जाएगा। इस आयोजन में बड़ी संख्या में देशभर से श्रद्धालु गयाजी पहुंचेंगे। इस आयोजन को लेकर बुधवार को स्वामी अभिषेक ब्रह्मचारी गयाजी पहुंचे।",
//       image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
//       category: "धर्म",
//       readTime: "3 मिनट",
//       location: "गया, बिहार",
//       date: "21-23 जून"
//     },
//     {
//       title: "गयाजी में 21 से 23 जून तक माता ललिता महायज्ञ का आयोजन, देश भर से श्रद्धालुओं का होगा आगमन",
//       description: "GAYA JEE:पटना के बाद अब गयाजी में महायज्ञ होने जा रहीहै। 21 जून से 23 जून तक माता ललिता महायज्ञ का आयोजन होगा जिसमें शामिल होने के लिए देशभर से श्रद्धालु आएंगे। इस यज्ञ का नाम सिंदूर महायज्ञ भी है।",
//       image: "https://images.unsplash.com/photo-1582571570358-9b8f41a84384?w=400&h=250&fit=crop",
//       category: "धार्मिक आयोजन",
//       readTime: "4 मिनट",
//       location: "गया",
//       date: "21-23 जून"
//     },
//     {
//       title: "Premenand Maharaj: प्रेमानंद महाराज की पदयात्रा फिर से स्थगित हुई, सामने आई यह बड़ी वजह",
//       description: "Premenand Maharaj: निर्जला एकादशी के अवसर पर वृंदावन में श्रद्धालुओं की अचानक हुई भारी भीड़ से पूरे शहर की व्यवस्था पूरी तरह चरमरा गई है।",
//       image: "https://images.unsplash.com/photo-1604608672516-b5b1419f4851?w=400&h=250&fit=crop",
//       category: "संत समाचार",
//       readTime: "2 मिनट",
//       location: "वृंदावन",
//       date: "आज"
//     },
//     {
//       title: "SUPAUL: छातापुर में संतमत सत्संग का 15वां महाधिवेशन संपन्न",
//       description: "SUPAUL: छातापुर प्रखंड में शनिवार को आयोजित संतमत सत्संग का 15वां वार्षिक महाधिवेशन आध्यात्मिक जागरण, सामाजिक समरसता और संस्कृति से जुड़ाव का अद्भुत संगम बन गया।",
//       image: "https://images.unsplash.com/photo-1595207166097-c736a8d9b65c?w=400&h=250&fit=crop",
//       category: "सत्संग",
//       readTime: "3 मिनट",
//       location: "छातापुर, बिहार",
//       date: "कल"
//     },
//     {
//       title: "Eid ul-Adha 2025: देशभर में आज धूमधाम से मनाई जा रही है बकरीद",
//       description: "Eid ul-Adha 2025:आज पूरे देश में बकरीद यानी ईद-उल-अजहा2025का पर्व बेहद श्रद्धा और उल्लास के साथ मनाया जा रहा है।",
//       image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=250&fit=crop",
//       category: "त्योहार",
//       readTime: "2 मिनट",
//       location: "पूरे देश",
//       date: "आज"
//     }
//   ];

//   const templeNews = [
//     {
//       title: "Ayodhya Ram Darbar: अयोध्या मंदिर में राम दरबार की हुई प्राण प्रतिष्ठा",
//       description: "अयोध्या स्थित श्रीराम जन्मभूमि मंदिर में गुरुवार को एक ऐतिहासिक और आध्यात्मिक अवसर पर राम दरबार और परिसर के 7 अन्य मंदिरों की प्राण प्रतिष्ठा संपन्न हुई।",
//       image: "https://images.unsplash.com/photo-1574411130433-99c7159a0327?w=400&h=250&fit=crop",
//       category: "मंदिर समाचार"
//     },
//     {
//       title: "Hinglaj Mata Mandir: पाकिस्तान में हिंदुओं का सबसे बड़ा तीर्थ स्थल",
//       description: "बलूचिस्तान का हिंगलाज माता मंदिर जहां लगता है लाखों श्रद्धालुओं का मेला। यह वही स्थान है जहां देवी सती का शीश गिरा था।",
//       image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
//       category: "तीर्थ स्थल"
//     },
//     {
//       title: "Siddhivinayak temple: सिद्धिविनायक मंदिर में नारियल-प्रसाद बैन!",
//       description: "आतंकी खतरे के बीच मुंबई के सिद्धिविनायक गणपति मंदिर में सुरक्षा व्यवस्था कड़ी कर दी गई है।",
//       image: "https://images.unsplash.com/photo-1582571570358-9b8f41a84384?w=400&h=250&fit=crop",
//       category: "मंदिर प्रशासन"
//     }
//   ];

//   const spiritualContent = [
//     {
//       title: "Chanakya Niti: युद्ध के समय अपनाएं साम, दाम, दंड, भेद",
//       description: "जानिए क्यों आज भी प्रासंगिक हैं चाणक्य रणनीतियां। युद्ध केवल तलवार या तोप से नहीं जीता जाता, बल्कि समझदारी, धैर्य और सही रणनीति से भी विजय संभव है।",
//       image: "https://images.unsplash.com/photo-1604608672516-b5b1419f4851?w=300&h=200&fit=crop",
//       category: "आध्यात्म"
//     },
//     {
//       title: "Premanand Maharaj: शादी के लिए सच्चे जीवनसाथी की तलाश कैसे करें?",
//       description: "प्रेमानंद महाराज ने बताए उपाए। वृंदावन के प्रतिष्ठित संत प्रेमानंद महाराज को किसी परिचय की आवश्यकता नहीं है।",
//       image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=200&fit=crop",
//       category: "संतवाणी"
//     },
//     {
//       title: "Vat Savitri Vrat: कल मनाया जाएगा वट सावित्री व्रत",
//       description: "जानिए...पूजा विधि और शुभ मुहूर्त। यह व्रत विवाहित महिलाओं के लिए विशेष महत्व रखता है।",
//       image: "https://images.unsplash.com/photo-1574411130433-99c7159a0327?w=300&h=200&fit=crop",
//       category: "व्रत-त्योहार"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-amber-50">
//       <Header />
//       <NewsStrip />
//       <Navigation />
      
//       <div className="container mx-auto px-4 py-8">
//         {/* Page Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-4xl font-bold text-amber-800 mb-2">धर्म</h1>
//           <p className="text-amber-700">धार्मिक समाचार, आध्यात्म, और आस्था की दुनिया</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Featured Religious News */}
//             <section>
//               <h2 className="text-2xl font-bold mb-6 text-amber-800 border-b-2 border-amber-600 pb-2">
//                 मुख्य धार्मिक समाचार
//               </h2>
//               <div className="space-y-6">
//                 {religiousNews.map((article, index) => (
//                   <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white">
//                     <div className="md:flex">
//                       <div className="md:w-1/3">
//                         <img 
//                           src={article.image} 
//                           alt={article.title}
//                           className="w-full h-48 md:h-full object-cover"
//                         />
//                       </div>
//                       <div className="md:w-2/3 p-6">
//                         <div className="flex items-center gap-2 mb-3">
//                           <Badge className="bg-amber-600 hover:bg-amber-700">{article.category}</Badge>
//                           {article.location && (
//                             <div className="flex items-center text-sm text-amber-800">
//                               <MapPin className="h-3 w-3 mr-1" />
//                               {article.location}
//                             </div>
//                           )}
//                           {article.date && (
//                             <div className="flex items-center text-sm text-amber-800">
//                               <Calendar className="h-3 w-3 mr-1" />
//                               {article.date}
//                             </div>
//                           )}
//                         </div>
//                         <h3 className="font-bold text-xl mb-3 text-amber-900">{article.title}</h3>
//                         <p className="text-amber-800 text-sm mb-3">{article.description}</p>
//                         {article.readTime && (
//                           <div className="flex items-center text-xs text-amber-700">
//                             <Clock className="h-3 w-3 mr-1" />
//                             {article.readTime}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </Card>
//                 ))}
//               </div>
//             </section>

//             {/* Temple News */}
//             <section>
//               <h2 className="text-2xl font-bold mb-6 text-amber-800 border-b-2 border-amber-600 pb-2">
//                 मंदिर समाचार
//               </h2>
//               <div className="grid md:grid-cols-2 gap-6">
//                 {templeNews.map((article, index) => (
//                   <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white">
//                     <div className="relative">
//                       <img 
//                         src={article.image} 
//                         alt={article.title}
//                         className="w-full h-48 object-cover"
//                       />
//                       <Badge className="absolute top-3 left-3 bg-amber-600 hover:bg-amber-700">
//                         {article.category}
//                       </Badge>
//                     </div>
//                     <CardContent className="p-4">
//                       <h3 className="font-bold text-lg mb-2 text-amber-900">{article.title}</h3>
//                       <p className="text-amber-800 text-sm">{article.description}</p>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </section>

//             {/* Spiritual Content */}
//             <section>
//               <h2 className="text-2xl font-bold mb-6 text-amber-800 border-b-2 border-amber-600 pb-2">
//                 आध्यात्मिक सामग्री
//               </h2>
//               <div className="grid md:grid-cols-3 gap-6">
//                 {spiritualContent.map((article, index) => (
//                   <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer bg-white">
//                     <div className="relative">
//                       <img 
//                         src={article.image} 
//                         alt={article.title}
//                         className="w-full h-32 object-cover"
//                       />
//                       <Badge className="absolute top-2 left-2 bg-amber-600 hover:bg-amber-700 text-xs">
//                         {article.category}
//                       </Badge>
//                     </div>
//                     <CardContent className="p-3">
//                       <h3 className="font-bold text-sm mb-2 text-amber-900">{article.title}</h3>
//                       <p className="text-amber-800 text-xs">{article.description}</p>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </section>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             <TrendingNews />
            
//             {/* Daily Mantras */}
//             <Card className="bg-amber-100 border-amber-200">
//               <CardHeader>
//                 <CardTitle className="text-amber-800">आज का मंत्र</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-center p-4 bg-white rounded border border-amber-200">
//                   <p className="text-xl font-bold mb-2 text-amber-600">ॐ नमः शिवाय</p>
//                   <p className="text-sm text-amber-700">भगवान शिव का यह मंत्र सभी कष्टों का नाश करता है</p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Religious Events Calendar */}
//             <Card className="bg-white">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-amber-800">
//                   <Calendar className="h-5 w-5 text-amber-600" />
//                   आगामी धार्मिक आयोजन
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center justify-between p-3 bg-amber-50 rounded">
//                   <div>
//                     <h4 className="font-semibold text-amber-900">गुरु पूर्णिमा</h4>
//                     <p className="text-xs text-amber-700">गुरु की महत्ता का पर्व</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-semibold text-amber-600">21 जुलाई</p>
//                     <p className="text-xs text-amber-700">रविवार</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between p-3 bg-amber-50 rounded">
//                   <div>
//                     <h4 className="font-semibold text-amber-900">श्रावण मास</h4>
//                     <p className="text-xs text-amber-700">भोलेनाथ का प्रिय महीना</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-semibold text-amber-600">22 जुलाई</p>
//                     <p className="text-xs text-amber-700">सोमवार</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center justify-between p-3 bg-amber-50 rounded">
//                   <div>
//                     <h4 className="font-semibold text-amber-900">नाग पंचमी</h4>
//                     <p className="text-xs text-amber-700">नाग देवता की पूजा</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-semibold text-amber-600">9 अगस्त</p>
//                     <p className="text-xs text-amber-700">शुक्रवार</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Temple Timings */}
//             <Card className="bg-white">
//               <CardHeader>
//                 <CardTitle className="text-amber-800">प्रमुख मंदिरों के दर्शन समय</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex justify-between items-center text-sm">
//                   <span className="font-medium text-amber-900">काशी विश्वनाथ</span>
//                   <span className="text-amber-800">3:00 AM - 11:00 PM</span>
//                 </div>
//                 <div className="flex justify-between items-center text-sm">
//                   <span className="font-medium text-amber-900">तिरुपति बालाजी</span>
//                   <span className="text-amber-800">2:30 AM - 1:00 AM</span>
//                 </div>
//                 <div className="flex justify-between items-center text-sm">
//                   <span className="font-medium text-amber-900">सिद्धिविनायक</span>
//                   <span className="text-amber-800">5:30 AM - 10:00 PM</span>
//                 </div>
//                 <div className="flex justify-between items-center text-sm">
//                   <span className="font-medium text-amber-900">महाबोधि मंदिर</span>
//                   <span className="text-amber-800">5:00 AM - 9:00 PM</span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dharm;