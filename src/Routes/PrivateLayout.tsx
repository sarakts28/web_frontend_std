import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import { Box } from '@mui/material';
import HeaderMenuLayout from '../Components/HeaderMenuLayout';

const PrivateLayout = () => {
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

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <HeaderMenuLayout />
    </Box>
  );
};

export default PrivateLayout;
