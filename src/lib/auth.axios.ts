import { Msg } from '@/types/common';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';

export const handleJobSeekerSignup = async (formData: any) => {
  try {
    const response = await axios.post('/api/signup/jobseeker', formData);
    toast.success(response.data.message);
  } catch (error) {
    const err = error as AxiosError<Msg>
    toast.error(err.response?.data.message);
  }
};

export const handleEmployerSignup = async (formData: any) => {
  try {
    const response = await axios.post('/api/signup/employer', formData);
    console.log(formData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
