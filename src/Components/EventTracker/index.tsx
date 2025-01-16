import { IconButton } from '@mui/material';
import { useState } from 'react';
import { MdAccessTime } from 'react-icons/md';
import ActivityModal from './ActivityModal';

const EventTracker = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open ? (
        <ActivityModal onClose={handleClose} />
      ) : (
        <IconButton onClick={handleOpen}>
          <MdAccessTime size={30} />
        </IconButton>
      )}
    </>
  );
};

export default EventTracker;
