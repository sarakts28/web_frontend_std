import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthLogin, AuthLogout } from '../Actions/AuthActions';
import { EndPoints as API_ENDPOINTS } from '../../Utilities/EndPoints';
import { getApiClient } from '../../Utilities/commonFunctions';
import axios from 'axios';

const { REACT_APP_BASE_URL } = process.env;

export const loginApplication = createAsyncThunk(
  AuthLogin,
  async (payload: any, thunkAPI) => {
    const state = thunkAPI.getState();
    const api = getApiClient(state);

    try {
      const response = await api.post(API_ENDPOINTS.login, payload);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data || error?.message);
    }
  }
);

export const logout = createAsyncThunk(
  AuthLogout,
  async (payload: any, thunkAPI) => {
    const state = thunkAPI.getState();

    const api = getApiClient(state);

    try {
      await api.post(API_ENDPOINTS.logout, payload);
    } catch (error: any) {}
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
