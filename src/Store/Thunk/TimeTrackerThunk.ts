import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TimeTrackerAdded,
  TimeTrackerList,
} from '../Actions/TimeTrackerActions';
import { EndPoints as API_ENDPOINTS } from '../../Utilities/EndPoints';
import { TimeTrackerData } from '../Types/TimeTrackerTypes';
import { getApiClient } from '../../Utilities/commonFunctions';

export const postTimeTracker = createAsyncThunk(
  TimeTrackerAdded,
  async (payload: any, thunkAPI) => {
    const state = thunkAPI.getState();
    const api = getApiClient(state);
    try {
      const response = await api.post(API_ENDPOINTS.timeTracker, payload);

      thunkAPI.dispatch({
        type: 'timeTracker/Added/additionalAction',
        payload: {
          additionalInfo: Object.fromEntries(Object.entries(response.headers)),
        },
      });

      return {
        message: response.data,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data?.errors?.data[0]);
    }
  }
);

export const getTimeTrackerList = createAsyncThunk<
  TimeTrackerData[],
  void,
  { rejectValue: string }
>(TimeTrackerList, async (_, thunkAPI) => {
  const { rejectWithValue, dispatch, getState } = thunkAPI;
  const state = getState();
  const api = getApiClient(state);
  try {
    const response = await api.get(API_ENDPOINTS.timeTracker);
    return response.data;
  } catch (error: any) {
    return rejectWithValue('Failed to fetch time tracker list');
  }
});
