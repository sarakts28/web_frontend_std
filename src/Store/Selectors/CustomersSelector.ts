import { RootState } from '../index';
import { createSelector } from '@reduxjs/toolkit';

const customerSSelector = (state: RootState) => state.customers;

export const getAllCustomers = createSelector(
  [customerSSelector],
  (customersState) => customersState.data.data
);

export const getCustomersLoading = createSelector(
  [customerSSelector],
  (customersState) => customersState.isLoading
);

export const getTotalPages = createSelector(
  [customerSSelector],
  (customersState) => customersState.data.totalPages
);

export const getTotalCount = createSelector(
  [customerSSelector],
  (customersState) => customersState.data.totalCount
);
