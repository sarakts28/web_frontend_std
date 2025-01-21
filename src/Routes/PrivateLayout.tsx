import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';
import { Box } from '@mui/material';
import HeaderMenuLayout from '../Components/HeaderMenuLayout';

const PrivateLayout = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const checkAuth = useAuth();

  useEffect(() => {
    const authenticate = async () => {
      const result = await checkAuth();

      setLoading(false);

      if (!result) {
        navigate('/login');
      }
    };

    authenticate();
  }, [checkAuth, navigate]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <HeaderMenuLayout />
    </Box>
  );
};

export default PrivateLayout;
