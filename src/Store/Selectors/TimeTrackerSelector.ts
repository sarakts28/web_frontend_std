import { RootState } from '../index';
import { createSelector } from '@reduxjs/toolkit';

const timeTrackerSelector = (state: RootState) => state.timeTracker;

export const getCompleteTimeTrackerList = createSelector(
  timeTrackerSelector,
  (timeTrackerState) => {
    return timeTrackerState?.completeTimeTrackerList?.data;
  }
);

export const getTimeTrackerListLoading = createSelector(
  timeTrackerSelector,
  (timeTrackerState) => {
    return timeTrackerState?.completeTimeTrackerList?.isLoading;
  }
);
