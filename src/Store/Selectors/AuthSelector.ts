import { RootState } from '../index';

import { createSelector } from 'reselect';
import Cookies from 'js-cookie';

interface AuthState {
  login: {
    data?: {
      accessToken?: string;
      refreshToken?: string;
    };
    message: string;
  };
}

const authStateSelector = (state: RootState): AuthState => state.auth;

// Helper function to decode JWT
const parseJwt = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};

export const getAccessToken = createSelector(authStateSelector, (authState) => {
  console.log(authState);
  if (process.env.NODE_ENV === 'production') {
    return Cookies.get('AccessToken');
  } else {
    return authState.login.data?.accessToken;
  }
});

export const getRefreshToken = createSelector(
  authStateSelector,
  (authState) => {
    if (process.env.NODE_ENV === 'production') {
      return Cookies.get('RefreshToken');
    } else {
      return authState.login.data?.refreshToken;
    }
  }
);

export const getDecodedToken = createSelector(getAccessToken, (accessToken) => {
  if (accessToken) {
    return parseJwt(accessToken);
  } else {
    console.warn('Access token is missing');
  }

  return null;
});

export const getUserRole = createSelector(
  getDecodedToken,
  (decodedToken: any) => {
    return decodedToken?.role;
  }
);

export const getUserData = createSelector(
  getDecodedToken,
  (decodedToken: any) => {
    return decodedToken;
  }
);

export const getAuthLoader = createSelector(authStateSelector, () => {
  return false;
});

export const getAuthError = createSelector(authStateSelector, () => {
  return false;
});

export const getAuthMessage = createSelector(authStateSelector, (authState) => {
  return authState.login.message;
});
