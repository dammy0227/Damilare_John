import React from 'react';
import { 
  FaLinkedin, 
  FaGithub, 
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaHeart,
  FaArrowUp,
  FaWhatsapp  // Added WhatsApp icon
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaWhatsapp />, href: "https://wa.me/2349034021707", label: "WhatsApp" },
    { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/damilare-john-72559a233?", label: "LinkedIn" },
    { icon: <FaTwitter />, href: "https://x.com/dammyjohnny?s=21", label: "Twitter" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/engr_dammy_john?igsh=NndrdGQ1czMyOXRy&utm_source=qr", label: "Instagram" },
    { icon: <FaFacebookF />, href: "https://www.facebook.com/share/18JJ71uGdX/?mibextid=wwXIfr", label: "Facebook" },
  ];

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`relative transition-colors duration-300 ${
      isDarkMode 
        ? 'dark:bg-linear-to-t dark:from-gray-900 dark:via-gray-800 dark:to-gray-900' 
        : 'bg-linear-to-t from-gray-900 via-gray-800 to-gray-900'
    }`}>
      {/* Top linear Border */}
      <div className="h-1 bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">FD</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Damilare</h3>
                <p className="text-sm text-blue-300">MERN-Stack Developer</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Building digital experiences with clean code, innovative design, 
              and exceptional user experiences.
            </p>
            
            {/* WhatsApp Quick Contact */}
            <div className={`mt-4 p-3 rounded-lg border ${
              isDarkMode 
                ? 'bg-green-900/20 border-green-800/50' 
                : 'bg-green-900/30 border-green-700/50'
            }`}>
              <div className="flex items-center gap-3">
                <FaWhatsapp className="text-lg text-green-400" />
                <div>
                  <p className="text-sm font-medium text-white">
                    Quick chat on WhatsApp
                  </p>
                  <a 
                    href="https://wa.me/2349034021707"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-400 hover:text-green-300 underline"
                  >
                    +234 903 402 1707
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300"></span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Connect With Me</h4>
            <p className="text-gray-300 text-sm mb-4">
              Let's work together to bring your ideas to life!
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-white transition-all duration-300 ${
                    social.label === 'WhatsApp' ? 'bg-green-600 hover:bg-green-700' :
                    social.label === 'LinkedIn' ? 'bg-blue-700 hover:bg-blue-800' :
                    social.label === 'GitHub' ? 'bg-gray-800 hover:bg-gray-900' :
                    social.label === 'Twitter' ? 'bg-blue-400 hover:bg-blue-500' :
                    social.label === 'Instagram' ? 'bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' :
                    'bg-blue-600 hover:bg-blue-700'
                  }`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-300 text-sm text-center md:text-left"
          >
            © {currentYear} Fatunsin Damilare. All rights reserved.
          </motion.div>

          {/* Made with Love */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-300 text-sm flex items-center gap-1"
          >
            Made with <FaHeart className="text-red-500 animate-pulse mx-1" /> by Damilare
          </motion.div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full bg-linear-to-r from-blue-600 to-cyan-600 text-white flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            aria-label="Back to top"
          >
            <FaArrowUp />
          </motion.button>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-gray-400 text-xs">
            Designed & Developed with React, Tailwind CSS, and Framer Motion
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
          
          {/* WhatsApp Contact Info */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <FaWhatsapp className="text-green-500" />
            <span className="text-gray-400 text-xs">
              WhatsApp: <a href="https://wa.me/2349034021707" className="text-green-400 hover:text-green-300">+234 903 402 1707</a>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom linear Border */}
      <div className="h-1 bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600"></div>
    </footer>
  );
};

export default Footer;