import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { EmployerProfile } from '@/types/common';

interface employerState {
  employer: EmployerProfile | null;
}

const initialState: employerState = {
  employer: null,
};

export const employerSlice = createSlice({
  name: 'employer',
  initialState,
  reducers: {
    setEmployerProfile: (state, action: PayloadAction<EmployerProfile>) => {
      state.employer = action.payload;
    },
  },
});

export const { setEmployerProfile } = employerSlice.actions;
export const employerSelector = (state: RootState) => state.employerReducer;
export default employerSlice.reducer;
