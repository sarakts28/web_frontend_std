import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner, TranslationButton } from '../Components';
import { useAuth } from '../Hooks/useAuth';

const PublicLayout = () => {
  const { isAuthenticated, hasChecked } = useAuth();

  if (!hasChecked) {
    return <Spinner size={40} />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <TranslationButton />
      <Outlet />
    </>
  );
};

export default PublicLayout;
