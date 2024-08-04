// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivatePath = ({ children }) => {
  const token = localStorage.getItem('loginToken'); // Adjust this based on your token storage

  if (!token) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivatePath;
