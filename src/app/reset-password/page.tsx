'use client';
import ErrorMessage from '@/components/ui/error-msg';
import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from '@/lib/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { resetPassword } from '../actions/actions';
import Loader from '@/components/ui/loader';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token') as string;

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  if (!token) {
    toast.error('Some error occured');
    router.push('/login');
  }

  const handleResetPassword = async (newPassword: string, token: string) => {
    try {
      setLoading(true);
      const response = await resetPassword(newPassword, token);
      if (response?.success) {
        toast.success('Password reset successfully');
      } else if (!response?.success) {
        toast.error(response?.error);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      form.reset();
    }
  };

  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <div className="flex h-fit w-2/5 flex-col items-center justify-center bg-neutral-700/10 p-5 text-white shadow-md">
        <h2 className="w-full py-3 text-center text-xl font-bold md:text-2xl">
          Reset Password
        </h2>
        <form
          className="flex h-full w-full flex-col items-center justify-center"
          onSubmit={form.handleSubmit((data) =>
            handleResetPassword(data.newPassword, token),
          )}
        >
          <input
            {...form.register('newPassword')}
            type="password"
            className="my-2 h-10 w-full border border-neutral-500/35 bg-transparent px-5 text-white outline-none placeholder:text-sm focus:border-neutral-400 md:w-5/6"
            placeholder="Enter new password"
          />
          <ErrorMessage err={form.formState.errors.newPassword} />

          <input
            {...form.register('confirmPassword')}
            type="password"
            className="my-2 h-10 w-full border border-neutral-500/35 bg-transparent px-5 text-white outline-none placeholder:text-sm focus:border-neutral-400 md:w-5/6"
            placeholder="Confirm new password"
          />
          <ErrorMessage err={form.formState.errors.confirmPassword} />
          <button
            type="submit"
            className="hover:bg-[#008080 my-4 flex w-full items-center justify-center bg-pink-600 px-3 py-1 text-white outline-none hover:bg-pink-700 md:w-5/6"
          >
            {loading ? <Loader /> : 'reset password'}
          </button>
        </form>
      </div>
    </div>
  );
}
