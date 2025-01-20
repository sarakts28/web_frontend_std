import { useSelector } from 'react-redux';
import { getAccessToken } from '../Store/Selectors/AuthSelector';
import { useThunkDispatch } from './useThunkDispatch';
import { refreshToken } from '../Store/Thunk/AuthThunk';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { resetState } from '../Store/Reducer/AuthSlice';

export const useAuth = () => {
  const token = useSelector(getAccessToken);
  const dispatch = useThunkDispatch();

  const checkAuth = async () => {
    if (token) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const handleCookieChange = async () => {
      const cookieToken = Cookies.get('AccessToken');
      const refreshTokenString = Cookies.get('RefreshToken');

      console.log(refreshTokenString);
      if (!cookieToken && token && !refreshTokenString) {
        console.log('AccessToken cookie removed or does not exist.');
        dispatch(resetState());
      } else if (!refreshTokenString) {
        console.log('RefreshToken cookie removed or does not exist.');
        dispatch(resetState());
      } else if (!cookieToken && refreshTokenString) {
        console.warn('Token is missing or invalid. Checking refresh token...');
        const response = await dispatch(refreshToken());

        if (response?.type?.includes('rejected')) {
          console.warn(
            'Refresh token failed. User should be redirected to login page.'
          );
          dispatch(resetState());
        } else {
          console.warn('Refresh token succeeded. User remains authenticated.');
        }
      }
    };

    const observer = new MutationObserver(handleCookieChange);

    observer.observe(document, { attributes: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [token]);

  return checkAuth;
};
