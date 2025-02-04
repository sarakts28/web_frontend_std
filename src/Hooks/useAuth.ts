import { useThunkDispatch } from './useThunkDispatch';
import { registerApplication } from '../Store/Thunk/AuthThunk';
import { useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import { resetState } from '../Store/Reducer/AuthSlice';
import { useLocation } from 'react-router-dom';
import { privateRoutes } from '../Routes/routesConfig';
import {
  getValueFromLocalStorage,
  removeValueFromLocalStorage,
  setValueToLocalStorage,
} from '../Utilities/commonFunctions';

export const useAuth = () => {
  const dispatch = useThunkDispatch();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  const isPrivateRoute = useCallback(() => {
    return privateRoutes.some((route) => route.path === location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (process.env.NODE_ENV === 'production') {
          if (
            !isPrivateRoute() &&
            getValueFromLocalStorage('isAuthenticated')
          ) {
            setIsAuthenticated(true);
            setHasChecked(true);
            return;
          }

          if (!isPrivateRoute()) {
            // ✅ If on a public route, don't call API & mark auth check as done
            setIsAuthenticated(false);
            setHasChecked(true);
            return;
          }

          // ✅ Call API only if on a private route
          const response = await dispatch(registerApplication());

          if (response?.payload && response.type.includes('fulfilled')) {
            setIsAuthenticated(true);
            setValueToLocalStorage('isAuthenticated', 'true');
          } else {
            dispatch(resetState());
            removeValueFromLocalStorage('isAuthenticated');
            setIsAuthenticated(false);
          }
        } else {
          // 🔧 Development Mode: Check cookies
          const accessToken = Cookies.get('AccessToken');
          const refreshToken = Cookies.get('RefreshToken');

          if (!accessToken || !refreshToken) {
            dispatch(resetState());
            setIsAuthenticated(false);
          } else {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error('Authentication error:', error);
        dispatch(resetState());
        setIsAuthenticated(false);
      } finally {
        setHasChecked(true);
      }
    };

    checkAuth();
  }, [dispatch, isPrivateRoute, location.pathname]);

  return { isAuthenticated, hasChecked };
};
