import { createAsyncThunk } from '@reduxjs/toolkit';
import { EndPoints as API_ENDPOINTS } from '../../Utilities/EndPoints';
import {
  TimeTrackerActivityAdded,
  TimeTrackerActivityList,
  TimeTrackerActivityUpdated,
} from '../Actions/ActivityTrackerAction';
import { Activity } from '../Types/ActivityTrackerType';
import {
  addActivity,
  filteredActivities,
} from '../Reducer/ActivityTrackerSlice';
import { getApiClient } from '../../Utilities/commonFunctions';

const filterString = (filters: any): string => {
  if (!filters || !Array.isArray(filters)) return '';

  return filters
    .map((filter: any) => {
      if (filter.key === 'StartDate' && filter.value) {
        return `Date>=${filter.value}`;
      }

      if (filter.key === 'EndDate' && filter.value) {
        return `Date<=${filter.value}`;
      }

      if (filter.value && Array.isArray(filter.value)) {
        const valueString = filter.value
          .map((item: any) => `${filter.key}=${item}`)
          .join('|');

        return valueString;
      }

      if (filter.value) {
        return `${filter.key}=${filter.value}`;
      }

      return '';
    })
    .filter((str: string) => str)
    .join(',');
};

export const postActivityTracker = createAsyncThunk(
  TimeTrackerActivityAdded,
  async (payload: any, thunkAPI) => {
    const state = thunkAPI.getState();
    const api = getApiClient(state);

    try {
      const response = await api.post(API_ENDPOINTS.timeTrackerTask, payload);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.data.errors);
    }
  }
);

export const updateActivityTracker = createAsyncThunk(
  TimeTrackerActivityUpdated,
  async (payload: any, thunkAPI) => {
    const state = thunkAPI.getState();
    const api = getApiClient(state);

    try {
      const response = await api.put(API_ENDPOINTS.timeTrackerTask, payload);

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.data.errors);
    }
  }
);

export const getActivityTrackerList = createAsyncThunk<
  Activity[],
  { filter?: any },
  { rejectValue: string }
>(TimeTrackerActivityList, async (payload, thunkAPI) => {
  const { rejectWithValue, dispatch, getState } = thunkAPI;
  const state = getState();
  const api = getApiClient(state);

  try {
    const filter = payload?.filter ? filterString(payload.filter) : {};
    const response = await api.get(API_ENDPOINTS.timeTrackerTask, { filter });

    if (!payload?.filter) dispatch(addActivity(response.data?.data));
    else dispatch(filteredActivities(response.data?.data));
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || 'Failed to fetch time tracker list';

    return rejectWithValue(errorMessage);
  }
});

export const deleteActivityTracker = createAsyncThunk(
  TimeTrackerActivityAdded,
  async (payload: any, thunkAPI) => {
    const { rejectWithValue, dispatch, getState } = thunkAPI;

    const state = getState();
    const api = getApiClient(state);

    try {
      const response = await api.delete(
        `${API_ENDPOINTS.timeTrackerTask}/${payload}`
      );

      dispatch(addActivity(response.data?.data));
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Failed to fetch time tracker list';

      return rejectWithValue(errorMessage);
    }
  }
);
