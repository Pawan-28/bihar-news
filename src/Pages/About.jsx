import React from 'react';
import { 
  FaUsers, 
  FaLightbulb, 
  FaChartLine, 
  FaGlobeAmericas,
  FaQuoteLeft,
  FaHandshake,
  FaSearch,
  FaBalanceScale,
  FaBullseye
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FiMail, FiTwitter, FiLinkedin } from 'react-icons/fi';

const About = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Data
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      role: "CEO & Founder",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Visionary leader with 15+ years in media innovation.",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "john@example.com"
      }
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Editor-in-Chief",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Award-winning journalist with a passion for truth.",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "jane@example.com"
      }
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "CTO",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      bio: "Tech expert driving our digital transformation.",
      social: {
        twitter: "#",
        linkedin: "#",
        email: "mike@example.com"
      }
    }
  ];

  const stats = [
    { 
      value: "10M+", 
      label: "Monthly Readers", 
      icon: <FaUsers className="text-4xl text-blue-600" />,
      description: "Engaged readers across our platforms"
    },
    { 
      value: "50+", 
      label: "Awards Won", 
      icon: <FaLightbulb className="text-4xl text-blue-600" />,
      description: "Recognized for journalistic excellence"
    },
    { 
      value: "200+", 
      label: "Team Members", 
      icon: <FaChartLine className="text-4xl text-blue-600" />,
      description: "Dedicated professionals worldwide"
    },
    { 
      value: "100+", 
      label: "Countries Reached", 
      icon: <FaGlobeAmericas className="text-4xl text-blue-600" />,
      description: "Global impact and readership"
    }
  ];

  const values = [
    {
      title: "Integrity",
      icon: <FaHandshake className="text-3xl mb-4 text-blue-600" />,
      description: "We adhere to the highest ethical standards in all our reporting."
    },
    {
      title: "Accuracy",
      icon: <FaSearch className="text-3xl mb-4 text-blue-600" />,
      description: "Every fact is verified, every source is vetted."
    },
    {
      title: "Balance",
      icon: <FaBalanceScale className="text-3xl mb-4 text-blue-600" />,
      description: "We present all sides of the story with fairness."
    },
    {
      title: "Impact",
      icon: <FaBullseye className="text-3xl mb-4 text-blue-600" />,
      description: "We focus on stories that matter to our communities."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              About Us
            </span>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Our Story & Mission
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
            Delivering trusted news and insights to empower our global community since 2010.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-16">
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Our Mission
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-gray-600 text-lg mb-6">
                  We believe in the power of information to transform lives. Our mission is to deliver accurate, unbiased news that helps people make informed decisions about their lives, communities, and the world.
                </motion.p>
                <motion.p variants={fadeInUp} className="text-gray-600 text-lg">
                  Founded in 2010, we've grown from a small local news outlet to an internationally recognized media platform, without ever compromising our commitment to journalistic integrity.
                </motion.p>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-12 lg:p-16 relative">
                <div className="absolute inset-0 bg-[url('/pattern.png')] bg-[length:200px] opacity-10"></div>
                <motion.div
                  variants={scaleUp}
                  className="text-white text-center relative z-10"
                >
                  <FaQuoteLeft className="text-4xl text-blue-300 mx-auto mb-6" />
                  <blockquote className="text-2xl md:text-3xl font-medium mb-6 leading-relaxed">
                    "Truth is the foundation of all knowledge and the cement of all societies."
                  </blockquote>
                  <p className="text-blue-200 text-lg">— Our Founding Principle</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-all"
              >
                <div className="mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-lg font-medium text-gray-700 mb-2">{stat.label}</p>
                <p className="text-gray-500 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate professionals behind our award-winning journalism
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="h-80 overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = '/default-profile.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-6 flex flex-col justify-end">
                    <div className="flex space-x-4">
                      <a href={member.social.twitter} className="text-white hover:text-blue-300 transition-colors">
                        <FiTwitter className="text-xl" />
                      </a>
                      <a href={member.social.linkedin} className="text-white hover:text-blue-300 transition-colors">
                        <FiLinkedin className="text-xl" />
                      </a>
                      <a href={`mailto:${member.social.email}`} className="text-white hover:text-blue-300 transition-colors">
                        <FiMail className="text-xl" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900 to-blue-700">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core Values
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-xl text-blue-200 max-w-3xl mx-auto">
              The principles that guide everything we do
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all"
              >
                <div className="flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white text-center mb-3">{value.title}</h3>
                <p className="text-blue-100 text-center">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-12 text-center"
        >
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Our Mission
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Interested in working with us or learning more about our organization?
          </motion.p>
          <motion.div variants={fadeInUp}>
            <button className="px-8 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-lg">
              Contact Us
            </button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;