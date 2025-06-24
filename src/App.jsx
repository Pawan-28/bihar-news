import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Header from './Components/Header'
import Footer from './Components/Footer'
import AppRoutes from './routes'
import ScrollToTop from './Components/ScrollToTop'

// Static content data
const staticContent = {
  heroBanner: {
    title: "Welcome to Harshit ke Kalam",
    subtitle: "Discover the latest news and insights",
    images: ["https://via.placeholder.com/1920x1080"],
    button1Text: "Latest News",
    button2Text: "Videos"
  },
  latestNewsTitle: "Latest News",
  latestNewsArticles: [
    {
      id: 1,
      image: "https://via.placeholder.com/600x400",
      title: "Sample News 1",
      description: "This is a sample news article description.",
      category: "Politics",
      date: "2025-06-19"
    },
    {
      id: 2,
      image: "https://via.placeholder.com/600x400",
      title: "Sample News 2",
      description: "Another sample news article.",
      category: "Technology",
      date: "2025-06-19"
    }
  ],
  footerQuickLinksCategories: [
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Privacy Policy", link: "/privacy" }
  ]
}

function App() {
  const [customization, setCustomization] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      setLoading(true)
      setCustomization(staticContent)
    } catch (err) {
      setError(err.message)
      console.error('Error setting static content:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const fixedNavbarCategories = ["Home", "Contact", "About"]
  const fixedFooterQuickLinksCategories = customization ? customization.footerQuickLinksCategories : []

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl text-red-600 mb-4">{error}</h1>
          <p className="text-gray-600 mb-4">If you're seeing this message, please:</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>Check your internet connection</li>
            <li>Try refreshing the page</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header navbarCategories={fixedNavbarCategories} />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  )
}

export default App