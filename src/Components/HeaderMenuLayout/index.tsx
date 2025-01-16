import { Box } from '@mui/material';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';
import EventTracker from '../EventTracker';

const HeaderMenuLayout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'auto' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          pl: { xs: 9, sm: 3 },
          pr: 2,
        }}
      >
        {/* Main Outlet Content */}
        <Box
          sx={{
            flex: 0.8,
            mt: 10,
            bgcolor: 'background.paper',
          }}
        >
          <Outlet />
        </Box>
      </Box>
      {/* Fixed Event Tracker on the right */}
      <Box
        sx={{
          position: 'fixed',
          right: 30,
          bgcolor: 'transparent',
          zIndex: 10,
          bottom: 20,
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <EventTracker />
      </Box>
    </Box>
  );
};

export default HeaderMenuLayout;
