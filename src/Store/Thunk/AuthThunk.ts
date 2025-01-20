import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthLogin, AuthLogout } from '../Actions/AuthActions';
import { EndPoints as API_ENDPOINTS } from '../../Utilities/EndPoints';
import { getApiClient } from '../../Utilities/commonFunctions';
import axios from 'axios';
import { AuthLoginState } from '../Types/AuthTypes';
import Cookies from 'js-cookie';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { REACT_APP_BASE_URL } = process.env;

export const loginApplication = createAsyncThunk<
  AuthLoginState,
  any,
  { rejectValue: string }
>('auth/login', async (payload, thunkAPI) => {
  const state = thunkAPI.getState();
  const api = getApiClient(state);

  try {
    const response = await api.post(API_ENDPOINTS.login, payload);

    if (process.env.NODE_ENV === 'development') {
      Cookies.set('AccessToken', response.data.accessToken);
      Cookies.set('RefreshToken', response.data.refreshToken);
    }

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data || error?.message);
  }
});

export const logout = createAsyncThunk(
  AuthLogout,
  async (payload: any, thunkAPI) => {
    const state = thunkAPI.getState();

    const api = getApiClient(state);

    try {
      await api.post(API_ENDPOINTS.logout, payload);
    } catch (error: any) {
      console.error(error);
    }
  }
);

export const refreshToken = createAsyncThunk(AuthLogin, async (_, thunkAPI) => {
  try {
    const response = await axios.post(
      `${REACT_APP_BASE_URL}${API_ENDPOINTS.refreshToken}`,
      {},
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error?.response?.data || error?.message);
  }
});
