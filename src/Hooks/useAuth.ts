import { useSelector } from 'react-redux';
import { getAccessToken } from '../Store/Selectors/AuthSelector';
import { useThunkDispatch } from './useThunkDispatch';
import { refreshToken } from '../Store/Thunk/AuthThunk';
import { useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { resetState } from '../Store/Reducer/AuthSlice';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const token = useSelector(getAccessToken);
  const dispatch = useThunkDispatch();
  const navigate = useNavigate();

  const checkAuth = useCallback(async () => {
    console.log('working in hook');
    if (token) {
      return true;
    }

    const refreshTokenString = Cookies.get('RefreshToken');

    if (refreshTokenString) {
      const response = await dispatch(refreshToken());

      if (response?.type?.includes('rejected')) {
        dispatch(resetState());
        return false;
      }

      return true;
    }

    dispatch(resetState());
    return false;
  }, [token, dispatch, navigate]);

  useEffect(() => {
    const cookieToken = Cookies.get('AccessToken');
    const refreshTokenString = Cookies.get('RefreshToken');

    if (!cookieToken || !refreshTokenString) {
      dispatch(resetState());
    }
  }, [token, navigate, dispatch]);

  return checkAuth;
};
