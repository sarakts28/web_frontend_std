import React from 'react';
import { Box, Drawer, Typography } from '@mui/material';
import { ApplicationDataType } from './dataFile';

interface ApplicationDrawerProps {
  open: boolean;
  setClose: () => void;
  selectedItem: ApplicationDataType | null;
}

const ApplicationDrawer: React.FC<ApplicationDrawerProps> = ({
  open,
  setClose,
  selectedItem,
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={setClose}>
      <Box sx={{ width: 300, p: 2 }}>
        <Typography>ApplicationDrawer</Typography>
        <Typography>{selectedItem?.name}</Typography>
        <Typography>{selectedItem?.description}</Typography>
        <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
          We will design it later
        </Typography>
      </Box>
    </Drawer>
  );
};

export default ApplicationDrawer;
