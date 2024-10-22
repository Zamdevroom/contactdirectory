//These here define the protected routes

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authcontext';

const ProtectedRoutes = ({ children }) => {
  const { user } = useAuth();
  console.log("IN PROTECTED ROUTES", user);
  if (!user) {
    return <Navigate to="/" />;
  }
  
  return children;
};

export default ProtectedRoutes;
