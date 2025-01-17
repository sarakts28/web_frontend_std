import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Activity } from '../Types/ActivityTrackerType';

interface FilterState {
  filter: string[] | string;
  customer: string[] | string;
  context: string[] | string;
  mainCategory: string[] | string;
  subTask: string[] | string;
  subDetailedTask: string[] | string;
}

const initialFilterState: FilterState = {
  filter: [],
  customer: [],
  context: [],
  mainCategory: [],
  subTask: [],
  subDetailedTask: [],
};

const initialReportAvtivityState: Activity = {
  id: '',
  customerId: '',
  userId: '',
  mainCategory: '',
  subTask: '',
  detailedSubTask: '',
  description: '',
  context: '',
  localDate: '',
  utcDate: '',
  date: new Date(),
  labelArray: [],
  duration: 0,
};

interface ReportActivityState {
  reportActivity: Activity;
  filters: FilterState;
}

const initialState: ReportActivityState = {
  reportActivity: initialReportAvtivityState,
  filters: initialFilterState,
};

const ReportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    addReportActivity: (state, action: PayloadAction<Activity>) => {
      state.reportActivity = action.payload;
    },

    resetReportActivity: (state) => {
      state.reportActivity = initialReportAvtivityState;
    },
    setFilter: (state, action: PayloadAction<string[]>) => {
      const newState = { ...state.filters };

      if (!action.payload.includes('customer')) newState.customer = [];
      if (!action.payload.includes('context')) newState.context = [];
      if (!action.payload.includes('mainCategory')) {
        newState.mainCategory = [];
        newState.subTask = [];
        newState.subDetailedTask = [];
      }

      if (!action.payload.includes('subTask')) {
        newState.subTask = [];
        newState.subDetailedTask = [];
      }

      if (!action.payload.includes('detailedSubTask')) {
        newState.subDetailedTask = [];
      }

      state.filters = { ...newState, filter: action.payload };
    },
    setCustomer: (state, action: PayloadAction<string[]>) => {
      state.filters.customer = action.payload;
    },
    setContext: (state, action: PayloadAction<string[]>) => {
      state.filters.context = action.payload;
    },
    setMainCategory: (state, action: PayloadAction<string[]>) => {
      state.filters.mainCategory = action.payload;
      state.filters.subTask = [];
      state.filters.subDetailedTask = [];
    },
    setSubTask: (state, action: PayloadAction<string[]>) => {
      state.filters.subTask = action.payload;
      state.filters.subDetailedTask = [];
    },
    setSubDetailedTask: (state, action: PayloadAction<string[]>) => {
      state.filters.subDetailedTask = action.payload;
    },
    clearFilters: (state) => {
      state.filters = { ...initialFilterState };
    },
  },
});

export const {
  addReportActivity,
  resetReportActivity,
  setFilter,
  setCustomer,
  setContext,
  setMainCategory,
  setSubTask,
  setSubDetailedTask,
  clearFilters,
} = ReportSlice.actions;

export default ReportSlice.reducer;
