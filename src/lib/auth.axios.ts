import { Msg } from '@/types/common';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

export const handleJobSeekerSignup = async (
  formData: any,
  setSigning: (value: boolean) => void,
) => {
  try {
    setSigning(true);
    const response = await axios.post('/api/auth/signup/jobseeker', formData);
    toast.success(response.data.message);
  } catch (error) {
    const err = error as AxiosError<Msg>;
    toast.error(err.response?.data.message);
  } finally {
    setSigning(false);
  }
};

export const handleEmployerSignup = async (
  formData: any,
  setSigning: (value: boolean) => void,
  reset: () => void,
) => {
  try {
    setSigning(true);
    const response = await axios.post('/api/auth/signup/employer', formData);
    toast.success(response.data.message);
  } catch (error) {
    const err = error as AxiosError<Msg>;
    console.log(err);
    toast.error(err.response?.statusText);
  } finally {
    reset()
    setSigning(false);
  }
};