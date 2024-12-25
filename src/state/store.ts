import { configureStore } from '@reduxjs/toolkit';
import jobseekerReducer from '../state/profile/jobseekerSlice';
import employerReducer from '../state/profile/employerSlice';

export const store = configureStore({
  reducer: {
    jobseekerReducer,
    employerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
