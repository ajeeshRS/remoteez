'use client';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import EmployerForm from '@/components/signup/EmployerForm';
import JobSeekerForm from '@/components/signup/JobSeekerForm';
import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export interface Suggestion {
  properties: {
    formatted: string;
    place_id: string;
  };
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SignupContent />
    </Suspense>
  );
}

function SignupContent() {
  const searchParams = useSearchParams();
  const value = searchParams.get('type');
  const router = useRouter();
  const [type, setType] = useState<string>('');
  const { data: session, status } = useSession();
  useEffect(() => {
    if (value) {
      setType(value);
    }
  }, [value]);

  const handleValueChange = (value: string) => {
    setType(value);
    router.push(`?type=${value}`);
  };

  if (status !== 'loading' && session?.user) {
    router.push('/');
  }
  return (
    <div className="flex min-h-[90vh] w-full items-center justify-center">
      <div className="login-form-container my-10 flex h-fit w-5/6 flex-col items-center justify-center bg-neutral-700/10 p-5 text-white shadow-md md:w-2/6">
        <h3 className="w-full text-center text-xl font-bold md:text-2xl">
          Create your account
        </h3>

        <Tabs
          value={type}
          onValueChange={handleValueChange}
          className="w-full py-5"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="jobseeker">Job seeker</TabsTrigger>
            <TabsTrigger value="employer">Employer</TabsTrigger>
          </TabsList>
          <TabsContent value="jobseeker">
            <JobSeekerForm />
          </TabsContent>
          <TabsContent value="employer">
            <EmployerForm />
          </TabsContent>
        </Tabs>
        <p className="flex w-full items-center justify-center py-2 text-xs">
          Already have an account?
          <span className="cursor-pointer pl-1 hover:underline">
            <Link href="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
