import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { JobSeekerProfile } from '@/types/common';

interface jobseekerState {
  jobseeker: JobSeekerProfile | null;
}

const initialState: jobseekerState = {
  jobseeker: null,
};

export const jobseekerSlice = createSlice({
  name: 'jobseeker',
  initialState,
  reducers: {
    setJobseekerProfile: (state, action: PayloadAction<JobSeekerProfile>) => {
      state.jobseeker = action.payload;
    },
  },
});

export const { setJobseekerProfile } = jobseekerSlice.actions;
export const jobseekerSelector = (state: RootState) => state.jobseekerReducer;
export default jobseekerSlice.reducer;
