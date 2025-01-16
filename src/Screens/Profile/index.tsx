import { Box } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { useToast } from '../../Components/Toast';
import { useThunkDispatch } from '../../Hooks/useThunkDispatch';
import { getGoogleAuthentication } from '../../Store/Thunk/GoogleAuthenticationThunk';
import { Fullfiled } from '../../Utilities/ApplicationConstants';
const Profile = () => {
  const { showToast } = useToast();

  const disptach = useThunkDispatch();
  const handleGoogleSignIn = async () => {
    // showToast('success', 'Sign in with Google clicked');
    const response: any = await disptach(getGoogleAuthentication());
    if (response?.type?.includes(Fullfiled)) {
      const newWindow = window.open('', '_blank');
      if (newWindow)
        newWindow.location.href =
          'https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&response_type=code&client_id=366640526063-c9r0u3f5f5kph2fq18k98siq3td91gp2.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fmin-revisor.com%2Fapi%2Fgoogleauth%2Fcallback&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive%20https%3A%2F%2Fmail.google.com%2F&state=a511cf6d-0567-415e-b520-55734d6d91ab&prompt=consent';
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
