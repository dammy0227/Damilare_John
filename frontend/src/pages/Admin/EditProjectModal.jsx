import React, { useState, useEffect } from 'react';
import { FaTimes, FaCheck, FaImage, FaVideo, FaFileUpload, FaCloudUploadAlt } from 'react-icons/fa';

const EditProjectModal = ({ 
  isOpen, 
  onClose, 
  project, 
  onSubmit, 
  isDarkMode, 
  loading 
}) => {
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

  // Process tech stack safely
  const processTechStack = React.useCallback((techStack) => {
    if (!techStack) return '';
    
    let techStackString = '';
    
    if (Array.isArray(techStack)) {
      // Flatten and clean the array
      const cleanTechStack = techStack.flat(Infinity)
        .filter(item => item && typeof item === 'string')
        .map(tech => {
          if (typeof tech === 'string') {
            // Remove quotes and brackets
            let cleanTech = tech.replace(/[[\]"]/g, '').trim();
            return cleanTech;
          }
          return String(tech).trim();
        });
      techStackString = cleanTechStack.join(', ');
    } else if (typeof techStack === 'string') {
      try {
        // Try to parse as JSON
        const parsed = JSON.parse(techStack);
        if (Array.isArray(parsed)) {
          const cleanTechStack = parsed.flat(Infinity)
            .filter(item => item && typeof item === 'string')
            .map(tech => tech.replace(/[[\]"]/g, '').trim());
          techStackString = cleanTechStack.join(', ');
        } else {
          techStackString = techStack.replace(/[[\]"]/g, '');
        }
      } catch {
        // If not JSON, clean the string
        techStackString = techStack.replace(/[[\]"]/g, '');
      }
    }
    
    return techStackString;
  }, []);

  // Move initializeForm INSIDE useEffect to avoid dependency issues
  useEffect(() => {
    if (!project) return;

    const initializeForm = () => {
      const techStackString = processTechStack(project.techStack);
      
      setProjectForm({
        title: project.title || '',
        description: project.description || '',
        techStack: techStackString,
        githubLink: project.githubLink || '',
        liveLink: project.liveLink || '',
        imageFile: null,
        videoFile: null
      });

      if (project.imageUrl) {
        setPreviewImage(project.imageUrl);
      } else {
        setPreviewImage(null);
      }
      
      if (project.videoUrl) {
        setPreviewVideo(project.videoUrl);
      } else {
        setPreviewVideo(null);
      }
    };

    initializeForm();
  }, [project, processTechStack]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(projectForm);
  };

  if (!isOpen || !project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto ${
          isDarkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        } border`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Edit Project
            </h3>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Project Title *
                </label>
                <input
                  type="text"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                  required
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Tech Stack (comma separated) *
                </label>
                <input
                  type="text"
                  value={projectForm.techStack}
                  onChange={(e) => setProjectForm({...projectForm, techStack: e.target.value})}
                  required
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Node.js, React, MongoDB, etc."
                />
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Separate technologies with commas
                </p>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Description *
              </label>
              <textarea
                value={projectForm.description}
                onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                required
                rows="3"
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                placeholder="Describe your project..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  GitHub Link
                </label>
                <input
                  type="url"
                  value={projectForm.githubLink}
                  onChange={(e) => setProjectForm({...projectForm, githubLink: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="https://github.com/username/project"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Live Demo Link
                </label>
                <input
                  type="url"
                  value={projectForm.liveLink}
                  onChange={(e) => setProjectForm({...projectForm, liveLink: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="https://your-project.com"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex items-center gap-2">
                  <FaImage className="w-4 h-4" />
                  Project Image
                </div>
              </label>
              <div className={`rounded-xl border-2 border-dashed transition-all ${
                isDarkMode 
                  ? 'border-gray-700 hover:border-blue-500' 
                  : 'border-gray-300 hover:border-blue-400'
              }`}>
                {previewImage ? (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <FaImage className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Image Preview
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removeImage}
                        className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}
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
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <FaCloudUploadAlt className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <div className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Upload Project Image
                    </div>
                    <div className={`text-xs mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      JPG, PNG, or WebP (max 5MB)
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${
                      isDarkMode 
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
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex items-center gap-2">
                  <FaVideo className="w-4 h-4" />
                  Project Video (Optional)
                </div>
              </label>
              <div className={`rounded-xl border-2 border-dashed transition-all ${
                isDarkMode 
                  ? 'border-gray-700 hover:border-blue-500' 
                  : 'border-gray-300 hover:border-blue-400'
              }`}>
                {previewVideo ? (
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <FaVideo className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {typeof previewVideo === 'string' && previewVideo.includes('http') ? 'Existing Video' : 'Video Selected'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={removeVideo}
                        className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-500'}`}
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    </div>
                    {typeof previewVideo === 'string' && previewVideo.includes('http') ? (
                      <div className={`text-sm p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                        Existing video URL
                      </div>
                    ) : (
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
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
                      isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <FaFileUpload className={`w-8 h-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    </div>
                    <div className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Upload Project Video
                    </div>
                    <div className={`text-xs mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      MP4, WebM, or MOV (max 50MB)
                    </div>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                    <div className={`inline-block px-4 py-2 rounded-lg text-sm font-medium ${
                      isDarkMode 
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
                onClick={onClose}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 rounded-xl font-medium text-white transition-all ${
                  isDarkMode
                    ? 'bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                    : 'bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Updating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <FaCheck className="w-4 h-4" />
                    Update Project
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;