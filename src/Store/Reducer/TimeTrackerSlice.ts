import { createSlice } from '@reduxjs/toolkit';
import { postTimeTracker, getTimeTrackerList } from '../Thunk/TimeTrackerThunk';
import { TimeTrackerData, TimeTracker } from '../Types/TimeTrackerTypes';

const initialAddedState: TimeTracker = {
  message: '',
  isError: false,
  isLoading: false,
};

const initialListState = {
  data: [] as TimeTrackerData[],
  message: '',
  isError: false,
  isLoading: false,
};

const initialState = {
  added: initialAddedState,
  completeTimeTrackerList: initialListState,
};

const timeTrackerSlice = createSlice({
  name: 'timeTracker',
  initialState,
  reducers: {
    resetState: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postTimeTracker.pending, (state) => {
        state.added.isLoading = true;
        state.added.isError = false;
      })
      .addCase(postTimeTracker.fulfilled, (state, { payload }) => {
        state.added.isLoading = false;
        state.added.isError = false;
        state.added.message = payload;
      })
      .addCase(postTimeTracker.rejected, (state, { payload }) => {
        state.added.isLoading = false;
        state.added.isError = true;
        state.added.message = payload;
      });

    builder
      .addCase(getTimeTrackerList.pending, (state) => {
        state.added.isLoading = true;
        state.added.isError = false;
      })
      .addCase(getTimeTrackerList.fulfilled, (state, { payload }) => {
        state.added.isLoading = false;
        state.added.isError = false;
        state.completeTimeTrackerList.data = payload;
      })
      .addCase(getTimeTrackerList.rejected, (state, { payload }) => {
        state.added.isLoading = false;
        state.added.isError = true;
        state.added.message = payload;
      });
  },
});

export const { resetState } = timeTrackerSlice.actions;

export default timeTrackerSlice.reducer;
