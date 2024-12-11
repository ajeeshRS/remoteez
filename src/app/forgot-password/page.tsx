'use client';
import { useState } from 'react';
import { sendResetPasswordMail } from '../actions/actions';
import { toast } from 'sonner';
import Loader from '@/components/ui/loader';
import { useForm } from 'react-hook-form';
import {
  ForgotPasswordSchema,
  ForgotPasswordSchemaType,
} from '@/lib/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '@/components/ui/error-msg';

export default function Page() {
  const [loading, setLoading] = useState(false);

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSendLink = async (email: string) => {
    try {
      setLoading(true);
      const response = await sendResetPasswordMail(email);
      console.log(response);

      if (response?.success) {
        toast.success('Reset mail sent successfuly');
      } else if (!response?.success) {
        toast.error(response?.error);
      }
      
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <div className="flex h-fit w-2/5 flex-col items-center justify-center bg-neutral-700/10 p-5 text-white shadow-md">
        <h2 className="w-full py-3 text-center text-xl font-bold md:text-2xl">
          Forgot Password
        </h2>
        <form
          className="flex h-full w-full flex-col items-center justify-center"
          onSubmit={form.handleSubmit((data) => handleSendLink(data.email))}
        >
          <input
            {...form.register('email')}
            type="text"
            className="my-2 h-10 w-full border border-neutral-500/35 bg-transparent px-5 text-white outline-none placeholder:text-sm focus:border-neutral-400 md:w-5/6"
            placeholder="Enter your registered email"
          />
          <ErrorMessage err={form.formState.errors.email} />
          <button
            type="submit"
            className="hover:bg-[#008080 my-4 flex w-full items-center justify-center bg-pink-600 px-3 py-1 text-white outline-none hover:bg-pink-700 md:w-5/6"
          >
            {loading ? <Loader /> : 'Send reset mail'}
          </button>
        </form>
      </div>
    </div>
  );
}
