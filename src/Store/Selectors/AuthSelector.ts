import { RootState } from '../index';
import { createSelector } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authStateSelector = (state: RootState) => state.auth;

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

export const getAccessToken = createSelector(authStateSelector, () => {
  return Cookies.get('AccessToken');
});

export const getRefreshToken = createSelector(authStateSelector, () => {
  return Cookies.get('RefreshToken');
});

export const getDecodedToken = createSelector(getAccessToken, (accessToken) => {
  if (accessToken) {
    return parseJwt(accessToken);
  } else {
    try {
      var displayInfoEncoded = Cookies.get('DisplayInfo');

      if (!displayInfoEncoded) {
        return null;
      }

      const decodedDisplayInfo = decodeURIComponent(displayInfoEncoded);

      return JSON.parse(decodedDisplayInfo);
    } catch (error) {
      console.error('Error decoding DisplayInfo:', error);
      return null;
    }
  }
});

export const getUserData = createSelector(
  getDecodedToken,
  (decodedToken: any) => {
    return decodedToken;
  }
);

export const getAuthLoader = createSelector(authStateSelector, (authState) => {
  return authState.login.isLoading;
});

export const getAuthError = createSelector(authStateSelector, (authState) => {
  return authState.login.isError;
});

export const getAuthMessage = createSelector(authStateSelector, (authState) => {
  return authState.login.message;
});
