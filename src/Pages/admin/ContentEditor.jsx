import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ContentEditor = () => {
  const navigate = useNavigate();
  const { id, contentType } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Content state
  const [content, setContent] = useState({
    title: '',
    description: '',
    category: '',
    author: '',
    date: '',
    image: null
  });
  const [file, setFile] = useState(null);

  // Set initial state
  useEffect(() => {
    if (id) {
      fetchContent();
    } else {
      setContent({
        title: '',
        description: '',
        category: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        image: null
      });
    }
  }, [id, contentType]);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      const endpoint = contentType === 'news' 
        ? `http://localhost:5000/api/news/${id}`
        : `http://localhost:5000/api/content/${contentType}/${id}`;

      const response = await axios.get(endpoint, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      setContent(response.data);
      setIsLoading(false);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to fetch content');
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setMessage('Please upload an image file (PNG, JPG, GIF)');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setMessage('File size too large. Maximum 10MB allowed');
        return;
      }
      setFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', content.title);
      formData.append('description', content.description);
      formData.append('category', content.category);
      formData.append('author', content.author);
      formData.append('date', content.date);
      if (file) formData.append('image', file);

      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      };

      if (id) {
        // Update existing content
        const endpoint = contentType === 'news'
          ? `http://localhost:5000/api/news/${id}`
          : `http://localhost:5000/api/content/${contentType}/${id}`;
        
        await axios.put(endpoint, formData, config);
        setMessage('Content updated successfully!');
      } else {
        // Create new content
        const endpoint = contentType === 'news'
          ? 'http://localhost:5000/api/news'
          : `http://localhost:5000/api/content/${contentType}`;
        
        await axios.post(endpoint, formData, config);
        setMessage('Content created successfully!');
      }

      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to save content');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">
          {id ? 'Edit Content' : 'Create New Content'}
        </h1>
        
        {message && (
          <div className={`mb-4 p-4 rounded ${
            message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={content.title}
              onChange={(e) => setContent({...content, title: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={content.description}
              onChange={(e) => setContent({...content, description: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={6}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                value={content.category}
                onChange={(e) => setContent({...content, category: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Author</label>
              <input
                type="text"
                value={content.author}
                onChange={(e) => setContent({...content, author: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={content.date}
              onChange={(e) => setContent({...content, date: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            <p className="mt-1 text-sm text-gray-500">PNG, JPG, GIF (Max 10MB)</p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentEditor;