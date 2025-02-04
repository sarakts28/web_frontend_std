import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {
  authReducer,
  activityTimeTrackerReducer,
  timeTrackerReducer,
  reportReducer,
  googleReducer,
  CustomersReducer,
} from './Reducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['activityTimer'], // Only persist activityTimer in both cases
};

const rootReducer = combineReducers({
  auth: authReducer,
  activityTimers: activityTimeTrackerReducer,
  timeTracker: timeTrackerReducer,
  reportActivity: reportReducer,
  googleActivity: googleReducer,
  customers: CustomersReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type ThunkDispatch = typeof store.dispatch;

export default store;
