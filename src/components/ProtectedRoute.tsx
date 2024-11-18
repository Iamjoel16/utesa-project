import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


interface ProtectedRouteProps {
  children: JSX.Element;
  requiredLevel: number; 
}

interface DecodedToken {
  access_level: number;
  exp: number;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredLevel }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      localStorage.removeItem('token'); 
      return <Navigate to="/login" />;
    }

    if (decoded.access_level < requiredLevel) {
      return <Navigate to="/" />;
    }
  } catch (error) {
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
