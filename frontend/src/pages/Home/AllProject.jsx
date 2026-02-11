import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { fetchProjects } from '../../features/project/projectThunk';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaCode,
  FaServer,
  FaDatabase,
  FaTools,
  FaBrain,
  FaMobile,
  FaPalette,
  FaCloud,
  FaExpand,
  FaCompress,
  FaTimes,
  FaPlay,
  FaChevronDown,
  FaChevronUp,
  FaArrowLeft,
  FaSearch,
  FaFilter
} from 'react-icons/fa';

// Tech stack icons mapping
const techIcons = {
  'node.js': FaServer,
  'express': FaServer,
  'mongodb': FaDatabase,
  'react.js': FaCode,
  'react': FaCode,
  'redux': FaTools,
  'cohere ai': FaBrain,
  'ocr': FaMobile,
  'javascript': FaCode,
  'typescript': FaCode,
  'html': FaCode,
  'css': FaPalette,
  'next.js': FaCode,
  'vue.js': FaCode,
  'angular': FaCode,
  'docker': FaTools,
  'aws': FaCloud,
  'firebase': FaDatabase,
  'mysql': FaDatabase,
  'postgresql': FaDatabase,
  'graphql': FaCode,
  'tailwind': FaPalette,
  'bootstrap': FaPalette,
  'sass': FaPalette,
  'git': FaCode,
  'api': FaCode,
};

const getTechIcon = (tech) => {
  const lowerTech = tech.toLowerCase();
  for (const [key, icon] of Object.entries(techIcons)) {
    if (lowerTech.includes(key)) {
      return icon;
    }
  }
  return FaCode;
};

