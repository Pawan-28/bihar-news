// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Nation = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [selectedState, setSelectedState] = useState('All States');

//   const states = [
//     'All States', 'Uttar Pradesh', 'Maharashtra', 'Bihar', 'West Bengal', 
//     'Madhya Pradesh', 'Tamil Nadu', 'Rajasthan', 'Karnataka', 'Gujarat'
//   ];

//   const parties = [
//     { name: 'BJP', seats: 303, color: 'bg-orange-500' },
//     { name: 'Congress', seats: 52, color: 'bg-blue-500' },
//     { name: 'DMK', seats: 24, color: 'bg-red-500' },
//     { name: 'AITC', seats: 22, color: 'bg-green-600' },
//     { name: 'Others', seats: 142, color: 'bg-gray-500' }
//   ];

//   const stateResults = [
//     { state: 'Uttar Pradesh', seats: 80, BJP: 62, SP: 5, BSP: 10, Congress: 1, Others: 2 },
//     { state: 'Maharashtra', seats: 48, BJP: 23, SHS: 18, NCP: 4, Congress: 1, Others: 2 },
//     { state: 'West Bengal', seats: 42, AITC: 22, BJP: 18, Congress: 2, Others: 0 },
//     { state: 'Bihar', seats: 40, BJP: 17, JD(U): 16, RJD: 5, Congress: 1, Others: 1 }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-indigo-800">General Election 2024</h1>
//             <p className="text-gray-600 mt-2">543 Lok Sabha Seats • April-May 2024</p>
//           </div>
//           <Link 
//             to="/election" 
//             className="mt-4 md:mt-0 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center"
//           >
//             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Back to Elections
//           </Link>
//         </div>

//         {/* Tabs */}
//         <div className="flex overflow-x-auto border-b border-gray-200 mb-8">
//           {['overview', 'results', 'states', 'parties'].map((tab) => (
//             <button
//               key={tab}
//               className={`px-4 py-2 whitespace-nowrap font-medium text-sm capitalize ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {/* State Filter */}
//         <div className="mb-6">
//           <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">Filter by State</label>
//           <select
//             id="state"
//             className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             value={selectedState}
//             onChange={(e) => setSelectedState(e.target.value)}
//           >
//             {states.map((state) => (
//               <option key={state} value={state}>{state}</option>
//             ))}
//           </select>
//         </div>

//         {/* Content Sections */}
//         {activeTab === 'overview' && (
//           <div className="space-y-6">
//             <div className="bg-white p-6 rounded-xl shadow">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Election Overview</h2>
//               <p className="text-gray-600 mb-4">
//                 The 2024 Indian general election was held in seven phases from 19 April to 1 June 2024 to elect the members of the 18th Lok Sabha. With over 900 million eligible voters, it was the largest democratic exercise in history.
//               </p>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
//                 <div className="bg-indigo-50 p-4 rounded-lg">
//                   <h3 className="text-sm font-medium text-indigo-800">Total Seats</h3>
//                   <p className="text-2xl font-bold text-indigo-900 mt-1">543</p>
//                 </div>
//                 <div className="bg-green-50 p-4 rounded-lg">
//                   <h3 className="text-sm font-medium text-green-800">Registered Voters</h3>
//                   <p className="text-2xl font-bold text-green-900 mt-1">912M</p>
//                 </div>
//                 <div className="bg-purple-50 p-4 rounded-lg">
//                   <h3 className="text-sm font-medium text-purple-800">Polling Stations</h3>
//                   <p className="text-2xl font-bold text-purple-900 mt-1">1.2M</p>
//                 </div>
//                 <div className="bg-yellow-50 p-4 rounded-lg">
//                   <h3 className="text-sm font-medium text-yellow-800">Voter Turnout</h3>
//                   <p className="text-2xl font-bold text-yellow-900 mt-1">67.4%</p>
//                 </div>
//               </div>
//             </div>

//             <div className="bg-white p-6 rounded-xl shadow">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">Major Political Parties</h2>
//               <div className="space-y-4">
//                 {parties.map((party) => (
//                   <div key={party.name} className="flex items-center">
//                     <div className={`w-3 h-3 ${party.color} rounded-full mr-3`}></div>
//                     <div className="flex-1">
//                       <div className="flex justify-between text-sm">
//                         <span className="font-medium">{party.name}</span>
//                         <span>{party.seats} seats</span>
//                       </div>
//                       <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
//                         <div 
//                           className={`h-2 rounded-full ${party.color}`} 
//                           style={{ width: `${(party.seats / 543) * 100}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'results' && (
//           <div className="bg-white rounded-xl shadow overflow-hidden">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h2 className="text-xl font-semibold text-gray-800">State-wise Results</h2>
//             </div>
//             <div className="divide-y divide-gray-200">
//               {stateResults
//                 .filter(s => selectedState === 'All States' || s.state === selectedState)
//                 .map((state) => (
//                   <div key={state.state} className="p-4 hover:bg-gray-50">
//                     <h3 className="text-lg font-medium text-gray-900 mb-3">{state.state} ({state.seats} seats)</h3>
//                     <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
//                       <div className="bg-orange-100 p-2 rounded text-center">
//                         <p className="text-xs text-orange-800">BJP</p>
//                         <p className="font-bold text-orange-900">{state.BJP}</p>
//                       </div>
//                       <div className="bg-blue-100 p-2 rounded text-center">
//                         <p className="text-xs text-blue-800">Congress</p>
//                         <p className="font-bold text-blue-900">{state.Congress}</p>
//                       </div>
//                       {state.state === 'West Bengal' && (
//                         <div className="bg-green-100 p-2 rounded text-center">
//                           <p className="text-xs text-green-800">AITC</p>
//                           <p className="font-bold text-green-900">{state.AITC}</p>
//                         </div>
//                       )}
//                       {state.state === 'Bihar' && (
//                         <>
//                           <div className="bg-green-700 text-white p-2 rounded text-center">
//                             <p className="text-xs">JD(U)</p>
//                             <p className="font-bold">{state['JD(U)']}</p>
//                           </div>
//                           <div className="bg-green-800 text-white p-2 rounded text-center">
//                             <p className="text-xs">RJD</p>
//                             <p className="font-bold">{state.RJD}</p>
//                           </div>
//                         </>
//                       )}
//                       {/* Add more party results as needed */}
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         )}

//         {/* Footer */}
//         <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
//           <p>Data source: Election Commission of India | Last updated: {new Date().toLocaleDateString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Nation;