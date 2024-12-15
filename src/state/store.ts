import { configureStore } from '@reduxjs/toolkit';
import jobseekerReducer from '../state/profile/jobseekerSlice';

export const store = configureStore({
  reducer: {
    jobseekerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