const AllProject = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { projects, loading, error } = useSelector((state) => state.projects);
  
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTech, setFilterTech] = useState('');
  const [expandedTech, setExpandedTech] = useState({});
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch projects on component mount
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Get unique tech stacks from all projects - FIXED: Using useMemo instead of useEffect with setState
  const filteredTechs = useMemo(() => {
    return Array.from(
      new Set(projects.flatMap(p => p.techStack || []))
    ).filter(Boolean).sort();
  }, [projects]);

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTech = !filterTech || 
                       project.techStack?.some(tech => 
                         tech.toLowerCase().includes(filterTech.toLowerCase())
                       );
    
    return matchesSearch && matchesTech;
  });

  // Toggle functions
  const toggleDescription = (projectId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const toggleTechStack = (projectId) => {
    setExpandedTech(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  // Open project modal
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Close project modal
  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Navigate back to home page
  const handleGoBack = () => {
    navigate('/#projects');
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setFilterTech('');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className={`min-h-screen transition-colors duration-300 py-20 ${
      isDarkMode 
        ? 'bg-linear-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-linear-to-br from-gray-50 via-blue-50 to-gray-100'
    }`}>
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl ${
          isDarkMode ? 'bg-blue-500/5' : 'bg-blue-200/30'
        }`}></div>
        <div className={`absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl ${
          isDarkMode ? 'bg-purple-500/5' : 'bg-purple-200/30'
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        >
          <div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              All <span className="bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Projects</span>
            </h2>
            <div className={`w-24 h-1 rounded-full bg-linear-to-r from-blue-500 to-cyan-500`}></div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className={`group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700' 
                : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200'
            }`}
          >
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </motion.button>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className={`rounded-2xl p-6 mb-10 border backdrop-blur-lg ${
            isDarkMode 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/70 border-white/50'
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <FaSearch className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search projects by title or description..."
                  className={`w-full pl-12 pr-4 py-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Tech Filter Dropdown */}
            <div className="lg:w-72">
              <div className="relative">
                <FaFilter className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <select
                  value={filterTech}
                  onChange={(e) => setFilterTech(e.target.value)}
                  className={`w-full pl-12 pr-10 py-4 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">All Technologies</option>
                  {filteredTechs.map((tech, index) => (
                    <option key={index} value={tech}>{tech}</option>
                  ))}
                </select>
                <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  ▼
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || filterTech) && (
            <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Active Filters:
              </span>
              {searchTerm && (
                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
                  isDarkMode 
                    ? 'bg-blue-900/30 text-blue-300 border border-blue-800' 
                    : 'bg-blue-100 text-blue-700 border border-blue-200'
                }`}>
                  <FaSearch className="w-3 h-3" />
                  {searchTerm}
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-1 hover:text-blue-500"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filterTech && (
                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm ${
                  isDarkMode 
                    ? 'bg-purple-900/30 text-purple-300 border border-purple-800' 
                    : 'bg-purple-100 text-purple-700 border border-purple-200'
                }`}>
                  <FaFilter className="w-3 h-3" />
                  {filterTech}
                  <button
                    onClick={() => setFilterTech('')}
                    className="ml-1 hover:text-purple-500"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className={`text-sm font-medium ml-auto ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Clear All
              </button>
            </div>
          )}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FaCode className="w-8 h-8 text-blue-500 animate-pulse" />
              </div>
            </div>
            <p className={`mt-6 text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Loading all projects...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-8 rounded-2xl border text-center max-w-2xl mx-auto ${
              isDarkMode 
                ? 'bg-red-500/10 border-red-500/20' 
                : 'bg-red-100 border-red-200'
            }`}
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isDarkMode ? 'bg-red-500/20' : 'bg-red-200'
            }`}>
              <FaCode className={`w-10 h-10 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}>
              Oops! Something went wrong
            </h3>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {error || 'Failed to load projects. Please try again later.'}
            </p>
            <button
              onClick={() => dispatch(fetchProjects())}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                isDarkMode 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <FaCode className={`w-12 h-12 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              No Projects Found
            </h3>
            <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm || filterTech 
                ? "We couldn't find any projects matching your criteria." 
                : "No projects have been added yet. Check back soon!"}
            </p>
            {(searchTerm || filterTech) && (
              <button
                onClick={clearFilters}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        )}

        {/* Projects Grid - All Projects */}
        {!loading && !error && filteredProjects.length > 0 && (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => {
                const techStack = project.techStack || [];
                const isExpandedTech = expandedTech[project._id];
                const isExpandedDesc = expandedDescriptions[project._id];
                const displayTech = isExpandedTech ? techStack : techStack.slice(0, 4);
                const maxDescLength = 120;

                return (
                  <motion.div
                    key={project._id}
                    variants={itemVariants}
                    className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl ${
                      isDarkMode 
                        ? 'bg-linear-to-br from-gray-800/80 to-gray-900/80 border-gray-700 hover:border-blue-500/50' 
                        : 'bg-linear-to-br from-white/80 to-gray-50/80 border-gray-200 hover:border-blue-400/50'
                    }`}
                  >
                    {/* Project Image */}
                    <div 
                      className="relative h-56 overflow-hidden cursor-pointer"
                      onClick={() => openProjectModal(project)}
                    >
                      {project.imageUrl ? (
                        <img 
                          src={project.imageUrl} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center ${
                          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                        }`}>
                          <div className="text-center">
                            <FaCode className={`w-16 h-16 mx-auto mb-2 ${
                              isDarkMode ? 'text-gray-700' : 'text-gray-300'
                            }`} />
                            <p className={`text-sm ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                              No Image Available
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className={`absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6`}>
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <span className="text-white text-sm font-medium bg-blue-600 px-3 py-1.5 rounded-lg">
                            View Details
                          </span>
                        </div>
                      </div>

                      {/* Tech Badges on Image */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {techStack.slice(0, 2).map((tech, index) => {
                          const Icon = getTechIcon(tech);
                          return (
                            <span
                              key={index}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 backdrop-blur-md ${
                                isDarkMode 
                                  ? 'bg-gray-900/80 text-gray-200 border border-gray-700' 
                                  : 'bg-white/90 text-gray-700 border border-gray-200'
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                              {tech.length > 12 ? tech.substring(0, 10) + '...' : tech}
                            </span>
                          );
                        })}
                        {techStack.length > 2 && (
                          <span className={`px-2.5 py-1.5 rounded-lg text-xs font-medium backdrop-blur-md ${
                            isDarkMode 
                              ? 'bg-gray-900/80 text-gray-200 border border-gray-700' 
                              : 'bg-white/90 text-gray-700 border border-gray-200'
                          }`}>
                            +{techStack.length - 2}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      {/* Title */}
                      <h3 className={`text-xl font-bold mb-3 line-clamp-1 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {project.title}
                      </h3>

                      {/* Description with Read More */}
                      <div className="mb-4">
                        <p className={`text-sm leading-relaxed ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {isExpandedDesc 
                            ? project.description
                            : project.description?.length > maxDescLength
                              ? `${project.description.substring(0, maxDescLength)}...`
                              : project.description || 'No description available'}
                        </p>
                        {project.description?.length > maxDescLength && (
                          <button
                            onClick={() => toggleDescription(project._id)}
                            className={`mt-2 text-sm font-medium inline-flex items-center gap-1 ${
                              isDarkMode 
                                ? 'text-blue-400 hover:text-blue-300' 
                                : 'text-blue-600 hover:text-blue-700'
                            }`}
                          >
                            {isExpandedDesc ? (
                              <>Read Less <FaChevronUp className="w-3 h-3" /></>
                            ) : (
                              <>Read More <FaChevronDown className="w-3 h-3" /></>
                            )}
                          </button>
                        )}
                      </div>

                      {/* Tech Stack */}
                      <div className="mb-5">
                        <div className="flex flex-wrap gap-2">
                          {displayTech.map((tech, index) => {
                            const Icon = getTechIcon(tech);
                            return (
                              <span
                                key={index}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 ${
                                  isDarkMode 
                                    ? 'bg-gray-700/50 text-gray-300 border border-gray-600' 
                                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                                }`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">{tech}</span>
                                <span className="sm:hidden">
                                  {tech.length > 8 ? tech.substring(0, 6) + '...' : tech}
                                </span>
                              </span>
                            );
                          })}
                          {techStack.length > 4 && (
                            <button
                              onClick={() => toggleTechStack(project._id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 ${
                                isDarkMode 
                                  ? 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50' 
                                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                              }`}
                            >
                              {isExpandedTech ? (
                                <>
                                  <FaCompress className="w-3 h-3" />
                                  <span className="hidden sm:inline">Less</span>
                                </>
                              ) : (
                                <>
                                  <FaExpand className="w-3 h-3" />
                                  <span className="hidden sm:inline">+{techStack.length - 4}</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-4">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 text-sm transition-all hover:scale-105 ${
                              isDarkMode 
                                ? 'text-gray-400 hover:text-white' 
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                              isDarkMode 
                                ? 'bg-gray-800/50 hover:bg-gray-700' 
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}>
                              <FaGithub className="w-4 h-4" />
                            </div>
                            <span className="hidden sm:inline">Code</span>
                          </a>
                        )}
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 text-sm transition-all hover:scale-105 ${
                              isDarkMode 
                                ? 'text-gray-400 hover:text-white' 
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                              isDarkMode 
                                ? 'bg-gray-800/50 hover:bg-gray-700' 
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}>
                              <FaExternalLinkAlt className="w-4 h-4" />
                            </div>
                            <span className="hidden sm:inline">Live Demo</span>
                          </a>
                        )}
                        {project.videoUrl && (
                          <button
                            onClick={() => openProjectModal(project)}
                            className={`flex items-center gap-2 text-sm transition-all hover:scale-105 ${
                              isDarkMode 
                                ? 'text-gray-400 hover:text-white' 
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                              isDarkMode 
                                ? 'bg-gray-800/50 hover:bg-gray-700' 
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}>
                              <FaPlay className="w-4 h-4" />
                            </div>
                            <span className="hidden sm:inline">Watch</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing <span className="font-bold text-blue-500">{filteredProjects.length}</span> of{' '}
                <span className="font-bold text-blue-500">{projects.length}</span> projects
              </p>
            </motion.div>
          </>
        )}
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto ${
                isDarkMode 
                  ? 'bg-gray-900 border-gray-800' 
                  : 'bg-white border-gray-200'
              } border shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeProjectModal}
                className={`absolute top-4 right-4 z-10 p-2 rounded-lg transition-all ${
                  isDarkMode 
                    ? 'bg-gray-800/80 hover:bg-gray-700 text-gray-400 hover:text-white' 
                    : 'bg-white/80 hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                } backdrop-blur-sm`}
              >
                <FaTimes className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                {/* Project Media */}
                {selectedProject.videoUrl ? (
                  <div className="mb-6 rounded-xl overflow-hidden bg-black">
                    <video 
                      src={selectedProject.videoUrl} 
                      controls
                      autoPlay={false}
                      className="w-full h-auto max-h-96 object-contain"
                    />
                  </div>
                ) : selectedProject.imageUrl ? (
                  <div className="mb-6 rounded-xl overflow-hidden">
                    <img 
                      src={selectedProject.imageUrl} 
                      alt={selectedProject.title}
                      className="w-full h-auto max-h-96 object-cover"
                    />
                  </div>
                ) : null}

                {/* Project Title */}
                <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {selectedProject.title}
                </h2>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.techStack?.map((tech, index) => {
                    const Icon = getTechIcon(tech);
                    return (
                      <span
                        key={index}
                        className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 ${
                          isDarkMode 
                            ? 'bg-gray-800 text-gray-300 border border-gray-700' 
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tech}
                      </span>
                    );
                  })}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className={`text-lg font-semibold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    About This Project
                  </h3>
                  <p className={`text-base leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {selectedProject.description}
                  </p>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {selectedProject.githubLink && (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all ${
                        isDarkMode 
                          ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}
                    >
                      <FaGithub className="w-5 h-5" />
                      View Source Code
                    </a>
                  )}
                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all ${
                        isDarkMode 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      <FaExternalLinkAlt className="w-5 h-5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AllProject;