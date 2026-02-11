import React from 'react';
import { 
  FaReact, 
  FaJs, 
  FaNodeJs, 
  FaDatabase, 
  FaGitAlt, 
  FaGithub,
  FaServer,
  FaPaintBrush,
  FaTools,
  FaRocket,
  FaHtml5,
  FaCss3Alt,
  FaMobile,
  FaBootstrap
} from 'react-icons/fa';
import { SiRedux, SiExpress, SiMongodb, SiPostman, SiVercel, SiTailwindcss } from 'react-icons/si';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const Skills = () => {
  const { isDarkMode } = useTheme();

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <FaPaintBrush className="w-6 h-6" />,
      skills: [
        { name: "React.js", level: 95, icon: <FaReact className="w-5 h-5" /> },
        { name: "JavaScript (ES6+)", level: 90, icon: <FaJs className="w-5 h-5" /> },
        { name: "Redux Toolkit", level: 85, icon: <SiRedux className="w-5 h-5" /> },
        { name: "HTML5", level: 95, icon: <FaHtml5 className="w-5 h-5" /> },
        { name: "CSS3 / Tailwind", level: 90, icon: <FaCss3Alt className="w-5 h-5" /> },
      ]
    },
    {
      title: "Backend Development",
      icon: <FaServer className="w-6 h-6" />,
      skills: [
        { name: "Node.js", level: 88, icon: <FaNodeJs className="w-5 h-5" /> },
        { name: "Express.js", level: 85, icon: <SiExpress className="w-5 h-5" /> },
        { name: "MongoDB", level: 82, icon: <SiMongodb className="w-5 h-5" /> },
        { name: "REST APIs", level: 87, icon: <FaServer className="w-5 h-5" /> },
      ]
    },
    {
      title: "Tools & Platforms",
      icon: <FaTools className="w-6 h-6" />,
      skills: [
        { name: "Git", level: 90, icon: <FaGitAlt className="w-5 h-5" /> },
        { name: "GitHub", level: 92, icon: <FaGithub className="w-5 h-5" /> },
        { name: "Postman", level: 88, icon: <SiPostman className="w-5 h-5" /> },
        { name: "Vercel/Render", level: 85, icon: <SiVercel className="w-5 h-5" /> },
      ]
    }
  ];

  const featuredSkills = [
    { name: "React.js", icon: <FaReact className="w-8 h-8" />, color: "from-cyan-500 to-blue-500" },
    { name: "Node.js", icon: <FaNodeJs className="w-8 h-8" />, color: "from-green-500 to-emerald-500" },
    { name: "MongoDB", icon: <FaDatabase className="w-8 h-8" />, color: "from-green-600 to-green-400" },
    { name: "Git/GitHub", icon: <FaGithub className="w-8 h-8" />, color: "from-gray-700 to-gray-900" },
    { name: "Html", icon: <FaHtml5 className="w-8 h-8" />, color: "from-blue-600 to-blue-400" },
    { name: "Express.js", icon: <SiExpress className="w-8 h-8" />, color: "from-gray-500 to-gray-700" },
  ];

  return (
    <section id="skills" className={`relative py-20 overflow-hidden transition-colors duration-300 ${
      isDarkMode 
        ? 'dark:bg-linear-to-b dark:from-gray-900 dark:via-gray-800 dark:to-gray-900' 
        : 'bg-linear-to-b from-white to-blue-50'
    }`}>
      
      {/* Background decorative elements */}
      <div className={`absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20 ${
        isDarkMode ? 'bg-blue-900' : 'bg-blue-200'
      }`}></div>
      <div className={`absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 ${
        isDarkMode ? 'bg-cyan-900' : 'bg-cyan-200'
      }`}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
            isDarkMode 
              ? 'bg-blue-900/30 text-blue-400 border border-blue-800/50' 
              : 'bg-blue-100 text-blue-600 border border-blue-200'
          }`}>
            TECHNICAL EXPERTISE
          </span>
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            My <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-600">Skills</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Technologies and tools I use to build modern, scalable web applications
          </p>
        </motion.div>

        {/* Featured Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
        >
          {featuredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/30 border-gray-700 hover:border-blue-500' 
                  : 'bg-white/50 border-blue-100 hover:border-blue-400'
              }`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-linear-to-r ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-3 ${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-blue-100/50'
                }`}>
                  <div className={`text-2xl ${skill.color.includes('blue') ? 'text-blue-500' : skill.color.includes('green') ? 'text-green-500' : 'text-gray-500'}`}>
                    {skill.icon}
                  </div>
                </div>
                <span className={`font-semibold text-center ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>{skill.name}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Categories with Progress Bars */}
        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.2 }}
              className={`rounded-2xl p-6 border backdrop-blur-sm transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800/30 border-gray-700 hover:border-blue-500' 
                  : 'bg-white/50 border-blue-100 hover:border-blue-400'
              }`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                }`}>
                  <div className={`text-xl ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {category.icon}
                  </div>
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>{category.title}</h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{category.skills.length} skills</p>
                </div>
              </div>

              {/* Skills List with Progress Bars */}
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (categoryIndex * 0.3) + (skillIndex * 0.1) }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isDarkMode ? 'bg-gray-800/50' : 'bg-blue-100/50'
                        }`}>
                          <div className={`${
                            skill.name.includes('React') ? 'text-cyan-500' :
                            skill.name.includes('JavaScript') ? 'text-yellow-500' :
                            skill.name.includes('Node') ? 'text-green-500' :
                            skill.name.includes('Mongo') ? 'text-green-400' :
                            skill.name.includes('Git') ? 'text-gray-500' :
                            'text-blue-500'
                          }`}>
                            {skill.icon}
                          </div>
                        </div>
                        <span className={`font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>{skill.name}</span>
                      </div>
                      <span className={`font-bold ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>{skill.level}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className={`h-2 rounded-full overflow-hidden ${
                      isDarkMode ? 'bg-gray-700' : 'bg-blue-100'
                    }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 + (skillIndex * 0.1) }}
                        className={`h-full rounded-full ${
                          skill.level >= 90 ? 'bg-linear-to-r from-green-500 to-emerald-500' :
                          skill.level >= 80 ? 'bg-linear-to-r from-blue-500 to-cyan-500' :
                          'bg-linear-to-r from-blue-400 to-blue-300'
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className={`mt-16 rounded-2xl p-8 border backdrop-blur-sm ${
            isDarkMode 
              ? 'bg-gray-800/30 border-gray-700' 
              : 'bg-white/50 border-blue-100'
          }`}
        >
          <div className="text-center mb-8">
            <h3 className={`text-2xl font-bold mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Additional Technologies
            </h3>
            <p className={`max-w-2xl mx-auto ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              I'm also familiar with these tools and technologies that enhance my development workflow
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "React Native", icon: <FaMobile className="w-5 h-5" />, color: "bg-blue-600 text-white" },
              { name: "Tailwind CSS", icon: <SiTailwindcss className="w-5 h-5" />, color: "bg-cyan-500 text-white" },
              { name: "Next.js", icon: "N", color: "bg-black text-white dark:bg-white dark:text-black" },
              { name: "Framer Motion", icon: "FM", color: "bg-purple-600 text-white" },
              { name: "AWS", icon: "AWS", color: "bg-orange-500 text-white" },
              { name: "Bootstrap", icon: <FaBootstrap className='w-5 h-5' />, color: "bg-blue-500 text-white" },
              { name: "Apprite", icon: "A", color: "bg-green-600 text-white" },
               { name: "Firebase", icon: "FB", color: "bg-yellow-500 text-white" },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + (index * 0.05) }}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 hover:border-blue-500' 
                    : 'bg-white border-blue-200 hover:border-blue-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full ${tech.color} flex items-center justify-center font-semibold text-sm`}>
                  {typeof tech.icon === 'string' ? tech.icon : tech.icon}
                </div>
                <span className={`font-medium text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

     
      </div>
    </section>
  );
};

export default Skills;