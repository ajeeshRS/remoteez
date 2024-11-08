'use client';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import EmployerForm from '@/components/signup/EmployerForm';
import JobSeekerForm from '@/components/signup/JobSeekerForm';

export interface Suggestion {
  properties: {
    formatted: string;
    place_id: string;
  };
}

export default function Page() {
  return (
    <div className="flex min-h-[90vh] w-full items-center justify-center">
      <div className="login-form-container flex h-fit my-10 w-5/6 flex-col items-center justify-center bg-white p-5 shadow-md dark:bg-neutral-900 md:w-2/6">
        <h3 className="w-full text-center text-xl font-bold md:text-2xl">
          Create your account
        </h3>

        <Tabs defaultValue="jobseeker" className="w-full py-5">
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
