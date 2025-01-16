import React from 'react';
import { Navigate } from 'react-router-dom';

interface RouteWrapperProps {
  isPrivate?: boolean;
  element: JSX.Element;
}

const RouteWrapper: React.FC<RouteWrapperProps> = ({
  isPrivate = false,
  element,
}) => {
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));

  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default RouteWrapper;
