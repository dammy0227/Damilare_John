import React from "react";
import { 
  FaMapMarkerAlt, 
  FaGlobe, 
  FaClock, 
  FaCheckCircle,
  FaUserTie,
  FaStar,
  FaCode,
  FaServer,
  FaDatabase,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaJsSquare,
  FaBriefcase,
  FaRocket,
  FaLightbulb,
  FaHeart,
  FaCloud,
  FaCloudUploadAlt,
  FaSync
} from "react-icons/fa";
import { motion } from "framer-motion";
import img from '../../assets/profile.png';
import { useTheme } from '../../context/ThemeContext'; 

const About = () => {
  const { isDarkMode } = useTheme();



  const stats = [
    { icon: <FaBriefcase />, value: "4+", label: "Years Experience", color: "bg-linear-to-r from-blue-500 to-cyan-500" },
    { icon: <FaRocket />, value: "20+", label: "Projects Built", color: "bg-linear-to-r from-purple-500 to-pink-500" },
    { icon: <FaStar />, value: "100%", label: "Client Satisfaction", color: "bg-linear-to-r from-yellow-500 to-orange-500" },
    { icon: <FaHeart />, value: "24/7", label: "Dedicated Support", color: "bg-linear-to-r from-green-500 to-emerald-500" },
  ];

  const deployment = [
    { 
      title: "Frontend Deployment", 
      description: "Deploying React applications on Vercel for optimal performance and automatic deployments",
      icon: <FaCloudUploadAlt />,
      color: "text-black dark:text-white",
      platform: "Vercel"
    },
    { 
      title: "Backend Deployment", 
      description: "Hosting Node.js/Express APIs on Render with zero-downtime deployments",
      icon: <FaServer />,
      color: "text-blue-500",
      platform: "Render"
    },
    { 
      title: "Database Hosting", 
      description: "Using MongoDB Atlas for reliable cloud database management",
      icon: <FaDatabase />,
      color: "text-green-500",
      platform: "MongoDB Atlas"
    },
    { 
      title: "Version Control", 
      description: "Git workflow with GitHub for collaborative development",
      icon: <FaGithub />,
      color: "text-gray-800 dark:text-gray-300",
      platform: "GitHub"
    },
  ];

  return (
    <section
      id="about"
      className={`relative min-h-screen py-12 md:py-20 overflow-hidden transition-colors duration-300 ${
        isDarkMode 
          ? 'dark:bg-linear-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900' 
          : 'bg-linear-to-br from-white via-blue-50 to-cyan-50'
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 -right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isDarkMode ? 'bg-blue-900/50' : 'bg-blue-200/50'
        }`}></div>
        <div className={`absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isDarkMode ? 'bg-cyan-900/50' : 'bg-cyan-200/50'
        }`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 blur-3xl opacity-10 ${
          isDarkMode ? 'bg-linear-to-r from-blue-600/30 to-cyan-600/30' : 'bg-linear-to-r from-blue-400/20 to-cyan-400/20'
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-20"
        >
          <motion.span 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 tracking-wider ${
              isDarkMode 
                ? 'bg-linear-to-r from-blue-900/30 to-cyan-900/30 text-blue-300 border border-blue-800/30' 
                : 'bg-linear-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200'
            }`}
          >
            ABOUT ME
          </motion.span>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Building Modern{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600 animate-linear-x">
                Web Solutions
              </span>
              <span className={`absolute -bottom-2 left-0 w-full h-1 rounded-full ${
                isDarkMode ? 'bg-linear-to-r from-blue-500 to-cyan-500' : 'bg-linear-to-r from-blue-400 to-cyan-400'
              }`}></span>
            </span>
          </h1>
          <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Full-Stack MERN Developer specializing in React, Node.js, and MongoDB. 
            I build complete, scalable web applications from frontend to backend deployment.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-20">
          {/* Left Column - Profile & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1 space-y-8"
          >
            {/* Profile Card */}
            <div className={`rounded-3xl overflow-hidden border backdrop-blur-lg shadow-2xl ${
              isDarkMode 
                ? 'bg-gray-800/40 border-gray-700' 
                : 'bg-white/70 border-white/50'
            }`}>
              <div className={`p-1 ${
                isDarkMode 
                  ? 'bg-linear-to-r from-blue-900/20 to-cyan-900/20' 
                  : 'bg-linear-to-r from-blue-50 to-cyan-50'
              }`}>
                <div className={`relative h-64 overflow-hidden rounded-t-2xl ${
                  isDarkMode ? 'bg-gray-900' : 'bg-linear-to-br from-blue-100 to-cyan-100'
                }`}>
                  <img
                    src={img}
                    alt="Fatunsin Damilare"
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 ${
                    isDarkMode 
                      ? 'bg-linear-to-t from-gray-900/50 to-transparent' 
                      : 'bg-linear-to-t from-white/30 to-transparent'
                  }`}></div>
                </div>
                
                <div className="p-6">
                  <h3 className={`text-2xl font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Fatunsin Damilare
                  </h3>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
                    isDarkMode 
                      ? 'bg-blue-900/30 text-blue-300' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    MERN Stack Developer
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isDarkMode ? 'bg-gray-700' : 'bg-blue-100'
                      }`}>
                        <FaMapMarkerAlt className={`w-5 h-5 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>Based in</div>
                        <div className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>Lagos, Nigeria</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isDarkMode ? 'bg-gray-700' : 'bg-blue-100'
                      }`}>
                        <FaGlobe className={`w-5 h-5 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>Available for</div>
                        <div className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>Remote Work</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl p-4 border backdrop-blur-sm ${
                    isDarkMode 
                      ? 'bg-gray-800/40 border-gray-700' 
                      : 'bg-white/70 border-white/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                    {React.cloneElement(stat.icon, { className: "w-6 h-6 text-white" })}
                  </div>
                  <div className={`text-2xl font-bold mb-1 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </div>
                  <div className={`text-xs font-medium ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Introduction */}
            <div className={`rounded-3xl p-6 md:p-8 border backdrop-blur-lg ${
              isDarkMode 
                ? 'bg-gray-800/40 border-gray-700' 
                : 'bg-white/70 border-white/50'
            }`}>
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  isDarkMode ? 'bg-linear-to-r from-blue-900/30 to-cyan-900/30' : 'bg-linear-to-r from-blue-100 to-cyan-100'
                }`}>
                  <FaLightbulb className={`w-6 h-6 ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <h2 className={`text-2xl md:text-3xl font-bold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    My Development Journey
                  </h2>
                  <div className={`space-y-4 leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <p>
                      I'm a passionate MERN stack developer with 4+ years of experience building complete web applications. 
                      My expertise spans from crafting responsive React frontends to building robust Node.js backends.
                    </p>
                    <p>
                      What drives me is the process of turning complex ideas into clean, functional, and scalable web solutions. 
                      I take pride in writing maintainable code and creating intuitive user experiences.
                    </p>
                    <p>
                      Currently, I specialize in the MERN stack (MongoDB, Express, React, Node.js) and have successfully deployed 
                      numerous projects using modern deployment platforms like Vercel and Render.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <FaCheckCircle className="w-4 h-4 text-green-500" />
                    My Strengths
                  </h4>
                  <ul className={`space-y-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                      <span>Full-stack MERN development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                      <span>REST API design & development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                      <span>Responsive UI with Tailwind CSS</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className={`text-lg font-semibold mb-3 flex items-center gap-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <FaStar className="w-4 h-4 text-yellow-500" />
                    My Approach
                  </h4>
                  <ul className={`space-y-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                      <span>Clean, readable code structure</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                      <span>Thorough testing before deployment</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                      <span>Continuous learning & improvement</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Deployment & Hosting Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {deployment.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl p-6 border backdrop-blur-sm group hover:scale-[1.02] transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-800/40 border-gray-700 hover:border-blue-500/50' 
                      : 'bg-white/70 border-white/50 hover:border-blue-400/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isDarkMode ? 'bg-gray-700/50' : 'bg-blue-50'
                    }`}>
                      <div className={`text-xl ${item.color}`}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className={`text-xl font-bold ${
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {item.title}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          isDarkMode 
                            ? 'bg-blue-900/30 text-blue-300' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {item.platform}
                        </span>
                      </div>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default About;