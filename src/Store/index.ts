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
} from './Reducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['activityTimer'], // Only persist activityTimer in both cases
};

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: [], // Do not persist auth in production
};

const rootReducer = combineReducers({
  auth:
    process.env.NODE_ENV === 'production'
      ? authReducer
      : persistReducer(authPersistConfig, authReducer),
  activityTimers: activityTimeTrackerReducer,
  timeTracker: timeTrackerReducer,
  reportActivity: reportReducer,
  googleAuth: googleReducer,
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
