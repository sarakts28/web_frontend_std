import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AddGoogleAuth,
  AddGmailAccess,
} from '../Actions/GoogleActivityActions';
import { EndPoints as API_ENDPOINTS } from '../../Utilities/EndPoints';
import { getApiClient } from '../../Utilities/commonFunctions';

const queryString = (filter: Record<string, any>) => {
  const queryParts: string[] = [];
  let pageToken = '';

  Object.keys(filter).forEach((key) => {
    const value = filter[key];

    if (Array.isArray(value)) {
      queryParts.push(`query=${key}:(${value.join(' OR ')})`);
    } else if (key === 'pageToken') {
      pageToken = `pageToken=${value}`;
    } else {
      queryParts.push(`query=${key}:(${value})`);
    }
  });

  return queryParts.join('&') + (pageToken ? `&${pageToken}` : '');
};

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
    return rejectWithValue(error || 'Failed to fetch details');
  }
});

export const getGmailAccess = createAsyncThunk<
  any,
  { filters?: Record<string, any> },
  { rejectValue: string }
>(AddGmailAccess, async (args, { rejectWithValue, getState }) => {
  const token = args?.filters;
  const api = getApiClient(getState());

  let url = API_ENDPOINTS.gmailAccess;

  if (token) {
    const values = queryString(token);

    url = `${API_ENDPOINTS.gmailAccess}?${values}`;
  }

  try {
    const response = await api.get(url);

    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch Gmail access');
  }
});
