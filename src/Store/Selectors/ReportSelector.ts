import { RootState } from '../index';
import { createSelector } from '@reduxjs/toolkit';

const reportStateSelector = (state: RootState) => state.reportActivity;

export const getSelectedActivity = createSelector(
  reportStateSelector,
  (reportState) => {
    return reportState.reportActivity;
  }
);

export const getFilters = createSelector(reportStateSelector, (reportState) => {
  return reportState.filters;
});
