import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';
import { 
  fetchProjects, 
  addProject, 
  editProject, 
  removeProject, 
} from '../../features/project/projectThunk';
import { 
  FaSignOutAlt, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaGithub,
  FaExternalLinkAlt,
  FaSearch,
  FaFilter,
  FaChartLine,
  FaUsers,
  FaHome,
  FaTimes,
  FaCheck,
  FaSun,
  FaMoon,
  FaImage,
  FaVideo,
  FaFileUpload,
  FaCloudUploadAlt,
  FaCode,
  FaServer,
  FaDatabase,
  FaTools,
  FaBrain,
  FaMobile,
  FaPalette,
  FaExpand,
  FaCompress
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import EditProjectModal from './EditProjectModal';

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
  'aws': FaCloudUploadAlt,
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

const Dashboard = () => {
  // Use local state for dashboard dark mode - independent from theme context
  const [isDashboardDarkMode, setIsDashboardDarkMode] = useState(() => {
    const savedDashboardTheme = localStorage.getItem('dashboard-theme');
    return savedDashboardTheme === 'dark' || false; // Default to light mode
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { admin } = useSelector((state) => state.auth);
  const { projects, loading, error } = useSelector((state) => state.projects);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTech, setFilterTech] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedTech, setExpandedTech] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  // Form states for ADD modal
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    techStack: '',
    githubLink: '',
    liveLink: '',
    imageFile: null,
    videoFile: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);

  // Save dashboard theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('dashboard-theme', isDashboardDarkMode ? 'dark' : 'light');
  }, [isDashboardDarkMode]);

  // Toggle dashboard dark mode independently
  const toggleDashboardTheme = () => {
    setIsDashboardDarkMode(!isDashboardDarkMode);
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    // Split tech stack into flat array
    const techArray = projectForm.techStack
      .split(',')
      .map(tech => tech.trim())
      .filter(Boolean);

    const formData = new FormData();
    formData.append('title', projectForm.title);
    formData.append('description', projectForm.description);
    formData.append('githubLink', projectForm.githubLink || '');
    formData.append('liveLink', projectForm.liveLink || '');
    
    // Send techStack as JSON string
    formData.append('techStack', JSON.stringify(techArray));

    if (projectForm.imageFile) {
      formData.append('image', projectForm.imageFile);
    }

    if (projectForm.videoFile) {
      formData.append('video', projectForm.videoFile);
    }

    try {
      await dispatch(addProject(formData)).unwrap();
      setShowAddModal(false);
      resetAddForm();
    } catch (err) {
      console.error('Failed to add project:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditSubmit = async (formData) => {
    setFormLoading(true);

    const techArray = formData.techStack
      .split(',')
      .map(tech => tech.trim())
      .filter(Boolean);

    const editFormData = new FormData();
    editFormData.append('title', formData.title);
    editFormData.append('description', formData.description);
    editFormData.append('githubLink', formData.githubLink || '');
    editFormData.append('liveLink', formData.liveLink || '');
    
    // Send techStack as JSON string
    editFormData.append('techStack', JSON.stringify(techArray));

    if (formData.imageFile) {
      editFormData.append('image', formData.imageFile);
    }

    if (formData.videoFile) {
      editFormData.append('video', formData.videoFile);
    }

    try {
      await dispatch(editProject({
        id: selectedProject._id,
        data: editFormData
      })).unwrap();
      setShowEditModal(false);
      setSelectedProject(null);
    } catch (err) {
      console.error('Failed to update project:', err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    setDeleteLoading(true);
    try {
      await dispatch(removeProject(id)).unwrap();
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Failed to delete project:', err);
    } finally {
      setDeleteLoading(false);
    }
  };

  const resetAddForm = () => {
    setProjectForm({
      title: '',
      description: '',
      techStack: '',
      githubLink: '',
      liveLink: '',
      imageFile: null,
      videoFile: null
    });
    setPreviewImage(null);
    setPreviewVideo(null);
    setFormLoading(false);
  };

  const openEditModal = (project) => {
    setSelectedProject(project);
    setShowEditModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectForm({...projectForm, imageFile: file});
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectForm({...projectForm, videoFile: file});
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewVideo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProjectForm({...projectForm, imageFile: null});
    setPreviewImage(null);
  };

  const removeVideo = () => {
    setProjectForm({...projectForm, videoFile: null});
    setPreviewVideo(null);
  };

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

  // Stats
  const stats = [
    { 
      icon: <FaChartLine />, 
      label: "Total Projects", 
      value: projects.length, 
      linear: "bg-linear-to-r from-blue-500 to-purple-500"
    },
    { 
      icon: <FaTools />, 
      label: "Tech Used", 
      value: Array.from(new Set(projects.flatMap(p => p.techStack || []))).length,
      linear: "bg-linear-to-r from-emerald-500 to-teal-500"
    },
    { 
      icon: <FaGithub />, 
      label: "GitHub Repos", 
      value: projects.filter(p => p.githubLink).length,
      linear: "bg-linear-to-r from-gray-800 to-gray-900"
    },
    { 
      icon: <FaExternalLinkAlt />, 
      label: "Live Projects", 
      value: projects.filter(p => p.liveLink).length,
      linear: "bg-linear-to-r from-orange-500 to-red-500"
    },
  ];

  // Tech stack options from existing projects
  const allTechStacks = Array.from(new Set(projects.flatMap(p => p.techStack || []))).filter(Boolean).sort();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDashboardDarkMode 
        ? 'bg-linear-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-linear-to-br from-gray-50 via-blue-50 to-gray-100'
    }`}>
      {/* Top Navigation */}
      <nav className={`sticky top-0 z-50 border-b backdrop-blur-lg ${
        isDashboardDarkMode 
          ? 'bg-gray-800/90 border-gray-700' 
          : 'bg-white/90 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className={`flex items-center gap-3 ${isDashboardDarkMode ? 'text-white' : 'text-gray-900'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isDashboardDarkMode ? 'bg-linear-to-r from-blue-600 to-cyan-600' : 'bg-linear-to-r from-blue-500 to-cyan-500'
                }`}>
                  <FaHome className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-md opacity-75">Welcome <span className='block'>{admin?.username}</span></p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl"
              >
                <FaSearch className={`w-5 h-5 ${isDashboardDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              </button>

              {/* Desktop Search */}
              <div className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl border ${
                isDashboardDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-300'
              }`}>
                <FaSearch className={`w-4 h-4 ${isDashboardDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`bg-transparent outline-none text-sm w-48 ${
                    isDashboardDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              {/* Dashboard Dark/Light Mode Toggle - Independent from Hero */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDashboardTheme}
                className={`p-2 rounded-xl border flex items-center justify-center ${
                  isDashboardDarkMode 
                    ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                {isDashboardDarkMode ? (
                  <FaSun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <FaMoon className="w-5 h-5 text-gray-600" />
                )}
              </motion.button>

              {/* Logout Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  isDashboardDarkMode 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                <FaSignOutAlt className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${
                isDashboardDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-300'
              }`}>
                <FaSearch className={`w-4 h-4 ${isDashboardDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`bg-transparent outline-none text-sm flex-1 ${
                    isDashboardDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className={`text-2xl md:text-3xl font-bold ${isDashboardDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Project Management
            </h2>
            <p className={`mt-2 ${isDashboardDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your portfolio projects from here
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all ${
              isDashboardDarkMode
                ? 'bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
                : 'bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
            }`}
          >
            <FaPlus className="w-5 h-5" />
            Add New Project
          </motion.button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2  lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl p-6 border backdrop-blur-lg ${
                isDashboardDarkMode 
                  ? 'bg-gray-800/50 border-gray-700' 
                  : 'bg-white/70 border-white/50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.linear}`}>
                  {React.cloneElement(stat.icon, { className: "w-6 h-6 text-white" })}
                </div>
              </div>
              <div className={`text-3xl font-bold mb-1 ${isDashboardDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </div>
              <div className={`text-sm ${isDashboardDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className={`rounded-2xl p-6 mb-8 border backdrop-blur-lg ${
          isDashboardDarkMode 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/70 border-white/50'
        }`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className={`block text-sm font-medium mb-2 ${isDashboardDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex items-center gap-2">
                  <FaSearch className="w-4 h-4" />
                  Search Projects
                </div>
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title or description..."
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  isDashboardDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            
            <div className="md:w-64">
              <label className={`block text-sm font-medium mb-2 ${isDashboardDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex items-center gap-2">
                  <FaFilter className="w-4 h-4" />
                  Filter by Technology
                </div>
              </label>
              <select
                value={filterTech}
                onChange={(e) => setFilterTech(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  isDashboardDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">All Technologies</option>
                {allTechStacks.map((tech, index) => (
                  <option key={index} value={tech}>{tech}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className={`rounded-2xl p-6 border backdrop-blur-lg ${
          isDashboardDarkMode 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/70 border-white/50'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-xl font-bold ${isDashboardDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Projects ({filteredProjects.length})
            </h3>
            {loading && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                Loading...
              </div>
            )}
          </div>

          {error && (
            <div className={`p-4 rounded-xl border mb-6 ${
              isDashboardDarkMode 
                ? 'bg-red-500/10 border-red-500/20 text-red-300' 
                : 'bg-red-100 border-red-200 text-red-700'
            }`}>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isDashboardDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'
              }`}>
                <FaSearch className={`w-8 h-8 ${isDashboardDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              </div>
              <h4 className={`text-xl font-semibold mb-2 ${isDashboardDarkMode ? 'text-white' : 'text-gray-900'}`}>
                No projects found
              </h4>
              <p className={`${isDashboardDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {searchTerm || filterTech 
                  ? 'Try adjusting your search or filters' 
                  : 'Add your first project to get started'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                const techStack = project.techStack || [];
                const isExpanded = expandedTech[project._id];
                const displayTech = isExpanded ? techStack : techStack.slice(0, 3);
                
                return (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`rounded-2xl overflow-hidden border transition-all hover:scale-[1.02] group ${
                      isDashboardDarkMode 
                        ? 'bg-linear-to-br from-gray-800/50 to-gray-900/50 border-gray-700 hover:border-blue-500/50' 
                        : 'bg-linear-to-br from-white/50 to-gray-50/50 border-gray-200 hover:border-blue-400/50'
                    }`}
                  >
                    {/* Project Image */}
                    <div className="h-48 overflow-hidden relative bg-linear-to-br from-blue-100 to-cyan-100 dark:from-gray-800 dark:to-gray-900">
                      {project.imageUrl ? (
                        <img 
                          src={project.imageUrl} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            isDashboardDarkMode ? 'bg-gray-700/50' : 'bg-white/50'
                          }`}>
                            <FaCode className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                          </div>
                        </div>
                      )}
                      {/* Tech Badge on Image */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {techStack.slice(0, 2).map((tech, index) => {
                          const Icon = getTechIcon(tech);
                          return (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 backdrop-blur-sm ${
                                isDashboardDarkMode 
                                  ? 'bg-gray-900/80 text-gray-200' 
                                  : 'bg-white/90 text-gray-700'
                              }`}
                            >
                              <Icon className="w-3 h-3" />
                              {tech.length > 10 ? tech.substring(0, 8) + '...' : tech}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <h4 className={`text-lg font-bold mb-2 line-clamp-1 ${isDashboardDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {project.title}
                      </h4>
                      
                      <p className={`text-sm mb-4 line-clamp-2 ${isDashboardDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {project.description}
                      </p>

                      {/* Tech Stack with Icons */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {displayTech.map((tech, index) => {
                          const Icon = getTechIcon(tech);
                          return (
                            <span
                              key={index}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                                isDashboardDarkMode 
                                  ? 'bg-gray-800/50 text-gray-300 border border-gray-700' 
                                  : 'bg-gray-100 text-gray-700 border border-gray-200'
                              }`}
                            >
                              <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="hidden sm:inline">{tech}</span>
                              <span className="sm:hidden">{tech.length > 8 ? tech.substring(0, 6) + '...' : tech}</span>
                            </span>
                          );
                        })}
                        {techStack.length > 3 && (
                          <button
                            type="button"
                            onClick={() => setExpandedTech(prev => ({
                              ...prev,
                              [project._id]: !prev[project._id]
                            }))}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 ${
                              isDashboardDarkMode 
                                ? 'bg-gray-800/30 text-gray-400 hover:bg-gray-800/50' 
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                          >
                            {isExpanded ? (
                              <>
                                <FaCompress className="w-3 h-3" />
                                <span className="hidden sm:inline">Show Less</span>
                                <span className="sm:hidden">Less</span>
                              </>
                            ) : (
                              <>
                                <FaExpand className="w-3 h-3" />
                                <span className="hidden sm:inline">+{techStack.length - 3} more</span>
                                <span className="sm:hidden">+{techStack.length - 3}</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>

                      {/* Links */}
                      <div className="flex items-center gap-4 mb-6">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 text-sm transition-all hover:scale-105 ${
                              isDashboardDarkMode 
                                ? 'text-gray-400 hover:text-white' 
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isDashboardDarkMode 
                                ? 'bg-gray-800/50 hover:bg-gray-700/50' 
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
                              isDashboardDarkMode 
                                ? 'text-gray-400 hover:text-white' 
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              isDashboardDarkMode 
                                ? 'bg-gray-800/50 hover:bg-gray-700/50' 
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}>
                              <FaExternalLinkAlt className="w-4 h-4" />
                            </div>
                            <span className="hidden sm:inline">Live Demo</span>
                          </a>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openEditModal(project)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                            isDashboardDarkMode 
                              ? 'bg-linear-to-r from-blue-900/30 to-blue-800/30 text-blue-300 hover:from-blue-900/50 hover:to-blue-800/50' 
                              : 'bg-linear-to-r from-blue-100 to-blue-50 text-blue-700 hover:from-blue-200 hover:to-blue-100'
                          }`}
                        >
                          <FaEdit className="w-4 h-4" />
                          Edit
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setDeleteConfirm(project._id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                            isDashboardDarkMode 
                              ? 'bg-linear-to-r from-red-900/30 to-red-800/30 text-red-300 hover:from-red-900/50 hover:to-red-800/50' 
                              : 'bg-linear-to-r from-red-100 to-red-50 text-red-700 hover:from-red-200 hover:to-red-100'
                          }`}
                        >
                          <FaTrash className="w-4 h-4" />
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Add Project Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto ${
                isDashboardDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              } border`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-2xl font-bold ${isDashboardDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Add New Project
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      isDashboardDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleAddProject} className="space-y-4" encType="multipart/form-data">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDashboardDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Project Title *
                      </label>
                      <input
                        type="text"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                        required
                        className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDashboardDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="Enter project title"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDashboardDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Tech Stack (comma separated) *
                      </label>
                      <input
                        type="text"
                        value={projectForm.techStack}
                        onChange={(e) => setProjectForm({...projectForm, techStack: e.target.value})}
                        required
                        className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDashboardDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="Node.js, React, MongoDB, etc."
                      />
                      <p className={`text-xs mt-1 ${isDashboardDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Separate technologies with commas
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDashboardDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Description *
                    </label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                      required
                      rows="3"
                      className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDashboardDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Describe your project..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDashboardDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        GitHub Link
                      </label>
                      <input
                        type="url"
                        value={projectForm.githubLink}
                        onChange={(e) => setProjectForm({...projectForm, githubLink: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDashboardDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="https://github.com/username/project"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${isDashboardDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Live Demo Link
                      </label>
                      <input
                        type="url"
                        value={projectForm.liveLink}
                        onChange={(e) => setProjectForm({...projectForm, liveLink: e.target.value})}
                        className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDashboardDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="https://your-project.com"
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDashboardDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="flex items-center gap-2">
                        <FaImage className="w-4 h-4" />
                        Project Image
                      </div>
                    </label>
                    <div className={`rounded-xl border-2 border-dashed transition-all ${
                      isDashboardDarkMode 
                        ? 'border-gray-700 hover:border-blue-500' 
                        : 'border-gray-300 hover:border-blue-400'
                    }`}>
                      {previewImage ? (
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <FaImage className={`w-5 h-5 ${isDashboardDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                              <span className={`text-sm font-medium ${isDashboardDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Image Preview
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={removeImage}
                              className={`p-1 rounded-lg ${isDashboardDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}
                            >
                              <FaTimes className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="relative h-48 rounded-lg overflow-hidden">
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      ) : (
                        <label className="block cursor-pointer p-8 text-center">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                            isDashboardDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                          }`}>
                            <FaCloudUploadAlt className={`w-8 h-8 ${isDashboardDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          </div>
                          <div className={`text-sm font-medium mb-2 ${isDashboardDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Upload Project Image
                          </div>
                          <div className={`text-xs mb-4 ${isDashboardDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            JPG, PNG, or WebP (max 5MB)
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${
                            isDashboardDarkMode 
                              ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50' 
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}>
                            Choose File
                          </div>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Video Upload */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDashboardDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="flex items-center gap-2">
                        <FaVideo className="w-4 h-4" />
                        Project Video (Optional)
                      </div>
                    </label>
                    <div className={`rounded-xl border-2 border-dashed transition-all ${
                      isDashboardDarkMode 
                        ? 'border-gray-700 hover:border-blue-500' 
                        : 'border-gray-300 hover:border-blue-400'
                    }`}>
                      {previewVideo ? (
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <FaVideo className={`w-5 h-5 ${isDashboardDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                              <span className={`text-sm font-medium ${isDashboardDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                {typeof previewVideo === 'string' && previewVideo.includes('http') ? 'Existing Video' : 'Video Selected'}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={removeVideo}
                              className={`p-1 rounded-lg ${isDashboardDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}
                            >
                              <FaTimes className="w-4 h-4" />
                            </button>
                          </div>
                          {typeof previewVideo === 'string' && previewVideo.includes('http') ? (
                            <div className={`text-sm p-3 rounded-lg ${isDashboardDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                              Existing video URL
                            </div>
                          ) : (
                            <div className={`p-3 rounded-lg ${isDashboardDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                              <video controls className="w-full h-48 object-cover rounded-lg">
                                <source src={previewVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}
                        </div>
                      ) : (
                        <label className="block cursor-pointer p-8 text-center">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                            isDashboardDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                          }`}>
                            <FaFileUpload className={`w-8 h-8 ${isDashboardDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          </div>
                          <div className={`text-sm font-medium mb-2 ${isDashboardDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Upload Project Video
                          </div>
                          <div className={`text-xs mb-4 ${isDashboardDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            MP4, WebM, or MOV (max 50MB)
                          </div>
                          <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                            className="hidden"
                          />
                          <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${
                            isDashboardDarkMode 
                              ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50' 
                              : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                          }`}>
                            Choose Video File
                          </div>
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className={`px-6 py-3 rounded-xl font-medium transition-all ${
                        isDashboardDarkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Cancel
                    </button>
                    
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={formLoading}
                      className={`px-6 py-3 rounded-xl font-medium text-white transition-all ${
                        isDashboardDarkMode
                          ? 'bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                          : 'bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                      } ${formLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {formLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Adding...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <FaPlus className="w-4 h-4" />
                          Add Project
                        </div>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Project Modal */}
      <EditProjectModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
        onSubmit={handleEditSubmit}
        isDarkMode={isDashboardDarkMode}
        loading={formLoading}
      />

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`rounded-2xl w-full max-w-md ${
                isDashboardDarkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              } border p-6`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isDashboardDarkMode 
                    ? 'bg-red-900/20 border border-red-800/50' 
                    : 'bg-red-100 border border-red-200'
                }`}>
                  <FaTrash className="w-8 h-8 text-red-500" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDashboardDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Delete Project?
                </h3>
                <p className={`${isDashboardDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  This action cannot be undone. The project will be permanently deleted.
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    isDashboardDarkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteProject(deleteConfirm)}
                  disabled={deleteLoading}
                  className={`px-6 py-3 rounded-xl font-medium text-white transition-all ${
                    isDashboardDarkMode 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-red-500 hover:bg-red-600'
                  } ${deleteLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {deleteLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Deleting...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FaTrash className="w-4 h-4" />
                      Delete Project
                    </div>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;