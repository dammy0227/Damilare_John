import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn, 
  FaTwitter, 
  FaGithub,
  FaDownload, 
  FaEnvelope, 
  FaArrowRight,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaWhatsapp,
  FaTiktok, 
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, resetSuccess } from '../../features/contact/contactSlice';
import { sendContactMessage } from '../../features/contact/contactThunk';
import img from '../../assets/profile.png';
import { useTheme } from '../../context/ThemeContext';
import cv from '../../assets/FATUNSIN DAMILARE CV.pdf'

const Hero = () => {
  // Use the theme from context
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navigation items
  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
     { label: 'Services', id: 'services' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  // Social media links
  const socialLinks = [
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/damilare-john-72559a233?", label: "LinkedIn" },
    { icon: FaInstagram, href: "https://www.instagram.com/engr_dammy_john?igsh=NndrdGQ1czMyOXRy&utm_source=qr", label: "Instagram" },
    { icon: FaWhatsapp , href: "https://wa.me/2349034021707", label: "WhatsApp" },
    { icon: FaFacebookF, href: "https://www.facebook.com/share/18JJ71uGdX/?mibextid=wwXIfr", label: "Facebook" },
    { icon: FaTiktok, href: "https://www.tiktok.com/@engr_dammy_john?_r=1&_t=ZS-93pbPYJ6NDG", label: "TikTok" },
    { icon: FaTwitter, href: "https://x.com/dammyjohnny?s=21", label: "Twitter" },
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    dispatch(sendContactMessage(contactForm));
  };

  const handleInputChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = cv;
    link.download = 'Fatunsin_Damilare_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className={`min-h-screen overflow-hidden relative transition-colors duration-300 ${
      isDarkMode 
        ? 'dark:bg-linear-to-br dark:from-gray-900 dark:via-blue-900 dark:to-gray-900' 
        : 'bg-linear-to-br from-blue-50 via-white to-blue-50'
    }`}>
      
      {/* Geometric Background Patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-64 transform -rotate-12 -translate-x-1/4 ${
          isDarkMode ? 'bg-blue-900/10' : 'bg-blue-100/50'
        }`}></div>
        <div className={`absolute bottom-0 right-0 w-full h-64 transform rotate-12 translate-x-1/4 ${
          isDarkMode ? 'bg-cyan-900/10' : 'bg-cyan-100/50'
        }`}></div>
        
        {/* Floating Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-linear(${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px),
                            linear-linear(90deg, ${isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* NAVBAR - Modern Design */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gray-900/80 backdrop-blur-md border-b border-gray-800' 
          : 'bg-white/80 backdrop-blur-md border-b border-blue-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo with animated linear */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group flex items-center gap-3 focus:outline-none"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-12 h-12"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl"></div>
                  <div className="absolute inset-1 bg-gray-900 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">FD</span>
                  </div>
                </motion.div>
                <div className="text-left">
                  <h1 className={`text-xl font-bold tracking-tight ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Damilare
                  </h1>
                  <p className={`text-xs tracking-wider uppercase ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>MERN-Stack Developer</p>
                </div>
              </button>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    if (item.id === 'home') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      scrollToSection(item.id);
                    }
                  }}
                  className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                  {item.id === 'home' && (
                    <span className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                      isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
                    }`}></span>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle - Sleek Design */}
              <motion.button
                onClick={toggleDarkMode}
                whileTap={{ scale: 0.9 }}
                className={`relative w-14 h-8 rounded-full p-1 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-linear-to-r from-blue-600 to-cyan-600' 
                    : 'bg-linear-to-r from-blue-400 to-cyan-400'
                }`}
                aria-label="Toggle dark mode"
              >
                <motion.div
                  layout
                  className={`w-6 h-6 rounded-full shadow-lg flex items-center justify-center ${
                    isDarkMode ? 'bg-gray-900' : 'bg-white'
                  }`}
                  initial={false}
                  animate={{ x: isDarkMode ? 24 : 0 }}
                >
                  {isDarkMode ? (
                    <FaSun className="w-3 h-3 text-yellow-400" />
                  ) : (
                    <FaMoon className="w-3 h-3 text-blue-600" />
                  )}
                </motion.div>
              </motion.button>

              {/* Hire Me Button */}
              <motion.button
                onClick={() => setShowContactForm(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block px-6 py-2 rounded-full bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm tracking-wide hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                Hire Me
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`lg:hidden text-2xl z-50 focus:outline-none transition-colors ${
                  isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* Mobile Menu - Modern Design */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`lg:hidden mt-4 rounded-xl shadow-2xl border ${
                isDarkMode 
                  ? 'bg-gray-900 border-gray-800' 
                  : 'bg-white border-blue-100'
              }`}
            >
              <div className="p-4">
                <div className="mb-4">
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>Navigation</div>
                  <div className="space-y-1">
                    {navItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setIsMenuOpen(false);
                          if (item.id === 'home') {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          } else {
                            scrollToSection(item.id);
                          }
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-between group ${
                          isDarkMode 
                            ? 'hover:bg-gray-800 text-gray-300 hover:text-white' 
                            : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        <span className="font-medium">{item.label}</span>
                        <FaArrowRight className={`w-3 h-3 transform group-hover:translate-x-1 transition-transform ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-500'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Mobile Social Links */}
                <div className="pt-4 border-t border-gray-800 dark:border-gray-800">
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>Connect</div>
                  <div className="flex justify-center gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-blue-600' 
                            : 'bg-blue-100 text-blue-600 hover:text-white hover:bg-blue-600'
                        }`}
                      >
                        <social.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* MAIN CONTENT - Split Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 lg:pt-40 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT COLUMN - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2"
            >
              <div className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide ${
                isDarkMode 
                  ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' 
                  : 'bg-blue-100 text-blue-600 border border-blue-200'
              }`}>
                🚀 Available for Work
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className={`text-xs ${
                  isDarkMode ? 'text-green-400' : 'text-green-600'
                }`}>Online</span>
              </div>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className={`text-5xl lg:text-7xl font-bold leading-tight tracking-tight ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Hi, I'm{' '}
                <span className="relative">
                  <span className="bg-linear-to-r from-blue-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent bg-size-200 animate-linear">
                    Damilare
                  </span>
                  <span className={`absolute -bottom-2 left-0 w-full h-1 ${
                    isDarkMode ? 'bg-blue-500/30' : 'bg-blue-300'
                  } rounded-full`}></span>
                </span>
              </h1>
              
              <div className="space-y-2">
                <h2 className={`text-2xl lg:text-3xl font-semibold ${
                  isDarkMode ? 'text-blue-300' : 'text-blue-700'
                }`}>
                  Mern-Stack Developer & Problem Solver
                </h2>
                <p className={`text-lg leading-relaxed max-w-2xl ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  I build digital experiences that are fast, beautiful, and accessible. 
                  With expertise in modern web technologies, I transform ideas into 
                  scalable solutions that drive business growth.
                </p>
              </div>
            </div>


            {/* Stats & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '20+', label: 'Projects Completed' },
                  { value: '4+', label: 'Years Exp' },
                  { value: '100%', label: 'Client Satisfaction' }
                ].map((stat, index) => (
                  <div
                    key={index}
                    className={'text-center p-3 '
                  
                        
                    }
                  >
                    <div className={`text-4xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-blue-950'
                    }`}>{stat.value}</div>
                    <div className={`text-md mt-1 ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.button
                  onClick={handleDownloadResume}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                >
                  <FaDownload className="w-5 h-5" />
                  <span>Get My Resume</span>
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.button
                  onClick={() => setShowContactForm(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 border shadow-lg ${
                    isDarkMode 
                      ? 'bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700/50' 
                      : 'bg-white border-blue-200 text-gray-900 hover:bg-blue-50'
                  }`}
                >
                  <FaEnvelope className="w-5 h-5" />
                  <span>Start Project</span>
                  <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - Profile Image & Floating Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative mx-auto max-w-md">
              {/* Background Glow */}
              <div className={`absolute -inset-4 rounded-full blur-3xl ${
                isDarkMode ? 'bg-blue-500/20' : 'bg-blue-300/30'
              }`}></div>
              
              {/* Profile Image with Neumorphic Design */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-3xl overflow-hidden shadow-2xl ${
                  isDarkMode 
                    ? 'bg-linear-to-br from-gray-800 to-gray-900' 
                    : 'bg-linear-to-br from-white to-blue-50'
                }`}
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={img}
                    alt="Fatunsin Damilare"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating Info Cards */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className={`absolute -top-6 -right-6 w-32 p-4 rounded-2xl shadow-xl border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-blue-100'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>4+</div>
                    <div className={`text-xs ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>Years Experience</div>
                  </div>
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className={`absolute -bottom-6 -left-6 w-32 p-4 rounded-2xl shadow-xl border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-blue-100'
                  }`}
                >
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>20+</div>
                    <div className={`text-xs ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>Projects Done</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-8 left-10">
                <div className={`w-16 h-16 rounded-2xl rotate-12 border ${
                  isDarkMode 
                    ? 'border-blue-500/30 bg-blue-900/20' 
                    : 'border-blue-300 bg-blue-100/50'
                }`}></div>
              </div>
              
              <div className="absolute -bottom-8 right-10">
                <div className={`w-20 h-20 rounded-2xl -rotate-12 border ${
                  isDarkMode 
                    ? 'border-cyan-500/30 bg-cyan-900/20' 
                    : 'border-cyan-300 bg-cyan-100/50'
                }`}></div>
              </div>
            </div>

            {/* Social Links Floating on Right */}
            <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
              <div className="flex flex-col gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.1, x: -5 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-blue-600' 
                        : 'bg-white text-blue-600 hover:text-white hover:bg-blue-600'
                    }`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className={`text-sm mb-2 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Scroll to explore</span>
            <div className={`w-6 h-10 rounded-full border-2 flex justify-center ${
              isDarkMode ? 'border-gray-700' : 'border-blue-200'
            }`}>
              <div className={`w-1 h-3 rounded-full mt-2 ${
                isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
              }`}></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Modal - Modern Design */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`max-w-md w-full rounded-2xl shadow-2xl border ${
              isDarkMode 
                ? 'bg-gray-900 border-gray-800' 
                : 'bg-white border-blue-100'
            }`}
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className={`text-2xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Let's Connect</h3>
                  <p className={`text-sm mt-1 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>I'll respond within 24 hours</p>
                </div>
                <button
                  onClick={() => {
                    setShowContactForm(false);
                    dispatch(resetSuccess());
                    dispatch(clearError());
                  }}
                  className={`p-2 rounded-lg hover:bg-opacity-10 transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-white text-gray-400' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    isDarkMode 
                      ? 'bg-linear-to-r from-green-500/20 to-blue-500/20' 
                      : 'bg-linear-to-r from-green-100 to-blue-100'
                  }`}>
                    <div className="w-12 h-12 bg-linear-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <FaEnvelope className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h4 className={`text-xl font-semibold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Message Sent!</h4>
                  <p className={`mb-6 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                  <button
                    onClick={() => {
                      setShowContactForm(false);
                      dispatch(resetSuccess());
                    }}
                    className="px-8 py-3 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold transition-all duration-300"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>Your Message</label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {error && (
                    <div className={`p-4 rounded-xl border ${
                      isDarkMode 
                        ? 'bg-red-500/10 border-red-500/20 text-red-300' 
                        : 'bg-red-100 border-red-200 text-red-700'
                    }`}>
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <div className="flex gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
                        loading
                          ? 'opacity-70 cursor-not-allowed'
                          : 'hover:shadow-lg transform hover:-translate-y-0.5'
                      } bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex items-center justify-center gap-3`}
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaEnvelope className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowContactForm(false)}
                      className={`py-4 px-6 rounded-xl font-semibold border transition-all ${
                        isDarkMode 
                          ? 'border-gray-700 hover:bg-gray-800 text-gray-300' 
                          : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* CSS for linear animation */}
      <style jsx>{`
        @keyframes linear {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-linear {
          background-size: 200% 200%;
          animation: linear 3s ease infinite;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </section>
  );
};

export default Hero;