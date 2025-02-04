import { RootState } from '../index';
import { createSelector } from '@reduxjs/toolkit';

const googleActivitySelector = (state: RootState) => state.googleActivity;

export const getAllEmailGmail = createSelector(
  googleActivitySelector,
  (googleActivity) => googleActivity.data.messages
);

export const getTotalEmails = createSelector(
  googleActivitySelector,
  (googleActivity) => googleActivity.data.resultSizeEstimate
);

export const getNextPageToken = createSelector(
  googleActivitySelector,
  (googleActivity) => googleActivity.data.nextPageToken
);

export const getTokenArray = createSelector(
  googleActivitySelector,
  (googleActivity) => googleActivity.tokenPageArray
);

export const getGoogleActivityLoading = createSelector(
  googleActivitySelector,
  (googleActivity) => googleActivity.isLoading
);
