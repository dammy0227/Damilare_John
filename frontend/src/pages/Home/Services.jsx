import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { 
  FaCode, 
  FaServer, 
  FaDatabase,
  FaReact,
  FaNodeJs,
  FaJsSquare,
  FaGithub,
  FaRocket,
  FaCloudUploadAlt,
  FaPalette,
  FaCogs,
  FaCheckCircle,
  FaArrowRight,
  FaClock,
  FaMoneyBillWave,
  FaHeadset,
  FaShieldAlt,
  FaSync,
  FaMobile,
  FaDesktop
} from 'react-icons/fa';
import { SiAppwrite, SiFirebase } from 'react-icons/si';

const Services = () => {
  const { isDarkMode } = useTheme();

  // Combined Services based on your actual skills
  const services = [
    {
      id: 1,
      icon: <FaReact className="w-8 h-8" />,
      title: "Frontend Development",
      description: "Building responsive, high-performance single-page applications with React.js. Creating reusable components, managing state with Redux Toolkit, and styling with Tailwind CSS.",
      features: [
        "React.js",
        "Redux Toolkit & Context API",
        "Tailwind CSS Styling",
        "Responsive Design",
        "Performance Optimization",
        "Dark/Light Mode Support",
        "Custom Animations"
      ],
      linear: "from-blue-500 to-cyan-500",
      iconColor: "text-blue-500"
    },
    {
      id: 2,
      icon: <FaNodeJs className="w-8 h-8" />,
      title: "Backend Development",
      description: "Building scalable server-side applications with Node.js and Express. Creating RESTful APIs with proper authentication, error handling, and documentation.",
      features: [
        "Node.js & Express.js",
        "RESTful API Development",
        "Authentication & Authorization",
        "Error Handling Middleware",
        "API Documentation",
        "Server Management",
        "Third-party Integrations"
      ],
      linear: "from-green-500 to-green-600",
      iconColor: "text-green-600"
    },
    {
      id: 3,
      icon: <FaDatabase className="w-8 h-8" />,
      title: "Database Solutions",
      description: "Complete database solutions including MongoDB, Firebase, and Appwrite. From schema design to cloud hosting and real-time capabilities.",
      features: [
        "MongoDB Atlas & Mongoose",
        "Firebase (Auth, Firestore, Hosting)",
        "Appwrite Integration",
        "Schema Design & Query Optimization",
        "Real-time Databases",
        "Cloud Hosting & Backups",
        "Connection Configuration"
      ],
      linear: "from-green-400 to-emerald-500",
      iconColor: "text-green-600"
    },
    {
      id: 4,
      icon: <FaCogs className="w-8 h-8" />,
      title: "State Management",
      description: "Efficient state management solutions for complex React applications using Redux Toolkit and Context API.",
      features: [
        "Redux Store Setup",
        "Slices & Reducers",
        "Async Thunks",
        "State Normalization",
        "Context API",
        "DevTools Integration",
        "Performance Optimization"
      ],
      linear: "from-purple-500 to-pink-500",
      iconColor: "text-purple-600"
    },
    {
      id: 5,
      icon: <FaGithub className="w-8 h-8" />,
      title: "Version Control & Deployment",
      description: "Professional version control with Git/GitHub and seamless deployment on Vercel and Render platforms.",
      features: [
        "Git & GitHub Workflow",
        "Branch Management",
        "Pull Requests & Code Review",
        "Vercel Frontend Deployment",
        "Render Backend Hosting",
        "Environment Configuration",
        "Continuous Deployment"
      ],
      linear: "from-gray-800 to-gray-900",
      iconColor: "text-gray-800 dark:text-gray-300"
    },
    {
      id: 6,
      icon: <FaSync className="w-8 h-8" />,
      title: "Full MERN Stack",
      description: "Complete end-to-end MERN application development from database design to frontend deployment and everything in between.",
      features: [
        "MongoDB + Express + React + Node",
        "Full-stack Integration",
        "Authentication System",
        "CRUD Operations",
        "API Integration",
        "Complete Deployment",
        "Post-Launch Support"
      ],
      linear: "from-indigo-500 to-blue-500",
      iconColor: "text-indigo-600"
    }
  ];

  // Why choose me features - based on your About section
  const whyChooseMe = [
    {
      icon: <FaClock className="w-6 h-6" />,
      title: "Timely Delivery",
      description: "I respect deadlines and deliver quality work on schedule, every time."
    },
    {
      icon: <FaMoneyBillWave className="w-6 h-6" />,
      title: "Fair & Transparent Pricing",
      description: "Clear pricing with no hidden costs. You know exactly what you're paying for."
    },
    {
      icon: <FaHeadset className="w-6 h-6" />,
      title: "Post-Launch Support",
      description: "24/7 support after deployment to ensure everything runs smoothly."
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "Clean, Readable Code",
      description: "I write maintainable code that's easy to understand and scale."
    }
  ];

  // My process - based on your workflow
  const processSteps = [
    {
      number: "01",
      title: "Discovery Call",
      description: "We discuss your project requirements, goals, and vision in detail."
    },
    {
      number: "02",
      title: "Planning",
      description: "I create a detailed project structure and technology roadmap."
    },
    {
      number: "03",
      title: "Design & Development",
      description: "Building your application with React, Node.js, and MongoDB."
    },
    {
      number: "04",
      title: "Testing",
      description: "Thorough testing of all features and responsive design."
    },
    {
      number: "05",
      title: "Deployment",
      description: "Launching on Vercel/Render with proper configuration."
    },
    {
      number: "06",
      title: "Handover & Support",
      description: "Complete project delivery with ongoing support."
    }
  ];

  // Tech stacks I actually use - Combined view
  const techStacks = [
    { name: "React.js", icon: <FaReact />, color: "text-blue-500" },
    { name: "Node.js", icon: <FaNodeJs />, color: "text-green-600" },
    { name: "MongoDB", icon: <FaDatabase />, color: "text-green-500" },
    { name: "Firebase", icon: <SiFirebase />, color: "text-yellow-600" },
    { name: "Appwrite", icon: <SiAppwrite />, color: "text-pink-600" },
    { name: "Tailwind CSS", icon: <FaPalette />, color: "text-cyan-500" },
    { name: "Redux Toolkit", icon: <FaCogs />, color: "text-purple-600" },
    { name: "Git/GitHub", icon: <FaGithub />, color: "text-gray-800 dark:text-gray-300" },
    { name: "Vercel/Render", icon: <FaCloudUploadAlt />, color: "text-black dark:text-white" }
  ];

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
    <section id="services" className={`min-h-screen transition-colors duration-300 py-20 ${
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
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl ${
          isDarkMode ? 'bg-cyan-500/5' : 'bg-cyan-200/30'
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 tracking-wider ${
              isDarkMode 
                ? 'bg-linear-to-r from-blue-900/30 to-cyan-900/30 text-blue-300 border border-blue-800/30' 
                : 'bg-linear-to-r from-blue-100 to-cyan-100 text-blue-700 border border-blue-200'
            }`}
          >
            WHAT I OFFER
          </motion.span>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            My <span className="bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-linear-to-r from-blue-500 to-cyan-500 mb-6"></div>
          <p className={`text-lg max-w-3xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            I specialize in complete MERN stack development with additional expertise in Firebase and Appwrite. 
            From frontend to backend, database to deployment - I've got you covered.
          </p>
        </motion.div>

        {/* Tech Stack Tags - More Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {techStacks.map((tech, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                isDarkMode 
                  ? 'bg-gray-800/80 text-gray-200 border border-gray-700' 
                  : 'bg-white text-gray-700 border border-gray-200'
              } shadow-sm`}
            >
              <span className={tech.color}>{tech.icon}</span>
              <span>{tech.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Services Grid - Now 7 cards instead of 14 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-10 md:mb-20"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className={`group relative rounded-2xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50' 
                  : 'bg-white/70 border-gray-200 hover:border-blue-400/50'
              } backdrop-blur-lg`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r ${service.linear} blur-xl`}></div>
              
              <div className={`relative p-6 h-full flex flex-col ${
                isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
              } m-px rounded-2xl`}>
                
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-linear-to-r ${service.linear} shadow-lg`}>
                  <div className="text-white text-2xl">
                    {service.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {service.title}
                </h3>

                {/* Description */}
                <p className={`text-sm mb-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {service.description}
                </p>

                {/* Features List - Showing more features per card */}
                <div className="grow">
                  <ul className="space-y-2">
                    {service.features.slice(0, 5).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <FaCheckCircle className={`w-4 h-4 mt-0.5 shrink-0 ${
                          isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`} />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Me Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={`rounded-3xl p-8 md:p-12 mb-10 md:mb-20 border backdrop-blur-lg ${
            isDarkMode 
              ? 'bg-gray-800/50 border-gray-700' 
              : 'bg-white/70 border-gray-200'
          }`}
        >
          <div className="text-center mb-10">
            <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Why Work With <span className="bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Me?</span>
            </h3>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              I don't just write code - I build solutions that solve real problems
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseMe.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-linear-to-r from-blue-500 to-cyan-500`}>
                  <div className="text-white text-2xl">
                    {item.icon}
                  </div>
                </div>
                <h4 className={`text-lg font-semibold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.title}
                </h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className={`text-3xl md:text-4xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              How I <span className="bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">Work</span>
            </h3>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              A simple, transparent process from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`relative rounded-2xl p-6 border ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700' 
                    : 'bg-white/70 border-gray-200'
                } backdrop-blur-lg group hover:shadow-xl transition-all duration-300`}
              >
                <div className={`absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center bg-linear-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg`}>
                  {step.number}
                </div>
                <div className="mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-linear-to-r from-blue-500 to-cyan-500 bg-opacity-20`}>
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </div>
                </div>
                <h4 className={`text-xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {step.title}
                </h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CSS Grid Pattern */}
        <style jsx>{`
          .bg-grid-pattern {
            background-image: linear-linear(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-linear(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 30px 30px;
          }
        `}</style>
      </div>
    </section>
  );
};

export default Services;