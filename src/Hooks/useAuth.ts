import { useSelector } from 'react-redux';
import { getAccessToken } from '../Store/Selectors/AuthSelector';
import { useThunkDispatch } from './useThunkDispatch';
import { refreshToken } from '../Store/Thunk/AuthThunk';

export const useAuth = () => {
  const token = useSelector(getAccessToken);
  const dispatch = useThunkDispatch();

  const checkAuth = async () => {
    if (token) {
      return true;
    } else {
      if (process.env.NODE_ENV === 'development') {
        return false;
      }

      console.warn('Token is missing or invalid. Checking refresh token...');
      const response: any = await dispatch(refreshToken());

      if (response?.type?.includes('rejected')) {
        console.warn(
          'Refresh token failed. User should be redirected to warnin.'
        );
        return false;
      }

      console.warn('Refresh token succeeded. User remains authenticated.');
      return false;
    }
  };

  return checkAuth;
};
