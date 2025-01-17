import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timer, Activity } from '../Types/ActivityTrackerType';
import { postActivityTracker } from '../Thunk/ActivityTrackerThunk';
import { TimeTracker } from '../Types/TimeTrackerTypes';

interface TimerState {
  timers: Timer[];
  activities: Activity[];
  filteredActivities: Activity[];
  addedActivity: TimeTracker;
}

const initialAddedState: TimeTracker = {
  message: '',
  isError: false,
  isLoading: false,
};

const initialState: TimerState = {
  timers: [],
  activities: [],
  filteredActivities: [],
  addedActivity: initialAddedState,
};

const ActivityTimeTrackerSlice = createSlice({
  name: 'activityTimers',
  initialState,
  reducers: {
    addActivity: (state, action: PayloadAction<Activity>) => {
      if (Array.isArray(action.payload)) state.activities = action.payload;
      else state.activities.push(action.payload);
    },

    filteredActivities: (state, action: PayloadAction<Activity>) => {
      if (Array.isArray(action.payload))
        state.filteredActivities = action.payload;
    },

    updateActivity: (state, action: PayloadAction<Activity>) => {
      const index = state.activities.findIndex(
        (activity) => activity.id === action.payload.id
      );

      if (index !== -1) {
        state.activities[index] = action.payload;
      }
    },

    removeActivity: (state, action: PayloadAction<string>) => {
      state.activities = state.activities.filter(
        (activity) => activity.id !== action.payload
      );
    },
    setTimers: (state, action: PayloadAction<Timer[]>) => {
      state.timers = action.payload;
    },
    addTimer: (state, action: PayloadAction<Timer>) => {
      state.timers.push(action.payload);
    },
    updateTimer: (state, action: PayloadAction<Timer>) => {
      const index = state.timers.findIndex(
        (timer) => timer.id === action.payload.id
      );

      if (index !== -1) {
        state.timers[index] = action.payload;
      }
    },

    removeTimer: (state, action: PayloadAction<string>) => {
      state.timers = state.timers.filter(
        (timer) => timer.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postActivityTracker.pending, (state) => {
        state.addedActivity.isLoading = true;
        state.addedActivity.isError = false;
      })
      .addCase(postActivityTracker.fulfilled, (state, { payload }) => {
        state.addedActivity.isLoading = false;
        state.addedActivity.isError = false;
        state.addedActivity.message = payload;
      })
      .addCase(postActivityTracker.rejected, (state, action) => {
        state.addedActivity.isLoading = false;
        state.addedActivity.isError = true;
        state.addedActivity.message = action.payload;
      });
  },
});

export const {
  setTimers,
  addTimer,
  updateTimer,
  removeTimer,
  addActivity,
  updateActivity,
  removeActivity,
  filteredActivities,
} = ActivityTimeTrackerSlice.actions;
export default ActivityTimeTrackerSlice.reducer;
