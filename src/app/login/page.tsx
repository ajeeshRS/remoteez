'use client';
import ErrorMessage from '@/components/ui/error-msg';
import Loader from '@/components/ui/loader';
import {
  SigninSchema,
  SigninSchemaType,
} from '@/lib/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, SignInResponse } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'sonner';

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninSchemaType>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: SigninSchemaType) => {
    try {
      const { email, password } = values;

      setLoading(true);
      const response: SignInResponse | undefined = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (response?.error === 'User not found') {
        throw new Error('User not found');
      }

      if (response?.error === 'Invalid credentials') {
        throw new Error('Invalid credentials');
      }

      if (!response?.error) {
        router.push('/');
        router.refresh();
      }

      if (!response?.ok) {
        throw new Error('Login failed');
      }

      console.log('Login Successful', response);
      toast.success('Logged in');
    } catch (err) {
      const error = err as Error;
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex h-[90vh] w-full items-center justify-center">
      <div className="login-form-container flex h-fit w-5/6 flex-col items-center justify-center bg-white p-5 shadow-md dark:bg-neutral-900 md:w-2/6">
        <h3 className="w-full text-center text-xl font-bold md:text-2xl">
          Login to your account
        </h3>
        <form
          onSubmit={handleSubmit((values) => onSubmit(values))}
          className="flex w-full flex-col items-center justify-center py-8"
        >
          <input
            {...register('email')}
            type="text"
            className="my-2 h-10 w-full border px-5 placeholder:text-sm focus:outline-[#00B2B2] md:w-5/6"
            placeholder="Email"
          />
          <ErrorMessage err={errors.email} />
          <input
            {...register('password')}
            type="password"
            className="my-2 h-10 w-full border px-5 placeholder:text-sm focus:outline-[#00B2B2] md:w-5/6"
            placeholder="Password"
          />
          <ErrorMessage err={errors.password} />
          <p className="flex w-full cursor-pointer items-center justify-start text-xs hover:underline md:w-5/6">
            Forgot Password ?
          </p>
          <p className="flex w-full items-center justify-center py-4 text-xs md:w-5/6">
            Don&apos;t have an account?
            <span className="cursor-pointer pl-1 hover:underline">
              <Link href="/signup">Signup</Link>
            </span>
          </p>
          <button
            type="submit"
            className="hover:bg-[#008080 my-4 w-full bg-[#00B2B2] px-3 py-1 text-white outline-none md:w-5/6 flex items-center justify-center"
          >
            {loading ? <Loader /> : 'Login'}
          </button>
          <button className="flex w-full items-center justify-center bg-[#00B2B2] px-3 py-1 text-white outline-none hover:bg-[#008080] md:w-5/6">
            <FaGoogle className="mr-2 h-4 w-4 text-white" /> Login with Google
          </button>
        </form>
      </div>
    </div>
  );
}
