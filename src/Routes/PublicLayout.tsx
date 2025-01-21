import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import { TranslationButton } from '../Components';

const PublicLayout = () => {
  const checkAuth = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const authenticate = async () => {
      const result = await checkAuth();

      setIsAuthenticated(result);
      setLoading(false);
    };

    authenticate();
  }, [checkAuth]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
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
