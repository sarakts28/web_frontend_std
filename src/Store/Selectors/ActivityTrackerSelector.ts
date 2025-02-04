import { RootState } from '../index';
import { createSelector } from '@reduxjs/toolkit';

const activityTimeTrackerSelector = (state: RootState) => state.activityTimers;

export const getActivityTimeTrackerList = createSelector(
  activityTimeTrackerSelector,
  (activityTrackerState) => {
    return activityTrackerState?.timers;
  }
);

export const getActivities = createSelector(
  activityTimeTrackerSelector,
  (activityTrackerState) => {
    return activityTrackerState?.activities;
  }
);

export const getActivitiesIsError = createSelector(
  activityTimeTrackerSelector,
  (activityTrackerState) => {
    return activityTrackerState?.addedActivity?.isError;
  }
);

export const getActivitiesIsLoading = createSelector(
  activityTimeTrackerSelector,
  (activityTrackerState) => {
    return activityTrackerState?.addedActivity?.isLoading;
  }
);

export const getFilteredActivities = createSelector(
  activityTimeTrackerSelector,
  (activityTrackerState) => {
    return activityTrackerState?.filteredActivities;
  }
);
