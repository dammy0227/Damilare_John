import React, { useState, useEffect } from 'react';
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
  FaArrowRight
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

const Project = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { projects, loading, error } = useSelector((state) => state.projects);
  
  // State
  const [expandedTech, setExpandedTech] = useState({});
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ setIsVideoPlaying] = useState(false);

  // Fetch projects on component mount
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Get only first 3 projects for home page
  const featuredProjects = projects.slice(0, 3);

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
    setIsVideoPlaying(false);
  };

  // Close project modal
  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setIsVideoPlaying(false);
  };

  // Navigate to all projects page
  const handleViewAllProjects = () => {
    navigate('/projects');
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
    <section id="projects" className={`min-h-screen transition-colors duration-300 py-20 ${
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
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Featured <span className="bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className={`w-24 h-1 mx-auto rounded-full bg-linear-to-r from-blue-500 to-cyan-500 mb-6`}></div>
          <p className={`text-lg max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Here are some of my recent projects. Each project showcases my skills and passion for creating 
            innovative solutions with modern technologies.
          </p>
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
              Loading amazing projects...
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
        {!loading && !error && featuredProjects.length === 0 && (
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
              No Projects Yet
            </h3>
            <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Projects will appear here once added.
            </p>
          </motion.div>
        )}

        {/* Projects Grid - Only 3 Projects */}
        {!loading && !error && featuredProjects.length > 0 && (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredProjects.map((project) => {
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

            {/* View All Projects Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewAllProjects}
                className={`group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all ${
                  isDarkMode
                    ? 'bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                    : 'bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
                } shadow-lg hover:shadow-xl`}
              >
                <span>View All Projects</span>
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              {projects.length > 3 && (
                <p className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Showing {featuredProjects.length} of {projects.length} projects
                </p>
              )}
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
                      className="w-full h-auto max-h-100 object-contain"
                    />
                  </div>
                ) : selectedProject.imageUrl ? (
                  <div className="mb-6 rounded-xl overflow-hidden">
                    <img 
                      src={selectedProject.imageUrl} 
                      alt={selectedProject.title}
                      className="w-full h-auto max-h-100 object-cover"
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

export default Project;