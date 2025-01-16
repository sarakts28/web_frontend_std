import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddGoogleAuth } from '../Actions/GoogleAuthenticationActions';
import { EndPoints as API_ENDPOINTS } from '../../Utilities/EndPoints';
import { getApiClient } from '../../Utilities/commonFunctions';

export const getGoogleAuthentication = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>(AddGoogleAuth, async (_, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI;
  const state = getState();
  const api = getApiClient(state);
  try {
    const response = await api.get(API_ENDPOINTS.googleAuth);
    return response.data;
  } catch (error: any) {
    return rejectWithValue('Failed to fetch details');
  }
});
