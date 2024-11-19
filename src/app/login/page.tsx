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
      <div className="login-form-container flex h-fit w-5/6 flex-col items-center justify-center p-5 bg-neutral-700/10 shadow-md md:w-2/6 text-white">
        <h3 className="w-full text-center text-xl font-bold md:text-2xl text-white">
          Login to your account
        </h3>
        <form
          onSubmit={handleSubmit((values) => onSubmit(values))}
          className="flex w-full flex-col items-center justify-center py-8"
        >
          <input
            {...register('email')}
            type="text"
            className="my-2 h-10 w-full  border border-neutral-500/35 focus:border-neutral-400 px-5 placeholder:text-sm outline-none bg-transparent text-white md:w-5/6"
            placeholder="Email"
          />
          <ErrorMessage err={errors.email} />
          <input
            {...register('password')}
            type="password"
            className="my-2 h-10 w-full border border-neutral-500/35 focus:border-neutral-400 outline-none px-5 placeholder:text-sm bg-transparent text-white md:w-5/6"
            placeholder="Password"
          />
          <ErrorMessage err={errors.password} />
          <p
            onClick={() => router.push('/forgot-password')}
            className="flex w-full cursor-pointer items-center justify-start text-xs hover:underline md:w-5/6"
          >
            Forgot Password ?
          </p>
          <p className="flex w-full items-center justify-center py-4 text-xs md:w-5/6">
            Don&apos;t have an account?
            <span className="cursor-pointer pl-1 hover:underline">
              <Link href="/signup?type=jobseeker">Signup</Link>
            </span>
          </p>
          <button
            type="submit"
            className="my-4 flex w-full items-center justify-center bg-pink-600 px-3 py-1 text-white outline-none hover:bg-pink-700 md:w-5/6"
          >
            {loading ? <Loader /> : 'Login'}
          </button>
          <button className="flex w-full items-center justify-center bg-pink-600 px-3 py-1 text-white outline-none hover:bg-pink-700 md:w-5/6">
            <FaGoogle className="mr-2 h-4 w-4 text-white" /> Login with Google
          </button>
        </form>
      </div>
    </div>
  );
}
