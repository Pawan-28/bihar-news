import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ContentEditor from './ContentEditor';   // We'll create this next
import AdminLogin from './AdminSections/AdminLogin';
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Navigation Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <nav className="flex space-x-4">
            <Link 
              to="/admin/dashboard" 
              className="px-3 py-2 hover:bg-gray-100 rounded transition"
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/news/post" 
              className="px-3 py-2 hover:bg-gray-100 rounded transition"
            >
              Create News Post
            </Link>
          </nav>
        </div>
      </div>

      <div className="container mx-auto p-4 md:p-8">
        <Routes>
          <Route path="/dashboard" element={<ContentEditor />} />
          <Route path="/admin" element={<AdminLogin />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;