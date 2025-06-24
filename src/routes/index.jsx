import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import AdminDashboard from '../Pages/admin/ContentEditor'
import ArticlePage from "../Pages/CustomPages/ArticlePage"
import NewsPage from "../Pages/CustomPages/NewsPage"
import SectionPage from "../Pages/CustomPages/SectionPage"
import CategoryPage from "../Pages/CustomPages/CategoryPage"
import NotFound from '../Pages/NotFound'
import Crime from '../Pages/Crime'
import Sports from '../Pages/Sports'
import Career from '../Pages/Career'
import Lifestyle from '../Pages/Lifestyle'
// import Dharm from '../Pages/Dharm'
import Bihar from '../Pages/Bihar'
import Election from '../Pages/Election'
import Jharkhand from '../Pages/Jharkhand'
import Politics from '../Pages/Politics'
// import Nation from '../Pages/Nation'
import AdminLogin from '../Pages/admin/AdminSections/AdminLogin'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="bihar" element={<Bihar />} />
      <Route path="election" element={<Election />} />
      <Route path="jharkhand" element={<Jharkhand />} />
      <Route path="politics" element={<Politics />} />
      {/* <Route path="nation" element={<Nation />} /> */}
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="articles" element={<ArticlePage />} />
      <Route path="articles/:id" element={<ArticlePage />} />
      <Route path="crime" element={<Crime />} />
      <Route path="sports" element={<Sports />} />
      <Route path="career" element={<Career />} />
      <Route path="lifestyle" element={<Lifestyle />} />
      {/* <Route path="dharm" element={<Dharm />} /> */}
      <Route path="news/:id" element={<NewsPage />} />
      <Route path="section" element={<SectionPage />} />
      <Route path="category/:categoryName" element={<CategoryPage />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
      <Route path="admin" element={<AdminLogin />} />
    </Routes>
  )
}

export default AppRoutes