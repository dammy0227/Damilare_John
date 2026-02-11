import React, { useState } from 'react';
import { 
  FaEnvelope, 
  FaLinkedin, 
  FaGithub, 
  FaMapMarkerAlt,
  FaPaperPlane,
  FaUser,
  FaComment,
  FaCheckCircle,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, resetSuccess } from '../../features/contact/contactSlice';
import { sendContactMessage } from '../../features/contact/contactThunk';

const Contact = () => {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email",
      value: "fatunsindamilare1@gmail.com",
      link: "mailto:fatunsindamilare1@gmail.com",
      color: "text-red-500"
    },
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      value: "+234 903 402 1707",
      link: "https://wa.me/2349034021707",
      color: "text-green-500"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      value: "Lagos, Nigeria",
      link: null,
      color: "text-green-500"
    }
  ];

  // All social media platforms
  const socialMedia = [
    { 
      icon: <FaLinkedin />, 
      href: "https://www.linkedin.com/in/damilare-john-72559a233?", 
      color: "bg-blue-700 hover:bg-blue-800", 
      label: "LinkedIn" 
    },
    { 
      icon: <FaTwitter />, 
      href: "https://x.com/dammyjohnny?s=21", 
      color: "bg-black hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700", 
      label: "X (Twitter)" 
    },
    { 
      icon: <FaInstagram />, 
      href: "https://www.instagram.com/engr_dammy_john?igsh=NndrdGQ1czMyOXRy&utm_source=qr", 
      color: "bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600", 
      label: "Instagram" 
    },
    { 
      icon: <FaFacebook />, 
      href: "https://www.facebook.com/share/18JJ71uGdX/?mibextid=wwXIfr", 
      color: "bg-blue-600 hover:bg-blue-700", 
      label: "Facebook" 
    },
    { 
      icon: <FaTiktok />, 
      href: "https://www.tiktok.com/@engr_dammy_john?_r=1&_t=ZS-93pbPYJ6NDG", 
      color: "bg-gray-900 hover:bg-black dark:bg-gray-800 dark:hover:bg-gray-900", 
      label: "TikTok" 
    },
    { 
      icon: <FaWhatsapp />, 
      href: "https://wa.me/2349034021707", 
      color: "bg-green-500 hover:bg-green-600", 
      label: "WhatsApp" 
    },
    { 
      icon: <FaEnvelope />, 
      href: "mailto:fatunsindamilare1@gmail.com", 
      color: "bg-red-600 hover:bg-red-700", 
      label: "Email" 
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user starts typing
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendContactMessage(formData));
  };

  const handleSendAnother = () => {
    setFormData({ name: '', email: '', message: '' });
    dispatch(resetSuccess());
    dispatch(clearError());
  };

  return (
    <section id="contact" className={`relative py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'dark:bg-linear-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900' 
        : 'bg-linear-to-b from-white to-blue-50'
    }`}>
      
      {/* Background decorative elements - Smaller on mobile */}
      <div className={`absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full blur-3xl opacity-20 ${
        isDarkMode ? 'bg-blue-900' : 'bg-blue-200'
      }`}></div>
      <div className={`absolute bottom-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 rounded-full blur-3xl opacity-20 ${
        isDarkMode ? 'bg-cyan-900' : 'bg-cyan-200'
      }`}></div>

      {/* Connection Lines Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke={isDarkMode ? '#3b82f6' : '#60a5fa'} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <span className={`inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4 ${
            isDarkMode 
              ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' 
              : 'bg-blue-100 text-blue-600 border border-blue-200'
          }`}>
            GET IN TOUCH
          </span>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Let's <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-600">Connect</span>
          </h2>
          <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2 sm:px-4 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Have a project in mind? Let's collaborate and build something amazing together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Left: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-5 sm:space-y-6 md:space-y-8"
          >
            <div className={`rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-gray-800/30 border-gray-700' 
                : 'bg-white/50 border-blue-100'
            }`}>
              <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Contact Information
              </h3>
              
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl border transition-all duration-300 hover:scale-[1.02] ${
                      isDarkMode 
                        ? 'bg-gray-800/50 border-gray-700 hover:border-blue-500' 
                        : 'bg-white border-blue-200 hover:border-blue-400'
                    }`}
                  >
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${
                      isDarkMode ? 'bg-gray-800' : 'bg-blue-100'
                    }`}>
                      <div className={`text-base sm:text-lg md:text-xl ${item.color}`}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className={`text-xs sm:text-sm font-medium ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {item.title}
                      </div>
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-sm sm:text-base md:text-lg font-semibold hover:underline truncate block ${
                            isDarkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
                          }`}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className={`text-sm sm:text-base md:text-lg font-semibold truncate ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {item.value}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 md:pt-8 border-t border-gray-700 dark:border-gray-700">
                <h4 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Connect with me
                </h4>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {socialMedia.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: Math.floor(index / 4) * 0.1 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-white transition-all duration-300 ${social.color} shrink-0`}
                      aria-label={social.label}
                    >
                      <span className="text-xs sm:text-sm md:text-base">{social.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div className={`rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 border backdrop-blur-sm ${
              isDarkMode 
                ? 'bg-linear-to-r from-blue-900/20 to-cyan-900/20 border-gray-700' 
                : 'bg-linear-to-r from-blue-50 to-cyan-50 border-blue-100'
            }`}>
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                <div className="w-2 h-2 sm:w-2 sm:h-2 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className={`font-semibold text-xs sm:text-sm md:text-base ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                  Currently Available
                </span>
              </div>
              <p className={`text-xs sm:text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                I'm currently open to new opportunities and collaborations. 
                Let's discuss how we can work together!
              </p>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={`rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border backdrop-blur-sm h-fit ${
              isDarkMode 
                ? 'bg-gray-800/30 border-gray-700' 
                : 'bg-white/50 border-blue-100'
            }`}>
              <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Send a Message
              </h3>
              <p className={`mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Fill out the form below and I'll get back to you within 24 hours
              </p>

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 sm:py-8 md:py-12"
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 ${
                    isDarkMode 
                      ? 'bg-green-900/20 border border-green-800/50' 
                      : 'bg-green-100 border border-green-200'
                  }`}>
                    <FaCheckCircle className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-green-500" />
                  </div>
                  <h4 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Message Sent!
                  </h4>
                  <p className={`mb-4 sm:mb-6 text-xs sm:text-sm md:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendAnother}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-xs sm:text-sm md:text-base ${
                      isDarkMode 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <FaUser className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                        <span className="text-xs sm:text-sm">Full Name</span>
                      </div>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <FaEnvelope className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                        <span className="text-xs sm:text-sm">Email Address</span>
                      </div>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <FaComment className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                        <span className="text-xs sm:text-sm">Your Message</span>
                      </div>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      rows="4"
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-base ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Tell me about your project, timeline, and budget..."
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className={`p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl border text-xs sm:text-sm ${
                      isDarkMode 
                        ? 'bg-red-500/10 border-red-500/20 text-red-300' 
                        : 'bg-red-100 border-red-200 text-red-700'
                    }`}>
                      <p>{error}</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base ${
                      loading
                        ? 'opacity-70 cursor-not-allowed'
                        : 'hover:shadow-lg'
                    } ${
                      isDarkMode
                        ? 'bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                        : 'bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="text-xs sm:text-sm md:text-base">Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        <span className="text-xs sm:text-sm md:text-base">Send Message</span>
                      </>
                    )}
                  </motion.button>

                  <p className={`text-xs text-center mt-2 sm:mt-3 md:mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    I typically respond within 24 hours
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Quick Response Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className={`mt-6 sm:mt-8 md:mt-12 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-linear-to-r from-blue-900/10 to-cyan-900/10 border-gray-700' 
              : 'bg-linear-to-r from-blue-50/80 to-cyan-50/80 border-blue-100'
          }`}
        >
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 items-center">
            <div className="text-center">
              <div className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                24h
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Avg Response
              </div>
            </div>
            <div className="text-center">
              <div className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                100%
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Response Rate
              </div>
            </div>
            <div className="text-center">
              <div className={`text-md sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                ⭐⭐⭐⭐⭐
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                Satisfaction
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;