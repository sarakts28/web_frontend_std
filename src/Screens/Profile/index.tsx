import { Box } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { useToast } from '../../Components/Toast';
import { useThunkDispatch } from '../../Hooks/useThunkDispatch';
import { getGoogleAuthentication } from '../../Store/Thunk/GoogleActivityThunk';
import { Fullfiled } from '../../Utilities/ApplicationConstants';
const Profile = () => {
  const { showToast } = useToast();

  const disptach = useThunkDispatch();
  const handleGoogleSignIn = async () => {
    // showToast('success', 'Sign in with Google clicked');
    const response: any = await disptach(getGoogleAuthentication());

    if (response?.type?.includes(Fullfiled)) {
      const newWindow = window.open('', '_blank');

      if (newWindow) newWindow.location.href = response.payload;
    } else showToast('error', 'Sign in with Google failed');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
      }}
    >
      <Box
        sx={{
          border: '1px solid black',
          padding: '10px 20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: 'auto',
          fontSize: '20px',
        }}
        onClick={handleGoogleSignIn}
      >
        <FcGoogle fontSize={32} />
        Sign in with Google
      </Box>
    </Box>
  );
};

export default Profile;
