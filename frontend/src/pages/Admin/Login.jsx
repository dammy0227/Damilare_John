import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearError } from '../../features/auth/authSlice';
import { adminLogin } from '../../features/auth/authThunk';
import { 
  FaLock, 
  FaUser, 
  FaSignInAlt,
  FaSun,
  FaMoon 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
  // Use local state for login dark mode - independent from hero theme
  const [isLoginDarkMode, setIsLoginDarkMode] = useState(() => {
    const savedLoginTheme = localStorage.getItem('dashboard-theme'); // Use same key as dashboard
    return savedLoginTheme === 'dark' || false; // Default to light mode
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, admin } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // Listen for theme changes in dashboard (sync with login)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedTheme = localStorage.getItem('dashboard-theme');
      setIsLoginDarkMode(savedTheme === 'dark');
    };

    // Check for theme changes every second
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Save theme preference when changed
  useEffect(() => {
    localStorage.setItem('dashboard-theme', isLoginDarkMode ? 'dark' : 'light');
  }, [isLoginDarkMode]);

  // Toggle login dark mode independently
  const toggleLoginTheme = () => {
    setIsLoginDarkMode(!isLoginDarkMode);
  };

  useEffect(() => {
    if (admin) {
      navigate('/admin/dashboard');
    }
  }, [admin, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(formData));
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isLoginDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100'
    }`}>
      {/* Background decorative elements */}
      <div className={`absolute inset-0 overflow-hidden ${
        isLoginDarkMode ? 'opacity-10' : 'opacity-5'
      }`}>
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${
          isLoginDarkMode ? 'bg-blue-900' : 'bg-blue-300'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${
          isLoginDarkMode ? 'bg-cyan-900' : 'bg-cyan-300'
        }`}></div>
      </div>

      {/* Dark Mode Toggle Button - Top Right */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleLoginTheme}
        className={`fixed top-6 right-6 p-3 rounded-xl border flex items-center justify-center z-50 ${
          isLoginDarkMode 
            ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
            : 'bg-white border-gray-300 hover:bg-gray-50'
        }`}
      >
        {isLoginDarkMode ? (
          <FaSun className="w-5 h-5 text-yellow-500" />
        ) : (
          <FaMoon className="w-5 h-5 text-gray-600" />
        )}
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-md w-full space-y-8 rounded-3xl p-8 border backdrop-blur-lg shadow-2xl ${
          isLoginDarkMode 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/80 border-gray-200'
        }`}
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isLoginDarkMode 
                ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-800/50' 
                : 'bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200'
            }`}
          >
            <FaUser className={`w-10 h-10 ${
              isLoginDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`} />
          </motion.div>
          
          <h2 className={`text-3xl font-bold mb-2 ${
            isLoginDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Admin Login
          </h2>
          <p className={`text-sm ${
            isLoginDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Access your admin dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Username Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isLoginDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <div className="flex items-center gap-2">
                  <FaUser className="w-4 h-4" />
                  Username
                </div>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                disabled={loading}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
                  isLoginDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Enter your username"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isLoginDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <div className="flex items-center gap-2">
                  <FaLock className="w-4 h-4" />
                  Password
                </div>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={loading}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
                  isLoginDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Enter your password"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`p-4 rounded-xl border ${
                isLoginDarkMode 
                  ? 'bg-red-500/10 border-red-500/20 text-red-300' 
                  : 'bg-red-100 border-red-200 text-red-700'
              }`}
            >
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
              loading
                ? 'opacity-70 cursor-not-allowed'
                : 'hover:shadow-lg'
            } ${
              isLoginDarkMode
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              <>
                <FaSignInAlt className="w-5 h-5" />
                Sign In
              </>
            )}
          </motion.button>

          {/* Note about theme sync */}
          <p className={`text-xs text-center mt-4 ${isLoginDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Theme syncs with Dashboard preference
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;