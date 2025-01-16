import { RootState } from '../index';
import { createSelector } from 'reselect';

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
