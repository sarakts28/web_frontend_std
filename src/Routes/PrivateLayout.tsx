import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import HeaderMenuLayout from '../Components/HeaderMenuLayout';
import { Spinner } from '../Components';
import { useAuth } from '../Hooks/useAuth';

const PrivateLayout = () => {
  const { isAuthenticated, hasChecked } = useAuth();

  if (!hasChecked) {
    return <Spinner size={40} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // ✅ Proper redirection
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <HeaderMenuLayout />
    </Box>
  );
};

export default PrivateLayout;
