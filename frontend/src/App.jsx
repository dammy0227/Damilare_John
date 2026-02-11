import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';

// Main Site Components
import Hero from './pages/Home/Hero';
import About from './pages/Home/About';
import Skills from './pages/Home/Skills';
import Contact from './pages/Home/Contact';
import Footer from './pages/Home/Footer';
import Project from './pages/Home/Project';
import AllProject from './pages/Home/AllProject';

// Admin Components
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Services from './pages/Home/Services';

// Main Layout Component (for homepage)
const MainSite = () => {
  return (
    <div className="transition-all duration-300">
      <Hero />
      <About />
      <Skills />
      <Services />
      <Project /> 
      <Contact />
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Main Website Route - Homepage */}
          <Route path="/" element={<MainSite />} />
          
          <Route path="/projects" element={<AllProject />} />
          
          {/* Admin Authentication Routes */}
          <Route path="/admin/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirects */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;