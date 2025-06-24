import { useState } from 'react';
import { Link } from 'react-router-dom';

const Election = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const elections = {
    upcoming: [
      { id: 1, name: 'Bihar Legislative Assembly Election 2025', date: 'Oct-Nov 2025', type: 'State' },
      { id: 2, name: 'Jharkhand Municipal Elections 2025', date: 'Dec 2025', type: 'Local' },
      { id: 3, name: 'General Election 2024', date: 'Apr-May 2024', type: 'National' }
    ],
    ongoing: [
      { id: 4, name: 'Uttar Pradesh By-elections', date: 'Ongoing', type: 'State' }
    ],
    completed: [
      { id: 5, name: 'Karnataka Assembly Elections 2023', date: 'Completed', type: 'State' },
      { id: 6, name: 'General Election 2019', date: 'Completed', type: 'National' }
    ]
  };

  const filteredElections = elections[activeTab].filter(election =>
    election.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-6">Election Dashboard</h1>
        
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search elections..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {['upcoming', 'ongoing', 'completed'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium text-sm capitalize ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Election Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredElections.map((election) => (
            <div key={election.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{election.name}</h2>
                    <p className="text-gray-600 mb-4">{election.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    election.type === 'National' ? 'bg-purple-100 text-purple-800' :
                    election.type === 'State' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {election.type}
                  </span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Link 
                    to={`/${election.name.includes('Bihar') ? 'bihar' : 
                         election.name.includes('Jharkhand') ? 'jharkhand' : 
                         'nation'}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                  >
                    View Details →
                  </Link>
                  <button className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors">
                    Track
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredElections.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No elections found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Election;