import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { admin } = useSelector((state) => state.auth);

  // Check if admin exists and has a token
  const isAuthenticated = admin && localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;