import { createAsyncThunk } from '@reduxjs/toolkit';
import { TwilioSmsSent } from '../Actions/TwilioActions';
import { getApiClient } from '../../Utilities/commonFunctions';
import { EndPoints as API_ENDPOINTS } from '../../Utilities/EndPoints';

export const postCustomerSms = createAsyncThunk(
  TwilioSmsSent,
  async (payload: any, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    const state = getState();
    const api = getApiClient(state);

    try {
      const response = await api.post(API_ENDPOINTS.twilioSms, payload);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.data.errors);
    }
  }
);
